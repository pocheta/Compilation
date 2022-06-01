const helpers = require("../helpers");
const numericLiteral = require("../literal");
const binaryExpression = require("./binaryExpression");

exports.processing = function (expression) {
  let res = "";

  switch (expression.left.type) {
    case "Identifier":
      res += "push(" + helpers.findInGlobalMap(expression.left.name) + ");\n";
      global.registerCounter++;
      break;

    default:
      break;
  }

  switch (expression.right.type) {
    case "BinaryExpression":
      res += binaryExpression.processing(expression.right);
      global.registerCounter++;
      break;

    case "NumericLiteral":
      res += numericLiteral.numericLiteral(expression.right);
      global.registerCounter++;
      break;

    default:
      break;
  }

  if (expression.operator != null) {
    for (let index = 1; index < global.registerCounter; index++) {
      res += "pop(r" + index + "); \n";
    }

    switch (expression.operator) {
      case "+=":
        res += "iadd(r1,r2,r1);\n";
        break;
      case "-=":
        res += "isub(r1,r2,r1);\n";
        break;
      case "=":
        //Ne rien faire
        break;
      default:
        console.log(
          "undefined operator in assignmentExpression: " + expression.operator
        );
        break;
    }
    global.registerCounter = 1;
    res += "push(r" + global.registerCounter + "); \n";
    res += "pop(" + helpers.findInGlobalMap(expression.left.name) + ");\n";
    res += "push(" + helpers.findInGlobalMap(expression.left.name) + ");\n";
  }

  return res;
};
