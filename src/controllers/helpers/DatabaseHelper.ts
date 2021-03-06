// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {VolatileMemoryClient, RelationalDatabaseClient, RelationalDatabaseORMClient, DocumentDatabaseClient, PrioritizedWorkerClient, CreateTransaction} from './ConnectionHelper';
import {CodeHelper} from './CodeHelper';
import {NotificationHelper} from './NotificationHelper';
import {DataFormationHelper} from './DataFormationHelper';
import {RequestHelper} from './RequestHelper';
import {ValidationInfo} from './ValidationHelper';
import {PermissionHelper} from './PermissionHelper';
import {ProjectConfigurationHelper} from './ProjectConfigurationHelper';
import {FieldType, DataTableSchema} from './SchemaHelper';
import {DataTypes} from 'sequelize';
import {ObjectID} from 'mongodb';

const DEFAULT_DOCUMENT_DATABASE_NAME = 'stackblend';

enum SourceType {
  Relational,
  PrioritizedWorker,
  Document,
  VolatileMemory,
  RESTful,
  Dictionary,
  Collection
}
enum ActionType {
  Insert,
  Update,
  Upsert,
  Delete,
  Retrieve,
  Popup,
  Navigate,
  Test
}
enum OperationType {
  Equal,
  LessThan,
  MoreThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  NotEqual,
  Include,
  Exclude
}
interface HierarchicalDataTable {
	source: SourceType;
	group: string;
  rows: HierarchicalDataRow[];
  notification?: string;
}
interface HierarchicalDataRow {
  keys: {[Identifier: string]: any};
  columns: {[Identifier: string]: any};
  relations: {[Identifier: string]: HierarchicalDataTable};
  division?: number[];
}
interface HierarchicalDataFilter {
  name: string;
  operation: OperationType;
  value: any;
}

interface Input {
  target: SourceType;
  group: string;
  name: string;
  value: any;
  guid: string;
  premise: string;
  validation: ValidationInfo;
  division?: number[];
}

const fixType = (type: FieldType, value: any): any => {
	if (value === undefined) return value;
	if (value === null) return value;
	
	switch (type) {
		case FieldType.AutoNumber:
		case FieldType.Number:
			if (typeof value !== 'number') {
				return parseFloat(value.toString());
			}
			break;
		case FieldType.String:
			if (typeof value !== 'string') {
				return value.toString();
			}
			break;
		case FieldType.Boolean:
			if (typeof value !== 'boolean') {
				return value.toString() == 'true';
			}
			break;
		case FieldType.DateTime:
			if (!(value instanceof Date)) {
				return new Date(value.toString());
			}
			break;
	}
	
	return value;
};

