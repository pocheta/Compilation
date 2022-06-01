const expressionStatement = require("./expressionStatement");
const variableDeclaration = require("../declaration/variableDeclaration");
const whileStatement = require("./whileStatement");
const forStatement = require("./forStatement");
const ifStatement = require("./ifStatement");
const functionDeclaration = require("../declaration/functionDeclaration");

exports.processing = function (contentBody) {
  let content = "";

  global.registerCounter = 1;
  console.log(contentBody);

  switch (contentBody.type) {
    case "ExpressionStatement":
      content += expressionStatement.processing(contentBody.expression);
      content += "pop(r" + global.registerCounter + "); \n";
      if (global.scopesCounter > 3) {
        content += "drop(" + (Math.abs(global.scopesCounter) - 3) + ");" + "\n";
      }
      content += "debug_reg(r" + global.registerCounter + ");" + "\n";
      break;

    case "VariableDeclaration":
      contentBody.declarations.forEach((declaration) => {
        let res = variableDeclaration.processing(declaration);
        if (res != null) content += res;
      });
      break;

    case "WhileStatement":
      content += whileStatement.processing(contentBody);
      break;

    case "IfStatement":
      content += ifStatement.processing(contentBody);
      break;

    case "ForStatement":
      content += forStatement.processing(contentBody);
      break;

    case "BreakStatement":
      content += "goto while_end" + global.whileCounter + ";\n";
      global.breakCounter++;
      break;

    case "ContinueStatement":
      content += "goto while_start" + global.whileCounter + ";\n";
      break;

    case "FunctionDeclaration":
      content += functionDeclaration.processing(contentBody);
      break;

    default:
      console.log("undefined compilateur: " + contentBody.type) + "\n";
      break;
  }
  return content;
};
