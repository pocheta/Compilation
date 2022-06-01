const blockStatement = require("../statement/blockStatement");

exports.processing = function (declaration) {
  let functionName = declaration.id.name;
  let functionBody = declaration.body;

  // set param to scopeMap
  declaration.params.forEach((param) => {
    // maybe switch to check type (identifier...)
    global.scopeVar.set(param.name, global.scopesCounter);
    global.scopesCounter++;
  });

  let res = "goto functend_" + functionName + ";" + "\n\n";

  res += "funct_" + functionName + ":" + "\n";

  switch (functionBody.type) {
    case "BlockStatement":
      res += blockStatement.processing(functionBody);
      break;
  }

  res += "functend_" + functionName + ":" + "\n";

  return res;
};
