// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

const Project: any = {};

const DeclarationHelper = {
  declareNamespace: (path: string) => {
    const splited = path.split(".");
    let current = Project;
    
    splited.forEach((name) => {
      if (current[name] === undefined) {
        current[name] = {};
      }
      current = current[name];
    });
    
    return current;
  },
  
  "declare": (level: string, path: string, klass: any) => {
    const splited = path.split(".");
    const name = splited.pop();
    const namespacePath = splited.join(".");
    
    const namespace = DeclarationHelper.declareNamespace(namespacePath);
    namespace[name] = klass;
    
    return namespace[name];
  },
  
  "get": (path: string) => {
    const splited = path.split(".");
    splited.shift();
    let current = Project;
    
    splited.forEach((name) => {
      if (current[name] === undefined) {
        return null;
      }
      current = current[name];
    });
    
    return current;
  }
};

export {Project, DeclarationHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.