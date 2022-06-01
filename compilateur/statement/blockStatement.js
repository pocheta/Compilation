const expressionStatement = require("./expressionStatement");
const returnStatement = require("./returnStatement");
const localVariableDeclaration = require("../declaration/localVariableDeclaration");

exports.processing = function (statement) {
  let res = "";

  //   console.log(statement);

  statement.body.forEach((element) => {
    // console.log("EL::", element);

    switch (element.type) {
      case "ExpressionStatement":
        res += expressionStatement.processing(element.expression);
        break;

      case "ReturnStatement":
        res += returnStatement.processing(element);
        break;

      case "VariableDeclaration":
        res += localVariableDeclaration.processing(element.declarations);
        break;

      default:
        break;
    }
  });

  return res;
};
