const literal = require("../literal");
const help = require("../helpers");

exports.processing = function (declaration) {
  if (declaration.init != null) {
    switch (declaration.init.type) {
      case "NumericLiteral":
        let resNumeric = literal.numericLiteral(declaration.init);

        global.globalVar.set(declaration.id.name, global.globalsCounter);
        resNumeric +=
          "pop(" + help.findInGlobalMap(declaration.id.name) + ");\n";
        global.globalsCounter++;
        return resNumeric;

      case "StringLiteral":
        let resString = literal.stringLiteral(declaration.init);
        global.globalVar.set(declaration.id.name, global.globalsCounter);
        resString +=
          "pop(" + help.findInGlobalMap(declaration.id.name) + ");\n";
        global.globalsCounter++;
        return resString;

      case "NullLiteral":
        // TODO
        break;

      default:
        console.log(
          "undefined variableDeclaration init: " + declaration.init.type
        );
        break;
    }
  } else {
    switch (declaration.type) {
      case "VariableDeclarator":
        global.globalVar.set(declaration.id.name, global.globalsCounter);
        global.globalsCounter++;
        break;

      default:
        console.log("undefined variableDeclaration: " + declaration.type);
        break;
    }
  }
};
