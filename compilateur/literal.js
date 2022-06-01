exports.numericLiteral = function (expression) {
    return "push(iconst(" + expression.value + "));" + "\n";
};

exports.stringLiteral = function (expression) {
    return 'push(aconst("' + expression.value + '"));' + "\n";
};
