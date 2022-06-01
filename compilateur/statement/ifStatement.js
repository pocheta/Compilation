const binaryExpression = require("../expressions/binaryExpression");
const basicStatement = require("../statement/basicStatement");

exports.processing = function (body) {
  let res = "";

  if (body.test != null) {
    res += binaryExpression.processing(body.test);
  }

  res += "\npop(r1); \n";
  res += "lneg(r1,r1);\n";
  res += "if(asbool(r1)) goto else" + global.ifCounter + ";\n\n";

  body.consequent.body.forEach((consequentBody) => {
    res += basicStatement.processing(consequentBody);
  });

  res += "goto endif" + global.ifCounter + ";\n";

  res += "else" + global.ifCounter + ":\n";
  if (body.alternate != null) {
    body.alternate.body.forEach((alternateBody) => {
      res += basicStatement.processing(alternateBody);
    });
  }
  res += "endif" + global.ifCounter + ":\n";

  global.ifCounter++;

  return res;
};
