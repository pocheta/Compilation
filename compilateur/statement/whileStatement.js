const binaryExpression = require("../expressions/binaryExpression");
const basicStatement = require("../statement/basicStatement");

exports.processing = function (body) {
  let res = "while_start" + global.whileCounter + ":\n";

  if (body.test != null) {
    res += binaryExpression.processing(body.test);
  }

  res += "\npop(r1); \n";
  res += "lneg(r1,r1);\n";
  res += "if(asbool(r1)) goto while_end" + global.whileCounter + ";\n\n";

  body.body.body.forEach((blockBody) => {
    res += basicStatement.processing(blockBody);
  });
  res += "goto while_start" + global.whileCounter + ";\n";
  res += "while_end" + global.whileCounter + ":\n";

  global.whileCounter++;

  return res;
};
