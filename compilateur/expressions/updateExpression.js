const help = require("../helpers");
const assignmentExpression = require("../expressions/assignmentExpression");

exports.processing = function (expression) {
  //function pour trouver le X de global[x] de la variable en question
  let res = "";
  switch (expression.operator) {
    case "++":
      res += "push(" + help.findInGlobalMap(expression.argument.name) + ");\n";
      res += "push(iconst(1));\n";
      res += "pop(r1);\n";
      res += "pop(r2);\n";
      res += "iadd(r1, r2, r1);\n";
      res += "push(r1);\n";
      res += "pop(" + help.findInGlobalMap(expression.argument.name) + ");\n";
      res += "push(" + help.findInGlobalMap(expression.argument.name) + ");\n";
      break;

    case "--":
      res += "push(" + help.findInGlobalMap(expression.argument.name) + ");\n";
      res += "push(iconst(1));";
      res += "pop(r1);\n";
      res += "pop(r2);\n";
      res += "isub(r1, r2, r1);\n";
      res += "push(r1);\n";
      res += "pop(" + help.findInGlobalMap(expression.argument.name) + ");\n";
      res += "push(" + help.findInGlobalMap(expression.argument.name) + ");\n";
      break;

    case "+=":
      res += assignmentExpression.processing(expression);
      break;

    default:
      console.log(
        "undefined updateExpression operator: " + expression.operator
      );
      break;
  }
  return res;
};
