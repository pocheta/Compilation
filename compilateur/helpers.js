exports.findInGlobalMap = function (name) {
  let res;
  global.globalVar.forEach((element, key) => {
    if (key == name) {
      res = "globals[" + element + "]";
    }
  });
  return res;
};

exports.findInLocalMap = function (name) {
  let res;
  global.localVar.forEach((element, key) => {
    if (key == name) {
      res = "bp[" + element + "]";
    }
  });
  return res;
};

exports.findInScopeMap = function (name) {
  let res;
  global.scopeVar.forEach((element, key) => {
    if (key == name) {
      res = "bp[" + element + "]";
    }
  });
  return res;
};
