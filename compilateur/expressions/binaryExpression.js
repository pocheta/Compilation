const expressionStatement = require("../statement/expressionStatement");

exports.processing = function (expression) {
  let res = "";
  let left = expression.left;
  let right = expression.right;
  let operator = expression.operator;

  if (right.type == "BinaryExpression") {
    // TODO refactor
    res += expressionStatement.processing(right);
    res += expressionStatement.processing(left);
  } else {
    res += expressionStatement.processing(left);
    res += expressionStatement.processing(right);
  }

  if (operator != null) {
    for (let index = 1; index < global.registerCounter; index++) {
      res += "pop(r" + index + "); \n";
    }

    switch (operator) {
      case "+":
        res += "iadd(r1,r2,r1); \n";
        break;
      case "-":
        res += "isub(r1,r2,r1); \n";
        break;
      case "/":
        res += "idiv(r1,r2,r1); \n";
        break;
      case "*":
        res += "imul(r1,r2,r1); \n";
        break;
      case "!=":
        res += "ieq(r1,r2,r1); \n";
        res += "lneg(r1,r1); \n";
        break;
      case "==":
        res += "ieq(r1,r2,r1); \n";
        break;
      case "<":
        res += "ilt(r1, r2, r1);\n";
        break;
      default:
        console.log("undefined operator in binaryExpression: " + operator);
        break;
    }
    global.registerCounter = 1;
    res += "push(r" + global.registerCounter + "); \n\n";
  }

  return res;
};
