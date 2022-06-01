const binaryExpression = require("../expressions/binaryExpression");
const assignmentExpression = require("../expressions/assignmentExpression");
const updateExpression = require("../expressions/updateExpression");
const basicStatement = require("./basicStatement");

exports.processing = function (body) {
  // body init
  let res = "";

  if (body.init != null) res += assignmentExpression.processing(body.init);

  // push valeur de index
  res += "for_start" + global.forCounter + ":\n";

  if (body.test != null) {
    res += binaryExpression.processing(body.test);
  }

  res += "\npop(r1); \n";
  res += "lneg(r1,r1);\n";
  res += "if(asbool(r1)) goto for_end" + global.forCounter + ";\n\n";

  res += updateExpression.processing(body.update);

  body.body.body.forEach((blockBody) => {
    res += basicStatement.processing(blockBody);
  });

  res += "goto for_start" + global.forCounter + ";\n";
  res += "for_end" + global.forCounter + ":\n";

  global.forCounter++;
  return res;
};
