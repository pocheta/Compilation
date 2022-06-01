const binaryExpression = require("../expressions/binaryExpression");

exports.processing = function (statement) {
  let res = "";

  switch (statement.argument.type) {
    case "BinaryExpression":
      res += binaryExpression.processing(statement.argument);
      break;

    default:
      break;
  }

  res += "pop(r" + global.registerCounter + ");" + "\n";
  res += "drop(" + (Math.abs(global.localsCounter) - 1) + ");" + "\n";
  res += "ret(r" + global.registerCounter + ");" + "\n";

  res += "assert(0);\n\n"; // doute sur où le mettre

  return res;
};
