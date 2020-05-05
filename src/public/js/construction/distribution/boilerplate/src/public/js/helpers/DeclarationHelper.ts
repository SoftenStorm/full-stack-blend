// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

var Project = {};

var DeclarationHelper = {
  declareNamespace: (path: string) => {
    let splited = path.split('.');
    let current: any = Project;
    
    splited.forEach((name) => {
      if (current[name] === undefined) {
        current[name] = {};
      }
      current = current[name];
    });
    
    return current;
  },
  
  'declare': (path: string, klass: any) => {
    let splited = path.split('.');
    let name = splited.pop();
    let namespacePath = splited.join('.');
    
    let namespace = DeclarationHelper.declareNamespace(namespacePath);
    namespace[name] = klass;
    
    return namespace[name];
  }
};

export {Project, DeclarationHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.