const DatabaseHelper = {
	getSourceType: (value: string): SourceType => {
		switch (value) {
			case 'relational':
				return SourceType.Relational;
			case 'document':
				return SourceType.PrioritizedWorker;
			case 'worker':
				return SourceType.Document;
			case 'volatile-memory':
				return SourceType.VolatileMemory;
			case 'RESTful':
				return SourceType.RESTful;
		  default:
		    throw new Error(`There was an error preparing data for manipulation (invalid type of available data source, '${value}').`);
		}
	},
  distinct: (data: Input[]) => {
    const remove = [];
    const hash = {};
    
    for (const item of [...data].reverse()) {
    	const key = `${item.premise}:${item.target}:${item.group}:${item.name}:${item.division.join(',')}`.toLowerCase();
      if (!hash[key]) {
        hash[key] = true;
      } else {
      	remove.push(item);
      }
    }
    
    for (const item of remove) {
    	data.splice(data.indexOf(item), 1);
    }
  },
  satisfy: (data: Input[], action: ActionType, schema: DataTableSchema, premise: string=null, division: number[]=[]): boolean => {
  	if (data.length == 0) return false;
  	
  	data = CodeHelper.clone(data);
    DatabaseHelper.distinct(data);
    
    data = data.filter(input => input.division.length <= division.length + 1 && (input.division.join(',') + ',').indexOf(division.join(',') + ',') == 0);
    
    let inputs = data.filter(item => (item.target == null || item.target == schema.source) && item.group == schema.group && item.premise == premise);
    const requiredKeys = {};
    
    switch (action) {
      case ActionType.Insert:
      case ActionType.Upsert:
        for (const key in schema.columns) {
          if (schema.columns.hasOwnProperty(key)) {
            if (schema.columns[key].fieldType != FieldType.AutoNumber && schema.columns[key].required) {
              requiredKeys[key] = schema.columns[key];
            }
          }
        }
        for (const key in schema.keys) {
          if (schema.keys.hasOwnProperty(key)) {
            if (schema.keys[key].fieldType != FieldType.AutoNumber) {
              requiredKeys[key] = schema.keys[key];
            }
          }
        }
        break;
      case ActionType.Update:
        for (const key in schema.keys) {
          if (schema.keys.hasOwnProperty(key)) {
            if (schema.keys[key].fieldType != FieldType.AutoNumber) {
              requiredKeys[key] = schema.keys[key];
            }
          }
        }
        break;
      case ActionType.Delete:
      case ActionType.Retrieve:
        if (inputs.length == 0) return false;
        break;
      default:
        return false;
    }
    
    inputs = inputs.filter(input => !!requiredKeys[input.name]);
    const existingKeys = {};
    for (const input of inputs) {
    	existingKeys[input.name] = true;
    }
    
    if (action != ActionType.Retrieve && Object.keys(existingKeys).length != Object.keys(requiredKeys).length) {
      return false;
    } else {
    	data = data.filter(item => (item.group != schema.group || item.premise != premise));
    	if (data.length == 0) return true;
    	
      let next = data.filter(item => item.premise == premise);
      const keys = Array.from(new Set(next.map(input => input.group)));
      
      for (const key of keys) {
      	const current = next.filter(item => item.group == key);
      	if (!DatabaseHelper.satisfy(current, action,  ProjectConfigurationHelper.getDataSchema().tables[key], premise, division)) {
        	return false;
        }
      }
      
    	const schemata = [];
    	const nextPremise = (premise == null) ? schema.group : `${premise}.${schema.group}`;
      
      next = data.filter(item => item.premise == nextPremise);
      
    	if (next.length == 0) return true;
    	
      for (const key in schema.relations) {
        if (schema.relations.hasOwnProperty(key)) {
          const length = next.length;
          let found = false;
          
          for (let i=0; i<length; i++) {
          	const input = next[i];
          	
            if (input.group == schema.relations[key].targetGroup) {
              next.push({
                target: ProjectConfigurationHelper.getDataSchema().tables[schema.relations[key].targetGroup].source,
                group: schema.relations[key].targetGroup,
                name: schema.relations[key].targetEntity,
                value: null,
                guid: null,
                division: input.division,
								premise: nextPremise,
                validation: null
              });
              
              found = true;
            }
          }
          
          if (found) schemata.push(ProjectConfigurationHelper.getDataSchema().tables[schema.relations[key].targetGroup]);
        }
      }
      
      DatabaseHelper.distinct(next);
      
      for (const nextSchema of schemata) {
        if (!DatabaseHelper.satisfy(next, action, nextSchema, nextPremise, division) &&
          !DatabaseHelper.satisfy(next, action, nextSchema, nextPremise, next[0] && next[0].division || [])) {
          return false;
        }
      }
      
      return true;
    }
  },
  getRows: (data: Input[], action: ActionType, schema: DataTableSchema, premise: string=null, division: number[], matches: Input[]): HierarchicalDataRow[] => {
  	const results: HierarchicalDataRow[] = [];
  	const map: any = {};
	  let found = false;
	  
    for (const input of data) {
    	if (input.group != schema.group) continue;
    	if (input.premise != premise) continue;
    	if (input.division.length > division.length + 1 || (input.division.join(',') + ',').indexOf(division.join(',') + ',') != 0) continue;
    	
    	found = true;
    	
    	const key = input.division.join(',');
    	let row: HierarchicalDataRow;
    	if (!map[key]) {
    		row = {
			    keys: {},
			    columns: {},
			    relations: {},
			    division: input.division
			  };
			  results.push(row);
			  map[key] = row;
    	} else {
    		row = map[key];
    	}
    	
      if (!schema.keys[input.name] && !schema.columns[input.name])
        throw new Error(`There was an error preparing data for manipulation ('${input.name}' column doesn\'t exist in the schema group '${schema.group}').`);
      if (schema.keys[input.name]) {
        row.keys[input.name] = input.value;
      } else {
        row.columns[input.name] = input.value;
      }
      
      matches.push(input);
    }
    
    if (!found) return results;
    
    for (const row of results) {
			for (const key in schema.keys) {
			  if (schema.keys.hasOwnProperty(key)) {
			    switch (action) {
			      case ActionType.Insert:
			        if (schema.keys[key].fieldType != FieldType.AutoNumber) {
			          if (row.keys[key] === undefined || row.keys[key] === null) {
			            throw new Error(`There was an error preparing data for manipulation (required the value of a key ${schema.group}.${key} for manipulate ${schema.group}).`);
			          } else {
			            switch (schema.keys[key].fieldType) {
			              case FieldType.Number:
			                if (isNaN(parseFloat(row.keys[key].toString())))
			                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
			                row.keys[key] = parseFloat(row.keys[key].toString());
			                break;
			              case FieldType.Boolean:
			                row.keys[key] = (row.keys[key].toString() === 'true' || row.keys[key].toString() === '1');
			                break;
			              case FieldType.String:
			                row.keys[key] = row.keys[key].toString();
			                break;
			              case FieldType.DateTime:
			                row.keys[key] = new Date(row.keys[key].toString());
			                break;
			            }
			          }
			        }
			        break;
			      case ActionType.Upsert:
		          if (schema.keys[key].fieldType != FieldType.AutoNumber && (row.keys[key] === undefined || row.keys[key] === null)) {
		            throw new Error(`There was an error preparing data for manipulation (required the value of a key ${schema.group}.${key} for manipulate ${schema.group}).`);
		          } else {
		            switch (schema.keys[key].fieldType) {
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.keys[key].toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
		                row.keys[key] = parseFloat(row.keys[key].toString());
		                break;
		              case FieldType.Boolean:
		                row.keys[key] = (row.keys[key].toString() === 'true' || row.keys[key].toString() === '1');
		                break;
		              case FieldType.String:
		                row.keys[key] = row.keys[key].toString();
		                break;
		              case FieldType.DateTime:
		                row.keys[key] = new Date(row.keys[key].toString());
		                break;
		            }
		          }
			        break;
			      case ActionType.Update:
		          if (row.keys[key] === undefined || row.keys[key] === null) {
		            throw new Error(`There was an error preparing data for manipulation (required the value of a key ${schema.group}.${key} for manipulate ${schema.group}).`);
		          } else {
		            switch (schema.keys[key].fieldType) {
		              case FieldType.AutoNumber:
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.keys[key].toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
		                row.keys[key] = parseFloat(row.keys[key].toString());
		                break;
		              case FieldType.Boolean:
		                row.keys[key] = (row.keys[key].toString() === 'true' || row.keys[key].toString() === '1');
		                break;
		              case FieldType.String:
		                row.keys[key] = row.keys[key].toString();
		                break;
		              case FieldType.DateTime:
		                row.keys[key] = new Date(row.keys[key].toString());
		                break;
		            }
		          }
			        break;
			      case ActionType.Delete:
			      case ActionType.Retrieve:
			     	 	if (row.keys[key]) {
				      	switch (schema.keys[key].fieldType) {
		              case FieldType.AutoNumber:
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.keys[key].toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
		                row.keys[key] = parseFloat(row.keys[key].toString());
		                break;
		              case FieldType.Boolean:
		                row.keys[key] = (row.keys[key].toString() === 'true' || row.keys[key].toString() === '1');
		                break;
		              case FieldType.String:
		                row.keys[key] = row.keys[key].toString();
		                break;
		              case FieldType.DateTime:
		                row.keys[key] = new Date(row.keys[key].toString());
		                break;
		            }
		          }
			      	break;
			    }
			  }
			}
	    
			for (const key in schema.columns) {
			  if (schema.columns.hasOwnProperty(key)) {
			    switch (action) {
			      case ActionType.Insert:
			        if (schema.columns[key].fieldType != FieldType.AutoNumber) {
			          if (schema.columns[key].required && (row.columns[key] === undefined || row.columns[key] === null)) {
			            throw new Error(`There was an error preparing data for manipulation (required the value of a column ${schema.group}.${key} for manipulate ${schema.group}).`);
			          } else {
			          	if (row.columns[key]) {
				            switch (schema.columns[key].fieldType) {
				              case FieldType.Number:
				                if (isNaN(parseFloat(row.columns[key].toString())))
				                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
				                row.columns[key] = parseFloat(row.columns[key].toString());
				                break;
				              case FieldType.Boolean:
				                row.columns[key] = (row.columns[key].toString() === 'true' || row.columns[key].toString() === '1');
				                break;
				              case FieldType.String:
				                row.columns[key] = row.columns[key].toString();
				                break;
				              case FieldType.DateTime:
				                row.columns[key] = new Date(row.columns[key].toString());
				                break;
				            }
				          }
			          }
			        }
			        break;
			      case ActionType.Upsert:
		          if (schema.columns[key].fieldType != FieldType.AutoNumber && schema.columns[key].required && (row.columns[key] === undefined || row.columns[key] === null)) {
		            throw new Error(`There was an error preparing data for manipulation (required the value of a column ${schema.group}.${key} for manipulate ${schema.group}).`);
		          } else {
		          	if (row.columns[key]) {
			            switch (schema.columns[key].fieldType) {
			              case FieldType.Number:
			                if (isNaN(parseFloat(row.columns[key].toString())))
			                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
			                row.columns[key] = parseFloat(row.columns[key].toString());
			                break;
			              case FieldType.Boolean:
			                row.columns[key] = (row.columns[key].toString() === 'true' || row.columns[key].toString() === '1');
			                break;
			              case FieldType.String:
			                row.columns[key] = row.columns[key].toString();
			                break;
			              case FieldType.DateTime:
			                row.columns[key] = new Date(row.columns[key].toString());
			                break;
			            }
			          }
		          }
			        break;
			      case ActionType.Update:
			        if (schema.columns[key].required) {
			          if (row.columns[key] === undefined || row.columns[key] === null) {
			            /* void */
			          } else {
			          	if (row.columns[key]) {
				            switch (schema.columns[key].fieldType) {
				              case FieldType.AutoNumber:
				              case FieldType.Number:
				                if (isNaN(parseFloat(row.columns[key].toString())))
				                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
				                row.columns[key] = parseFloat(row.columns[key].toString());
				                break;
				              case FieldType.Boolean:
				                row.columns[key] = (row.columns[key].toString() === 'true' || row.columns[key].toString() === '1');
				                break;
				              case FieldType.String:
				                row.columns[key] = row.columns[key].toString();
				                break;
				              case FieldType.DateTime:
				                row.columns[key] = new Date(row.columns[key].toString());
				                break;
				            }
				          }
			          }
			        }
			        break;
			      case ActionType.Delete:
			      case ActionType.Retrieve:
				      if (row.columns[key]) {
				      	switch (schema.columns[key].fieldType) {
		              case FieldType.AutoNumber:
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.columns[key].toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
		                row.columns[key] = parseFloat(row.columns[key].toString());
		                break;
		              case FieldType.Boolean:
		                row.columns[key] = (row.columns[key].toString() === 'true' || row.columns[key].toString() === '1');
		                break;
		              case FieldType.String:
		                row.columns[key] = row.columns[key].toString();
		                break;
		              case FieldType.DateTime:
		                row.columns[key] = new Date(row.columns[key].toString());
		                break;
		            }
		          }
			      	break;
			    }
			  }
			}
		}
		
		return results;
  },
	prepareData: (data: Input[], action: ActionType, baseSchema: DataTableSchema, crossRelationUpsert=false): {[Identifier: string]: HierarchicalDataTable} => {
	  data = CodeHelper.clone(data);
	  
	  RequestHelper.sortInputs(data);
	  
	  const original = [...new Set(data.map(item => (item.premise ? item.premise + '.' : '') + item.group + '.' + item.name + '[' + item.division.join(',') + ']'))].join(', ');
	  
	  const results: {[Identifier: string]: HierarchicalDataTable} = {};
	  let length = 0;
	  let count = 0;
	  
	  while (length != data.length) {
	  	length = data.length;
	  	DatabaseHelper.recursivePrepareData(results, data, action, baseSchema, crossRelationUpsert, [count++]);
	  }
	  
	  if (data.length != 0) throw new Error(`There was an error preparing data for manipulation (unrelated field(s) left after preparing data: ${[...new Set(data.map(item => (item.premise ? item.premise + '.' : '') + item.group + '.' + item.name + '[' + item.division.join(',') + ']'))].join(', ')}\n\nfrom:\n${original})`);
	  
	  return results;
	},
	recursivePrepareData: (results: {[Identifier: string]: HierarchicalDataTable}, data: Input[], action: ActionType, baseSchema: DataTableSchema, crossRelationUpsert=false, division: number[], premise: string=null) => {
		const tables = [];
		
    DatabaseHelper.distinct(data);
		
		if (baseSchema == null) {
			for (const key in ProjectConfigurationHelper.getDataSchema().tables) {
	    	if (ProjectConfigurationHelper.getDataSchema().tables.hasOwnProperty(key)) {
		      if (DatabaseHelper.satisfy(data, action, ProjectConfigurationHelper.getDataSchema().tables[key], premise, division)) {
		        baseSchema = ProjectConfigurationHelper.getDataSchema().tables[key];
		        
		        const matches = [];
		        const current = {
				      source: baseSchema.source,
				      group: baseSchema.group,
				      rows: DatabaseHelper.getRows(data, action, baseSchema, premise, division, matches)
				    };
				    tables.push(current);
	    			
				  	for (const item of matches) {
				   		data.splice(data.indexOf(item), 1);
				    }
		      }
		    }
	    }
	  } else if (DatabaseHelper.satisfy(data, action, baseSchema, premise, division)) {
		  const matches = [];
	  	const current = {
	      source: baseSchema.source,
	      group: baseSchema.group,
	      rows: DatabaseHelper.getRows(data, action, baseSchema, premise, division, matches)
	    };
	    tables.push(current);
	    
	    for (const item of matches) {
	   		data.splice(data.indexOf(item), 1);
	    }
	  }
	  
    for (const table of tables) {
    	if (results[table.group]) results[table.group].rows = results[table.group].rows.concat(table.rows);
			else results[table.group] = table;
			
			baseSchema = ProjectConfigurationHelper.getDataSchema().tables[table.group];
			
			const keys = Object.keys(baseSchema.relations);
			keys.sort((a, b) => {
				return (data.some(input => input.premise == premise && input.group == a)) ? -1 : 1;
			});
			
			const nextPremise = (premise == null) ? baseSchema.group : `${premise}.${baseSchema.group}`;
			
			for (const key of keys) {
      	const _data = [...data];
      	const _appended = [];
      	const _based = [];
      	const _hash = {};
      	const _currentGroup = baseSchema.relations[key].targetGroup;
      	const _currentName = baseSchema.relations[key].targetEntity;
      	const _schema = ProjectConfigurationHelper.getDataSchema().tables[_currentGroup];
      	
      	for (const input of data) {
      		if (input.premise != nextPremise) continue;
          if (input.group != _currentGroup) continue;
    			if (input.division.length > division.length + 1 || (input.division.join(',') + ',').indexOf(division.join(',') + ',') != 0) continue;
        	
        	if (_hash[input.division.join(',')]) continue;
        	_hash[input.division.join(',')] = true;
        
        	const forwarding = {
            target: _schema.source,
            group: _currentGroup,
            name: _currentName,
            value: '123',
            guid: (input.division.length == 0) ? '' : '[' + input.division.join(',') + ']',
            division: input.division,
						premise: nextPremise,
            validation: null
          };
        
          _data.push(forwarding);
          _appended.push(forwarding);
          _based.push(input);
        }
	      
        for (const row of table.rows) {
          if (DatabaseHelper.satisfy(_data, action, ProjectConfigurationHelper.getDataSchema().tables[key], nextPremise, division)) {
            for (const i in _appended) {
            	if (data.indexOf(_based[i]) != -1) data.push(_appended[i]);
            }
            
            DatabaseHelper.recursivePrepareData(row.relations, data, (crossRelationUpsert) ? ActionType.Upsert : action, ProjectConfigurationHelper.getDataSchema().tables[key], crossRelationUpsert, division, nextPremise);
          }
          
          if (DatabaseHelper.satisfy(_data, action, ProjectConfigurationHelper.getDataSchema().tables[key], nextPremise, row.division)) {
            for (const i in _appended) {
            	if (data.indexOf(_based[i]) != -1) data.push(_appended[i]);
            }
            
            DatabaseHelper.recursivePrepareData(row.relations, data, (crossRelationUpsert) ? ActionType.Upsert : action, ProjectConfigurationHelper.getDataSchema().tables[key], crossRelationUpsert, row.division, nextPremise);
          }
        }
	    }
		}
	},
	ormMap: (schema: DataTableSchema): any => {
	  if (!RelationalDatabaseORMClient.models[schema.group]) {
	    const columns = {};
	    const options = {tableName: schema.group};
	    
			for (const key in schema.columns) {
			  if (schema.columns.hasOwnProperty(key)) {
			    let type;
			    let autoIncrement = false;
			    const unique = schema.columns[key].unique;
			    const primaryKey = false;
			    const allowNull = !schema.columns[key].required;
			    
			    switch (schema.columns[key].fieldType) {
			      case FieldType.AutoNumber:
              type = DataTypes.INTEGER;
              autoIncrement = true;
              break;
			      case FieldType.String:
              type = DataTypes.STRING;
              break;
            case FieldType.Number:
              type = DataTypes.INTEGER;
              break;
            case FieldType.Boolean:
              type = DataTypes.BOOLEAN;
              break;
            case FieldType.DateTime:
              type = DataTypes.DATE;
              break;
            default:
              throw new Error('There was an error preparing data for manipulation (unsupported field type).');
			    }
			    
			    columns[key] = {
			      type: type,
			      autoIncrement: autoIncrement,
			      unique: unique,
			      primaryKey: primaryKey,
			      allowNull: allowNull
			    };
			  }
			}
			for (const key in schema.keys) {
			  if (schema.keys.hasOwnProperty(key)) {
			    let type;
			    let autoIncrement = false;
			    const unique = schema.keys[key].unique;
			    const primaryKey = true;
			    const allowNull = !schema.keys[key].required;
			    
			    switch (schema.keys[key].fieldType) {
			      case FieldType.AutoNumber:
              type = DataTypes.INTEGER;
              autoIncrement = true;
              break;
			      case FieldType.String:
              type = DataTypes.STRING;
              break;
            case FieldType.Number:
              type = DataTypes.INTEGER;
              break;
            case FieldType.Boolean:
              type = DataTypes.BOOLEAN;
              break;
            case FieldType.DateTime:
              type = DataTypes.DATE;
              break;
            default:
              throw new Error('There was an error preparing data for manipulation (unsupported field type).');
			    }
			    
			    columns[key] = {
			      type: type,
			      autoIncrement: autoIncrement,
			      unique: unique,
			      primaryKey: primaryKey,
			      allowNull: allowNull
			    };
			  }
			}
	    
	    const User = RelationalDatabaseORMClient.define(schema.group, columns, options);
	  }
	  
	  return RelationalDatabaseORMClient.models[schema.group];
	},
	insert: async (data: Input[], baseSchema: DataTableSchema, crossRelationUpsert=false, session: any=null, leavePermission=false): Promise<HierarchicalDataRow[]> => {
		return new Promise(async (resolve, reject) => {
  		const transaction = await CreateTransaction({});
  		
		  try {
  			const list = DatabaseHelper.prepareData(data, ActionType.Insert, baseSchema, crossRelationUpsert);
	  		const results = [];
  		  
  		  for (const key in list) {
  		  	if (list.hasOwnProperty(key)) {
	  		  	const input = list[key];
	  		  	const schema = ProjectConfigurationHelper.getDataSchema().tables[key];
	  		  	
	  		  	await DatabaseHelper.performRecursiveInsert(input, schema, results, transaction, crossRelationUpsert, session, leavePermission);
	  		  }
  		  }
	      
      	if (transaction) await transaction.commit();
		  	
	  		resolve(results);
      } catch(error) {
      	console.log(error);
      	
      	if (transaction) await transaction.rollback();
      	
        reject(error);
      }
    });
	},
	performRecursiveInsert: async (input: HierarchicalDataTable, schema: DataTableSchema, results: HierarchicalDataRow[], transaction: any, crossRelationUpsert=false, session: any=null, leavePermission=false): Promise<void> => {
		return new Promise(async (resolve, reject) => {
		  try {
		    switch (input.source) {
		    	case SourceType.Relational:
		    	case SourceType.Document:
		    	case SourceType.VolatileMemory:
		    		if (input.source == SourceType.Relational && !RelationalDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.Document && !DocumentDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.VolatileMemory && !VolatileMemoryClient) throw new Error('There was an error trying to obtain a connection (not found).');
						
						const map = (input.source == SourceType.Relational) ? DatabaseHelper.ormMap(schema) : null;
						
						for (const row of input.rows) {
							const keys = {};
							const data = {};
							
							for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && row.columns[key] != undefined) {
							    if (schema.columns[key].fieldType !== FieldType.AutoNumber) {
							      data[key] = row.columns[key];
							    }
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && row.keys[key] != undefined) {
							    if (schema.keys[key].fieldType !== FieldType.AutoNumber) {
							      keys[key] = row.keys[key];
							    }
							  }
							}
							
							if (!leavePermission && !await PermissionHelper.allowActionOnTable(ActionType.Insert, schema, Object.assign({}, data, keys), session)) throw new Error(`You have no permission to insert any row in ${schema.group}.`);
							
							let record = null;
							if (input.source == SourceType.Relational) {
								record = await map.create(Object.assign({}, data, keys), {transaction: transaction.relationalDatabaseTransaction});
							} else if (input.source == SourceType.Document) {
								record = (await transaction.documentDatabaseConnection.db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(schema.group).insertOne(Object.assign({}, data, keys)))['ops'][0];
							} else if (input.source == SourceType.VolatileMemory) {
								const _key = schema.group + ':' + JSON.stringify(CodeHelper.sortHashtable(keys));
								await VolatileMemoryClient.set(_key, JSON.stringify(Object.assign({}, data, keys)));
								record = Object.assign({}, data, keys);
							}
							
						  const result = {
						    keys: {},
						    columns: {},
						    relations: {}
						  };
						  
						  if (record['_id']) record['id'] = record['_id'].toString();
						  
						  for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && record[key] !== undefined) {
							    result.columns[key] = fixType(schema.columns[key].fieldType, record[key]);
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && record[key] !== undefined) {
							    result.keys[key] = fixType(schema.keys[key].fieldType, record[key]);
							  }
							}
							
							results.push(result);
							
							for (const key in row.relations) {
								if (row.relations.hasOwnProperty(key)) {
									const relation = schema.relations[key];
									const nextSchema = ProjectConfigurationHelper.getDataSchema().tables[key];
									
						  		for (const nextRow of row.relations[key].rows) {
						  			if (schema.columns.hasOwnProperty(relation.sourceEntity)) {
						  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
							  				nextRow.columns[relation.targetEntity] = result.columns[relation.sourceEntity];
							  			} else {
							  				nextRow.keys[relation.targetEntity] = result.columns[relation.sourceEntity];
							  			}
						  			} else {
						  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
						  					nextRow.columns[relation.targetEntity] = result.keys[relation.sourceEntity];
							  			} else {
							  				nextRow.keys[relation.targetEntity] = result.keys[relation.sourceEntity];
							  			}
						  			}
						  		}
						  		
						  		result.relations[nextSchema.group] = {
			  					  source: SourceType.Relational,
										group: nextSchema.group,
									  rows: []
								  };
								
									if (!crossRelationUpsert) await DatabaseHelper.performRecursiveInsert(row.relations[key], nextSchema, result.relations[nextSchema.group].rows, transaction, false, session, leavePermission);
									else await DatabaseHelper.performRecursiveUpsert(row.relations[key], nextSchema, result.relations[nextSchema.group].rows, transaction, session, leavePermission);
								}
							}
						  
						  for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && result.columns[key] !== undefined) {
							    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(schema.columns[key], schema, session)) delete result.columns[key];
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && result.keys[key] !== undefined) {
							    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(schema.keys[key], schema, session)) delete result.keys[key];
							  }
							}
						}
						
						NotificationHelper.notifyUpdates(ActionType.Insert, schema, results);
		    		break;
		    	case SourceType.PrioritizedWorker:
		    		if (!PrioritizedWorkerClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		
		    		for (const row of input.rows) {
							PrioritizedWorkerClient.enqueue(schema.group, [row], {
						    retry: true,
						    queue: 'normal'
							});
						}
		    		
		    		break;
		    	case SourceType.RESTful:
		    		const _column = Object.keys(schema.columns).map(key => schema.columns[key]).filter(column => column.verb == 'PUT');
		    		if (_column.length == 0) throw new Error(`Cannot perform PUT on RESTful group "${schema.group}".`);
		    		
		    		const _input = DataFormationHelper.convertFromHierarchicalDataTableToJSON(input);
		    		const _output = RequestHelper.put(_column[0].url, _input, 'json');
		    		
		    		const table = DataFormationHelper.convertFromJSONToHierarchicalDataTable(_output);
		    		results.push(table.rows[0]);
		    		
		    		break;
		    }
		    
	  		resolve();
		  } catch(error) {
		  	reject(error);
		  }
		});
	},
	upsert: async (data: Input[], baseSchema: DataTableSchema, session: any=null, leavePermission=false): Promise<HierarchicalDataRow[]> => {
		return new Promise(async (resolve, reject) => {
  		const transaction = await CreateTransaction({});
  		
		  try {
  			const list = DatabaseHelper.prepareData(data, ActionType.Upsert, baseSchema, true);
	  		const results = [];
  		  
  		  for (const key in list) {
  		  	if (list.hasOwnProperty(key)) {
	  		  	const input = list[key];
	  		  	const schema = ProjectConfigurationHelper.getDataSchema().tables[key];
	  		  	
	  		  	await DatabaseHelper.performRecursiveUpsert(input, schema, results, transaction, session, leavePermission);
	  		  }
  		  }
	      
      	if (transaction) await transaction.commit();
		  	
	  		resolve(results);
      } catch(error) {
      	console.log(error);
      	
      	if (transaction) await transaction.rollback();
      	
        reject(error);
      }
    });
	},
	performRecursiveUpsert: async (input: HierarchicalDataTable, schema: DataTableSchema, results: HierarchicalDataRow[], transaction: any, session: any=null, leavePermission=false): Promise<void> => {
		return new Promise(async (resolve, reject) => {
		  try {
		    switch (input.source) {
		    	case SourceType.Relational:
		    	case SourceType.Document:
		    	case SourceType.VolatileMemory:
		    		if (input.source == SourceType.Relational && !RelationalDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.Document && !DocumentDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.VolatileMemory && !VolatileMemoryClient) throw new Error('There was an error trying to obtain a connection (not found).');
						
						const map = (input.source == SourceType.Relational) ? DatabaseHelper.ormMap(schema) : null;
						
						for (const row of input.rows) {
							const keys = {};
							const data = {};
							const query = {};
						
							for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && row.columns[key] != undefined) {
							    if (schema.columns[key].fieldType !== FieldType.AutoNumber) {
							      data[key] = row.columns[key];
							    }
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && row.keys[key] != undefined) {
							    if (schema.keys[key].fieldType !== FieldType.AutoNumber) {
							      keys[key] = row.keys[key];
							      if (input.source == SourceType.Document && key == 'id') {
							      	query['_id'] = {$eq: new ObjectID(row.keys[key])};
							      } else {
							      	query[key] = {$eq: row.keys[key]};
							      }
							    }
							  }
							}
							
							let record = null;
							if (input.source == SourceType.Relational) {
								record = (await map.upsert(Object.assign({}, data, keys), {transaction: transaction.relationalDatabaseTransaction}))[0];
							} else if (input.source == SourceType.Document) {
								await transaction.documentDatabaseConnection.db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(schema.group).updateOne(query, {$set: data}, {upsert: true});
								record = await transaction.documentDatabaseConnection.db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(schema.group).findOne(query);
							} else if (input.source == SourceType.VolatileMemory) {
								const _key = schema.group + ':' + JSON.stringify(CodeHelper.sortHashtable(keys));
								record = JSON.parse(await VolatileMemoryClient.get(_key) || '{}');
								await VolatileMemoryClient.set(_key, JSON.stringify(Object.assign({}, record, data, keys)));
								record = JSON.parse(await VolatileMemoryClient.get(_key));
							}
							
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && record[key] !== undefined) {
							    keys[key] = record[key];
							  }
							}
							
							if (!leavePermission && !await PermissionHelper.allowActionOnTable(ActionType.Upsert, schema, Object.assign({}, data, keys), session)) throw new Error(`You have no permission to upsert any row in ${schema.group}.`);
							
						  const result = {
						    keys: {},
						    columns: {},
						    relations: {}
						  };
						  
						  if (record['_id']) record['id'] = record['_id'].toString();
						  
						  for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && record[key] !== undefined) {
							    result.columns[key] = fixType(schema.columns[key].fieldType, record[key]);
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && record[key] !== undefined) {
							    result.keys[key] = fixType(schema.keys[key].fieldType, record[key]);
							  }
							}
							
							results.push(result);
							
							for (const key in row.relations) {
								if (row.relations.hasOwnProperty(key)) {
									const relation = schema.relations[key];
									const nextSchema = ProjectConfigurationHelper.getDataSchema().tables[key];
									
						  		for (const nextRow of row.relations[key].rows) {
						  			if (schema.columns.hasOwnProperty(relation.sourceEntity)) {
						  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
							  				nextRow.columns[relation.targetEntity] = result.columns[relation.sourceEntity];
							  			} else {
							  				nextRow.keys[relation.targetEntity] = result.columns[relation.sourceEntity];
							  			}
						  			} else {
						  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
						  					nextRow.columns[relation.targetEntity] = result.keys[relation.sourceEntity];
							  			} else {
							  				nextRow.keys[relation.targetEntity] = result.keys[relation.sourceEntity];
							  			}
						  			}
						  		}
						  		
						  		result.relations[nextSchema.group] = {
			  					  source: SourceType.Relational,
										group: nextSchema.group,
									  rows: []
								  };
								
									await DatabaseHelper.performRecursiveUpsert(row.relations[key], nextSchema, result.relations[nextSchema.group].rows, transaction, session, leavePermission);
								}
							}
						
						  for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && result.columns[key] !== undefined) {
							    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(schema.columns[key], schema, session)) delete result.columns[key];
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && result.keys[key] !== undefined) {
							    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(schema.keys[key], schema, session)) delete result.keys[key];
							  }
							}
						}
						
						NotificationHelper.notifyUpdates(ActionType.Upsert, schema, results);
		    		break;
		    	case SourceType.PrioritizedWorker:
		    		if (!PrioritizedWorkerClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		
		    		throw new Error('Cannot perform UPSERT on prioritized worker.');
		    		
		    		break;
		    	case SourceType.RESTful:
		    		const _column = Object.keys(schema.columns).map(key => schema.columns[key]).filter(column => column.verb == 'POST');
		    		
		    		if (_column.length == 0) throw new Error(`Cannot perform POST on RESTful group "${schema.group}".`);
		    		
		    		const _input = DataFormationHelper.convertFromHierarchicalDataTableToJSON(input);
		    		const _output = RequestHelper.post(_column[0].url, _input, 'json');
		    		
		    		const table = DataFormationHelper.convertFromJSONToHierarchicalDataTable(_output);
		    		results.push(table.rows[0]);
		    		
		    		break;
		    }
		    
	  		resolve();
		  } catch(error) {
		  	reject(error);
		  }
		});
	},
	update: async (data: Input[], baseSchema: DataTableSchema, crossRelationUpsert=false, session: any=null, leavePermission=false): Promise<HierarchicalDataRow[]> => {
		return new Promise(async (resolve, reject) => {
  		const transaction = await CreateTransaction({});
  		
		  try {
  			const list = DatabaseHelper.prepareData(data, ActionType.Update, baseSchema, crossRelationUpsert);
	  		const results = [];
	  		
	  		for (const key in list) {
  		  	if (list.hasOwnProperty(key)) {
	  		  	const input = list[key];
	  		  	const schema = ProjectConfigurationHelper.getDataSchema().tables[key];
	  		  	
  		  		await DatabaseHelper.performRecursiveUpdate(input, schema, results, transaction, crossRelationUpsert, session, leavePermission);
  		  	}
  		  }
	      
      	if (transaction) await transaction.commit();
		  	
	  		resolve(results);
      } catch(error) {
      	console.log(error);
      	
      	if (transaction) await transaction.rollback();
      	
        reject(error);
      }
    });
	},
	performRecursiveUpdate: async (input: HierarchicalDataTable, schema: DataTableSchema, results: HierarchicalDataRow[], transaction: any, crossRelationUpsert=false, session: any=null, leavePermission=false): Promise<void> => {
		return new Promise(async (resolve, reject) => {
		  try {
		    switch (input.source) {
		    	case SourceType.Relational:
		    	case SourceType.Document:
		    	case SourceType.VolatileMemory:
		    		if (input.source == SourceType.Relational && !RelationalDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.Document && !DocumentDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.VolatileMemory && !VolatileMemoryClient) throw new Error('There was an error trying to obtain a connection (not found).');
						
						const map = (input.source == SourceType.Relational) ? DatabaseHelper.ormMap(schema) : null;
						
						for (const row of input.rows) {
							const keys = {};
							const data = {};
							const query = {};
						
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && row.keys[key] != undefined) {
							    keys[key] = row.keys[key];
							    if (input.source == SourceType.Document && key == 'id') {
						      	query['_id'] = {$eq: new ObjectID(row.keys[key])};
						      } else {
						      	query[key] = {$eq: row.keys[key]};
						      }
							  }
							}
							for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && row.columns[key] != undefined) {
							    data[key] = row.columns[key];
							  }
							}
							
							if (!leavePermission && !await PermissionHelper.allowActionOnTable(ActionType.Update, schema, Object.assign({}, data, keys), session)) throw new Error(`You have no permission to update any row in ${schema.group}.`);
							
							let record = null;
							if (input.source == SourceType.Relational) {
								await map.update(data, {where: keys, transaction: transaction.relationalDatabaseTransaction});
								record = await map.findOne({where: keys, transaction: transaction.relationalDatabaseTransaction});
							} else if (input.source == SourceType.Document) {
								if (Object.keys(data).length != 0) {
									await transaction.documentDatabaseConnection.db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(schema.group).updateOne(query, {$set: data});
								}
								record = await transaction.documentDatabaseConnection.db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(schema.group).findOne(query);
							} else if (input.source == SourceType.VolatileMemory) {
								const _key = schema.group + ':' + JSON.stringify(CodeHelper.sortHashtable(keys));
								record = JSON.parse(await VolatileMemoryClient.get(_key) || '{}');
								await VolatileMemoryClient.set(_key, JSON.stringify(Object.assign({}, record, data, keys)));
								record = JSON.parse(await VolatileMemoryClient.get(_key));
							}
							
						  const result = {
						    keys: {},
						    columns: {},
						    relations: {}
						  };
						  
						  if (!record) {
						  	resolve();
						  	return;
						  }
						  if (record['_id']) record['id'] = record['_id'].toString();
						  
						  for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key)) {
							    result.columns[key] = fixType(schema.columns[key].fieldType, record[key]);
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key)) {
							    result.keys[key] = fixType(schema.keys[key].fieldType, record[key]);
							  }
							}
						
							results.push(result);
							
							for (const key in row.relations) {
								if (row.relations.hasOwnProperty(key)) {
									const relation = schema.relations[key];
									const nextSchema = ProjectConfigurationHelper.getDataSchema().tables[key];
									
						  		for (const nextRow of row.relations[key].rows) {
						  			if (schema.columns.hasOwnProperty(relation.sourceEntity)) {
						  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
							  				nextRow.columns[relation.targetEntity] = result.columns[relation.sourceEntity];
							  			} else {
							  				nextRow.keys[relation.targetEntity] = result.columns[relation.sourceEntity];
							  			}
						  			} else {
						  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
						  					nextRow.columns[relation.targetEntity] = result.keys[relation.sourceEntity];
							  			} else {
							  				nextRow.keys[relation.targetEntity] = result.keys[relation.sourceEntity];
							  			}
						  			}
						  		}
						  		
						  		result.relations[nextSchema.group] = {
			  					  source: SourceType.Relational,
										group: nextSchema.group,
									  rows: []
								  };
									
									if (!crossRelationUpsert) await DatabaseHelper.performRecursiveUpdate(row.relations[key], nextSchema, result.relations[nextSchema.group].rows, transaction, false, session, leavePermission);
									else await DatabaseHelper.performRecursiveUpsert(row.relations[key], nextSchema, result.relations[nextSchema.group].rows, transaction, session, leavePermission);
								}
							}
						
						  for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && result.columns[key] !== undefined) {
							    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(schema.columns[key], schema, session)) delete result.columns[key];
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && result.keys[key] !== undefined) {
							    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(schema.keys[key], schema, session)) delete result.keys[key];
							  }
							}
						}
						
						NotificationHelper.notifyUpdates(ActionType.Update, schema, results);
						break;
		    	case SourceType.PrioritizedWorker:
		    		if (!PrioritizedWorkerClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		
		    		throw new Error('Cannot perform UPDATE on prioritized worker.');
		    		
		    		break;
		    	case SourceType.RESTful:
		    		const _column = Object.keys(schema.columns).map(key => schema.columns[key]).filter(column => column.verb == 'POST');
		    		
		    		if (_column.length == 0) throw new Error(`Cannot perform POST on RESTful group "${schema.group}".`);
		    		
		    		const _input = DataFormationHelper.convertFromHierarchicalDataTableToJSON(input);
		    		const _output = RequestHelper.post(_column[0].url, _input, 'json');
		    		
		    		const table = DataFormationHelper.convertFromJSONToHierarchicalDataTable(_output);
		    		results.push(table.rows[0]);
		    		
		    		break;
		    }
		    
	  		resolve();
		  } catch(error) {
		  	reject(error);
		  }
		});
  },
	retrieve: async (data: Input[], baseSchema: DataTableSchema, session: any=null, notifyUpdates=false, leavePermission=false): Promise<{[Identifier: string]: HierarchicalDataTable}> => {
		return new Promise(async (resolve, reject) => {
		  const connectionInfos: {[Identifier: string]: any} = {};
		  try {
		  	if (data != null) {
	  			const list = DatabaseHelper.prepareData(data, ActionType.Retrieve, baseSchema);
		  		const results = {};
		  		
		  		for (const key in list) {
	  		  	if (list.hasOwnProperty(key)) {
		  		  	const input = list[key];
		  		  	const schema = ProjectConfigurationHelper.getDataSchema().tables[key];
		  		  	
		  		  	await DatabaseHelper.performRecursiveRetrieve(input, schema, results, session, notifyUpdates, leavePermission, connectionInfos);
		  		  }
	  		  }
			  	
		  		resolve(results);
		  	} else {
		  		if (!leavePermission && !await PermissionHelper.allowActionOnTable(ActionType.Retrieve, baseSchema, {}, session)) throw new Error(`You have no permission to retrieve any row in ${baseSchema.group}.`);
		  		
		  		let map, records;
		  		const hash = {}, rows = [], results = {};
		  		
		  		switch (baseSchema.source) {
	        	case SourceType.Relational:
	        		if (!RelationalDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
	        		
	        		map = DatabaseHelper.ormMap(baseSchema);
	  					records = await map.findAll() || [];
	  					
	  					for (const record of records) {
	  					  const row = {
	    				    keys: {},
	    				    columns: {},
	    				    relations: {}
	    				  };
	  				  
	  					  for (const key in baseSchema.columns) {
								  if (baseSchema.columns.hasOwnProperty(key) && record[key] != undefined) {
								    row.columns[key] = fixType(baseSchema.columns[key].fieldType, record[key]);
								  }
								}
								for (const key in baseSchema.keys) {
								  if (baseSchema.keys.hasOwnProperty(key) && record[key] != undefined) {
								    row.keys[key] = fixType(baseSchema.keys[key].fieldType, record[key]);
								  }
								}
	  				  
	  					  for (const key in baseSchema.columns) {
	    					  if (baseSchema.columns.hasOwnProperty(key) && row.columns[key] !== undefined) {
	    					    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(baseSchema.columns[key], baseSchema, session)) delete row.columns[key];
	    					  }
	    					}
	    					for (const key in baseSchema.keys) {
	    					  if (baseSchema.keys.hasOwnProperty(key) && row.keys[key] !== undefined) {
	    					    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(baseSchema.keys[key], baseSchema, session)) delete row.keys[key];
	    					  }
	    					}
	    					
	    					rows.push(row);
	  					}
	  					
	  					results[baseSchema.group] = results[baseSchema.group] || {
	  					  source: baseSchema.source,
	  					  group: baseSchema.group,
	  					  rows: [],
							  notification: (notifyUpdates) ? NotificationHelper.getTableUpdatingIdentity(baseSchema, {}, session) : null
	  					};
	  					
	  					results[baseSchema.group].rows = [...results[baseSchema.group].rows, ...rows] as HierarchicalDataRow[];
	        		
	        		break;
	        	case SourceType.PrioritizedWorker:
	        		if (!PrioritizedWorkerClient) throw new Error('There was an error trying to obtain a connection (not found).');
	        		
	        		throw new Error('Cannot perform RETRIEVE ALL on prioritized worker.');
	        		
	        		break;
	        	case SourceType.Document:
	        		if (!DocumentDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
	        		
	        		if (!connectionInfos['documentDatabaseConnection']) connectionInfos['documentDatabaseConnection'] = await DocumentDatabaseClient.connect();
							records = await new Promise(async (resolve, reject) => {
								await connectionInfos['documentDatabaseConnection'].db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(baseSchema.group).find().toArray((error: any, results: any) => {
									if (error) {
										reject(error);
									} else {
										resolve(results);
									}
								});
							});
							
							for (const record of records) {
	  					  const row = {
	    				    keys: {},
	    				    columns: {},
	    				    relations: {}
	    				  };
	  				  
	  					  for (const key in baseSchema.columns) {
								  if (baseSchema.columns.hasOwnProperty(key) && record[key] != undefined) {
								    row.columns[key] = fixType(baseSchema.columns[key].fieldType, record[key]);
								  }
								}
								for (const key in baseSchema.keys) {
								  if (baseSchema.keys.hasOwnProperty(key) && record[key] != undefined) {
								    row.keys[key] = fixType(baseSchema.keys[key].fieldType, record[key]);
								  }
								}
	  				  
	  					  for (const key in baseSchema.columns) {
	    					  if (baseSchema.columns.hasOwnProperty(key) && row.columns[key] !== undefined) {
	    					    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(baseSchema.columns[key], baseSchema, session)) delete row.columns[key];
	    					  }
	    					}
	    					for (const key in baseSchema.keys) {
	    					  if (baseSchema.keys.hasOwnProperty(key) && row.keys[key] !== undefined) {
	    					    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(baseSchema.keys[key], baseSchema, session)) delete row.keys[key];
	    					  }
	    					}
	    					
	    					rows.push(row);
	  					}
	  					
	  					results[baseSchema.group] = {
	  					  source: baseSchema.source,
	  					  group: baseSchema.group,
	  					  rows: rows,
							  notification: (notifyUpdates) ? NotificationHelper.getTableUpdatingIdentity(baseSchema, {}, session) : null
	  					};
	        		
	        		break;
	        	case SourceType.VolatileMemory:
	        		if (!VolatileMemoryClient) throw new Error('There was an error trying to obtain a connection (not found).');
	        		
	        		throw new Error('Cannot perform RETRIEVE ALL on volatile memory.');
	        		
	        		break;
			    	case SourceType.RESTful:
			    		const _column = Object.keys(baseSchema.columns).map(key => baseSchema.columns[key]).filter(column => column.verb == null);
			    		
			    		if (_column.length == 0) throw new Error(`Cannot perform RETRIEVE ALL on RESTful named "${baseSchema.group}".`);
			    		
			    		const _output = RequestHelper.get(_column[0].url, 'json');
			    		
			    		const table = DataFormationHelper.convertFromJSONToHierarchicalDataTable(_output);
			    		results[table.group] = table;
			    		
			    		break;
	        }
	      
	      	resolve(results);
	      }
      } catch(error) {
      	console.log(error);
      	
        reject(error);
      } finally {
      	// if (connectionInfos['documentDatabaseConnection']) connectionInfos['documentDatabaseConnection'].close();
      }
		});
	},
	performRecursiveRetrieve: async (input: HierarchicalDataTable, baseSchema: DataTableSchema, results: {[Identifier: string]: HierarchicalDataTable}, session: any=null, notifyUpdates=false, leavePermission=false, connectionInfos: {[Identifier: string]: any}={}): Promise<void> => {
		return new Promise(async (resolve, reject) => {
		  try {
		    switch (input.source) {
		    	case SourceType.Relational:
		    	case SourceType.Document:
		    	case SourceType.VolatileMemory:
		    		if (input.source == SourceType.Relational && !RelationalDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.Document && !DocumentDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.VolatileMemory && !VolatileMemoryClient) throw new Error('There was an error trying to obtain a connection (not found).');
						
						const map = (input.source == SourceType.Relational) ? DatabaseHelper.ormMap(baseSchema) : null;
						
						for (const row of input.rows) {
		      		const keys = {};
		      		const data = {};
		      		const query = {};
							
							for (const key in baseSchema.columns) {
							  if (baseSchema.columns.hasOwnProperty(key) && row.columns[key] != undefined) {
							    data[key] = row.columns[key];
							    keys[key] = row.columns[key];
							    if (input.source == SourceType.Document) {
							      if (key == 'id') {
							      	query['_id'] = {$eq: new ObjectID(row.columns[key])};
							      } else {
							      	query[key] = {$eq: row.columns[key]};
							      }
							    }
							  }
							}
							for (const key in baseSchema.keys) {
							  if (baseSchema.keys.hasOwnProperty(key) && row.keys[key] != undefined) {
							    keys[key] = row.keys[key];
							    if (input.source == SourceType.Document) {
							    	if (key == 'id') {
							      	query['_id'] = {$eq: new ObjectID(row.keys[key])};
							      } else {
							      	query[key] = {$eq: row.keys[key]};
							      }
							    }
							  }
							}
							
							if (!leavePermission && !await PermissionHelper.allowActionOnTable(ActionType.Retrieve, baseSchema, Object.assign({}, data, keys), session)) throw new Error(`You have no permission to retrieve any row in ${baseSchema.group}.`);
							
							const rows = [];
							let records;
							if (input.source == SourceType.Relational) {
								records = await map.findAll({where: Object.assign({}, data, keys)}) || [];
							} else if (input.source == SourceType.Document) {
								if (!connectionInfos['documentDatabaseConnection']) connectionInfos['documentDatabaseConnection'] = await DocumentDatabaseClient.connect();
								records = await new Promise(async (resolve, reject) => {
									await connectionInfos['documentDatabaseConnection'].db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(baseSchema.group).find(query).toArray((error: any, results: any) => {
										if (error) {
											reject(error);
										} else {
											resolve(results);
										}
									});
								});
							} else if (input.source == SourceType.VolatileMemory) {
								const _key = baseSchema.group + ':' + JSON.stringify(CodeHelper.sortHashtable(keys));
								const record = await VolatileMemoryClient.get(_key);
								records = record && [JSON.parse(record)] || [];
							}
							
							for (const record of records) {
							  const row = {
		  				    keys: {},
		  				    columns: {},
		  				    relations: {}
		  				  };
						  
						  	if (record['_id']) record['id'] = record['_id'].toString();
						  	
							  for (const key in baseSchema.columns) {
		  					  if (baseSchema.columns.hasOwnProperty(key) && record[key] !== undefined) {
		  					    row.columns[key] = fixType(baseSchema.columns[key].fieldType, record[key]);
		  					  }
		  					}
		  					for (const key in baseSchema.keys) {
		  					  if (baseSchema.keys.hasOwnProperty(key) && record[key] !== undefined) {
		  					    row.keys[key] = fixType(baseSchema.keys[key].fieldType, record[key]);
		  					  }
		  					}
		  					
		  					rows.push(row);
							}
						
							results[baseSchema.group] = results[baseSchema.group] || {
							  source: baseSchema.source,
							  group: baseSchema.group,
							  rows: [],
							  notification: (notifyUpdates) ? NotificationHelper.getTableUpdatingIdentity(baseSchema, keys, session) : null
							};
	  					
							results[baseSchema.group].rows = [...results[baseSchema.group].rows, ...rows] as HierarchicalDataRow[];
							
							for (const _row of rows) {
								for (const key in row.relations) {
									if (row.relations.hasOwnProperty(key)) {
										const relation = baseSchema.relations[key];
										const nextSchema = ProjectConfigurationHelper.getDataSchema().tables[key];
										
							  		for (const nextRow of row.relations[key].rows) {
							  			if (baseSchema.columns.hasOwnProperty(relation.sourceEntity)) {
							  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
								  				nextRow.columns[relation.targetEntity] = _row.columns[relation.sourceEntity];
								  			} else {
								  				nextRow.keys[relation.targetEntity] = _row.columns[relation.sourceEntity];
								  			}
							  			} else {
							  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
							  					nextRow.columns[relation.targetEntity] = _row.keys[relation.sourceEntity];
								  			} else {
								  				nextRow.keys[relation.targetEntity] = _row.keys[relation.sourceEntity];
								  			}
							  			}
							  		}
									  
									  await DatabaseHelper.performRecursiveRetrieve(row.relations[key], nextSchema, _row.relations, session, notifyUpdates, leavePermission, connectionInfos);
							  	}
							  }
							}
							
							for (const _row of rows) {
							  for (const key in baseSchema.columns) {
								  if (baseSchema.columns.hasOwnProperty(key) && _row.columns[key] !== undefined) {
								    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(baseSchema.columns[key], baseSchema, session)) delete _row.columns[key];
								  }
								}
								for (const key in baseSchema.keys) {
								  if (baseSchema.keys.hasOwnProperty(key) && _row.keys[key] !== undefined) {
								    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(baseSchema.keys[key], baseSchema, session)) delete _row.keys[key];
								  }
								}
							}
						}
						break;
		    	case SourceType.PrioritizedWorker:
		    		if (!PrioritizedWorkerClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		
		    		throw new Error('Cannot perform RETRIEVE on prioritized worker.');
		    		
		    		break;
		    	case SourceType.RESTful:
		    		const _column = Object.keys(baseSchema.columns).map(key => baseSchema.columns[key]).filter(column => column.verb == null);
		    		
		    		if (_column.length == 0) throw new Error(`Cannot perform GET on RESTful group "${baseSchema.group}".`);
		    		
		    		const _input = DataFormationHelper.convertFromHierarchicalDataTableToJSON(input);
		    		const _output = RequestHelper.get(_column[0].url, 'json');
		    		
		    		const table = DataFormationHelper.convertFromJSONToHierarchicalDataTable(_output);
		    		results[table.group] = table;
		    		
		    		break;
		    }
		    
	  		resolve();
		  } catch(error) {
		  	reject(error);
		  }
		});
  },
	delete: async (data: Input[], baseSchema: DataTableSchema, session: any=null, leavePermission=false): Promise<HierarchicalDataRow[]> => {
		return new Promise(async (resolve, reject) => {
  		const transaction = await CreateTransaction({});
  		
		  try {
  			const list = DatabaseHelper.prepareData(data, ActionType.Delete, baseSchema);
  		  const results = [];
	  		
  		  for (const key in list) {
  		  	if (list.hasOwnProperty(key)) {
	  		  	const input = list[key];
	  		  	const schema = ProjectConfigurationHelper.getDataSchema().tables[key];
	  		  	
  		  		await DatabaseHelper.performRecursiveDelete(input, schema, results, transaction, session, leavePermission);
  		  	}
  		  }
	      
      	if (transaction) await transaction.commit();
	      
	      resolve(results);
      } catch(error) {
      	console.log(error);
      	
      	if (transaction) await transaction.rollback();
      	
        reject(error);
      }
    });
	},
	performRecursiveDelete: async (input: HierarchicalDataTable, schema: DataTableSchema, results: HierarchicalDataRow[], transaction: any, session: any=null, leavePermission=false): Promise<void> => {
		return new Promise(async (resolve, reject) => {
		  try {
		    switch (input.source) {
		    	case SourceType.Relational:
		    	case SourceType.Document:
		    	case SourceType.VolatileMemory:
		    		if (input.source == SourceType.Relational && !RelationalDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.Document && !DocumentDatabaseClient) throw new Error('There was an error trying to obtain a connection (not found).');
		    		if (input.source == SourceType.VolatileMemory && !VolatileMemoryClient) throw new Error('There was an error trying to obtain a connection (not found).');
						
						const map = (input.source == SourceType.Relational) ? DatabaseHelper.ormMap(schema) : null;
						
						for (const row of input.rows) {
							const keys = {};
		      		const query = {};
		      		const data = {};
						
							for (const key in schema.columns) {
							  if (schema.columns.hasOwnProperty(key) && row.columns[key] != undefined) {
							    if (input.source == SourceType.Document) {
							      /* use manual filtering */
							    	data[key] = row.columns[key];
							    } else {
							    	query[key] = row.columns[key];
							    }
							  }
							}
							for (const key in schema.keys) {
							  if (schema.keys.hasOwnProperty(key) && row.keys[key] != undefined) {
							    keys[key] = row.keys[key];
							    if (input.source == SourceType.Document) {
							    	if (key == 'id') {
							      	query['_id'] = {$eq: new ObjectID(row.keys[key])};
							    		data['_id'] = row.keys[key];
							      } else {
							      	query[key] = {$eq: row.keys[key]};
							    		data[key] = row.keys[key];
							      }
							    } else {
							    	query[key] = row.keys[key];
							    }
							  }
							}
							
							if (!leavePermission && !await PermissionHelper.allowActionOnTable(ActionType.Delete, schema, keys, session)) throw new Error(`You have no permission to delete any row in ${schema.group}.`);
							
							let records;
							if (input.source == SourceType.Relational) {
								records = await map.findAll({where: query}) || [];
		  				  await map.destroy({where: query}, {force: true, transaction: transaction.relationalDatabaseTransaction});
							} else if (input.source == SourceType.Document) {
								records = await new Promise(async (resolve, reject) => {
									await transaction.documentDatabaseConnection.db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(schema.group).find(query).toArray((error: any, results: any) => {
										if (error) {
											reject(error);
										} else {
											resolve(results);
										}
									});
								});
								
								records = records.filter((record) => {
									for (const key in query) {
										if (data[key] != record[key]) return false;
									}
									return true;
								});
								
								for (const record of records) {
									transaction.documentDatabaseConnection.db(DEFAULT_DOCUMENT_DATABASE_NAME).collection(schema.group).deleteOne({
										'_id': {$eq: new ObjectID(record['_id'])}
									});
								}
							} else if (input.source == SourceType.VolatileMemory) {
								const _key = schema.group + ':' + JSON.stringify(CodeHelper.sortHashtable(keys));
								const record = await VolatileMemoryClient.get(_key);
								records = record && [JSON.parse(record)] || [];
								await VolatileMemoryClient.del(_key);
							}
							
							for (const record of records) {
							  const row = {
		  				    keys: {},
		  				    columns: {},
		  				    relations: {}
		  				  };
						  
						  	if (record['_id']) record['id'] = record['_id'].toString();
						  	
							  for (const key in schema.columns) {
		  					  if (schema.columns.hasOwnProperty(key) && record[key] !== undefined) {
		  					    row.columns[key] = fixType(schema.columns[key].fieldType, record[key]);
		  					  }
		  					}
		  					for (const key in schema.keys) {
		  					  if (schema.keys.hasOwnProperty(key) && record[key] !== undefined) {
		  					    row.keys[key] = fixType(schema.keys[key].fieldType, record[key]);
		  					  }
		  					}
		  					
		  					results.push(row);
							}
							
							for (const result of results) {
								for (const key in row.relations) {
									if (row.relations.hasOwnProperty(key)) {
										const relation = schema.relations[key];
										const nextSchema = ProjectConfigurationHelper.getDataSchema().tables[key];
										
							  		for (const nextRow of row.relations[key].rows) {
							  			if (schema.columns.hasOwnProperty(relation.sourceEntity)) {
							  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
								  				nextRow.columns[relation.targetEntity] = result.columns[relation.sourceEntity];
								  			} else {
								  				nextRow.keys[relation.targetEntity] = result.columns[relation.sourceEntity];
								  			}
							  			} else {
							  				if (nextSchema.columns.hasOwnProperty(relation.targetEntity)) {
							  					nextRow.columns[relation.targetEntity] = result.keys[relation.sourceEntity];
								  			} else {
								  				nextRow.keys[relation.targetEntity] = result.keys[relation.sourceEntity];
								  			}
							  			}
							  		}
							  		
							  		result.relations[nextSchema.group] = result.relations[nextSchema.group] || {
				  					  source: SourceType.Relational,
											group: nextSchema.group,
										  rows: []
									  };
									
										await DatabaseHelper.performRecursiveDelete(row.relations[key], nextSchema, result.relations[nextSchema.group].rows, transaction, session, leavePermission);
									}
								}
								
							  for (const key in schema.columns) {
								  if (schema.columns.hasOwnProperty(key) && result.columns[key] !== undefined) {
								    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(schema.columns[key], schema, session)) delete result.columns[key];
								  }
								}
								for (const key in schema.keys) {
								  if (schema.keys.hasOwnProperty(key) && result.keys[key] !== undefined) {
								    if (!leavePermission && !await PermissionHelper.allowOutputOfColumn(schema.keys[key], schema, session)) delete result.keys[key];
								  }
								}
							}
						}
						
						NotificationHelper.notifyUpdates(ActionType.Delete, schema, results);
						break;
					case SourceType.PrioritizedWorker:
						if (!PrioritizedWorkerClient) throw new Error('There was an error trying to obtain a connection (not found).');
						
						throw new Error('Cannot perform DELETE on prioritized worker.');
						
						break;
		    	case SourceType.RESTful:
		    		const _column = Object.keys(schema.columns).map(key => schema.columns[key]).filter(column => column.verb == 'DELETE');
		    		
		    		if (_column.length == 0) throw new Error(`Cannot perform DELETE on RESTful group "${schema.group}".`);
		    		
		    		const _input = DataFormationHelper.convertFromHierarchicalDataTableToJSON(input);
		    		const _output = RequestHelper.delete(_column[0].url, _input, 'json');
		    		
		    		const table = DataFormationHelper.convertFromJSONToHierarchicalDataTable(_output);
		    		results.push(table.rows[0]);
		    		
		    		break;
				}
		    
	  		resolve();
			} catch(error) {
				reject(error);
			}
		});
	}     
};

export {SourceType, ActionType, HierarchicalDataTable, HierarchicalDataRow, Input, DatabaseHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.