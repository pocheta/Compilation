const literal = require("../literal");
const binaryExpression = require("../expressions/binaryExpression");
const updateExpression = require("../expressions/updateExpression");
const helpers = require("../helpers");
const assignmentExpression = require("../expressions/assignmentExpression");
const callExpression = require("../expressions/callExpression");

exports.processing = function (expression) {
  let res = "";
  let printFlag = false;

  switch (expression.type) {
    case "Identifier":
      let val = helpers.findInGlobalMap(expression.name);
      if (val == undefined) {
        val = helpers.findInLocalMap(expression.name);
        if (val == undefined) {
          val = helpers.findInScopeMap(expression.name);
        }
      }
      res += "push(" + val + ");\n";
      global.registerCounter++;
      break;

    case "NumericLiteral":
      res += literal.numericLiteral(expression);
      global.registerCounter++;
      break;

    case "BinaryExpression":
      res += binaryExpression.processing(expression);
      break;

    case "UpdateExpression":
      res += updateExpression.processing(expression);
      break;

    case "AssignmentExpression":
      res += assignmentExpression.processing(expression);
      break;

    case "CallExpression":
      res += callExpression.processing(expression);
      break;

    default:
      console.log("undefined expressionStatement: " + expression.type);
      break;
  }

  return res;
};
