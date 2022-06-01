const literal = require("../literal");

exports.processing = function (expression) {
  let res = "";
  console.log("call::", expression);

  switch (expression.callee.type) {
    case "Identifier":
      for (let i = expression.arguments.length - 1; i >= 0; i--) {
        res += literal.numericLiteral(expression.arguments[i]);
      }
      res += "call(funct_" + expression.callee.name + ");" + "\n";
      break;

    default:
      // revoir pour faire le case print
      printFlag = true;
      res += "// Ici ce trouve un print : le debug_reg fait office de print\n";
      res +=
        "push(" +
        helpers.findInGlobalMap(expression.arguments[0].name) +
        ");\n";
      break;
  }

  return res;
};
