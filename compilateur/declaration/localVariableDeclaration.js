const literal = require("../literal");

exports.processing = function (declarations) {
  let res = "";
  declarations.forEach((declaration) => {
    if (declaration.init != null) {
      switch (declaration.init.type) {
        case "NumericLiteral":
          res += literal.numericLiteral(declaration.init);

          global.localVar.set(declaration.id.name, global.localsCounter);
          global.localsCounter--;
          break;

        default:
          break;
      }
    }
  });
  return res;
};
