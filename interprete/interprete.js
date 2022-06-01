const fs = require("fs");
const endOfLine = require("os").EOL;

// Récupération des arguments de lancement
let inputFilePath = process.argv[2];

let outputFilePath = inputFilePath.split("/")[3];
outputFilePath = "./output/" + outputFilePath.substring(0, outputFilePath.length - 4) + "txt";

const json = require(inputFilePath);
const logger = fs.createWriteStream(outputFilePath);

const body = JSON.parse(JSON.stringify(json)).program.body;

let variable = new Array();
let flag = false;
let flagBreak = false;
let tabulation = "";
let content = ""; // voir pour gérer autrement

for (let index = 0; index < body.length; index++) {
    const contentBody = body[index];

    astToInterprete(contentBody);
    logger.write(content);
    logger.write(endOfLine);
    content = "";
    tabulation = "";

}

//console.log(body)
// todo factoriser avec while
function astToInterprete(contentBody) {
    console.log("!!!!!!!!!!!!!!!!!!!!!! " + contentBody.type);
    switch(contentBody.type) {
        case "ExpressionStatement":
            expressionStatement(contentBody.expression);
            content += "\n"
            break;

        case "VariableDeclaration":
            variableDeclaration(contentBody);
            break;

        case "WhileStatement" :
            tabulation += "\t"
            whileStatement(contentBody);
            break;

        case "IfStatement" :
            ifStatement(contentBody);
            break;

        case "ForStatement":
            tabulation += "\t"
            forStatement(contentBody);
            break;

        case "FunctionDeclaration":
            console.log("FunctionDeclaration");
            break;

        case "EmptyStatement":
            console.log("EmptyStatement");
            break;    

        default:
            console.log(contentBody)
            break;
        

    }
}

function forStatement(contentBody) {
    content += "ForStatement: "
    expressionStatement(contentBody.init);
    
    let gauche, droite, operator;
    [gauche, droite, operator] = testValueAssign(contentBody.test, gauche, droite, operator);
    content += "\n"
    while (testEquals(gauche, operator, droite)) {
        expressionStatement(contentBody.update);
        content += "\n"
        blockStatement(contentBody.body);
    }
    variable = new Array();
}

function whileStatement(contentBody) {
    content += "WhileStatement: \n"

    let gauche, droite, operator;
    [gauche, droite, operator] = testValueAssign(contentBody.test, gauche, droite, operator);
    
    while (testEquals(gauche, operator, droite) && !flagBreak) {
        blockStatement(contentBody.body)
    }
    flagBreak = false;
}

function ifStatement(contentBody) {
    let gauche, droite, operator;
    [gauche, droite, operator] = testValueAssign(contentBody.test, gauche, droite, operator);

    if (testEquals(gauche, operator, droite)) {
        content += tabulation + "IfStatement: "
        tabulation += "\t"
        blockStatement(contentBody.consequent);
    }else{
        if(contentBody.alternate != null){
            blockStatement(contentBody.alternate);
        }
    }
    tabulation = "\t"
}

function blockStatement(contentBody){
    for (let index = 0; index < contentBody.body.length; index++) {
        console.log(contentBody.body[index].type);
        switch (contentBody.body[index].type) {
            case "BreakStatement":
                content += "BreakStatement"
                content += "\n"
                flagBreak = true;
                break;
    
            case "ContinueStatement":
                flag = true
                content += "ContinueStatement"
                content += "\n"
                break;
        
            default:
                if (!flag && !flagBreak){
                    astToInterprete(contentBody.body[index])
                }else{
                    flag = false;
                }
                break;
        }
        
    }
    
}


function variableDeclaration(contentBody) {
    content += "VariableDeclaration: "

    const declarations = contentBody.declarations;
    declarations.forEach(declaration =>  {
        content += declaration.id.name;
        if (declaration.init) {
            content += " ";
            switch (declaration.init.type) {
                case "NumericLiteral":
                    variable.push([declaration.id.name, declaration.init.value])
                    content += declaration.init.value;
                    break;
                case "StringLiteral":
                    variable.push([declaration.id.name, declaration.init.value])
                    content += '"' + declaration.init.value + '"';
                    break;
                case "NullLiteral":
                    variable.push([declaration.id.name, null])
                    content += null;
            }
        }
        if(declarations.length > 1) {
            content += ", ";
        }
    });
    if(declarations.length > 1) {
        content = content.substring(0, content.length - 2);
    }
}

function expressionStatement(expression) {
    switch (expression.type) {
        case "NumericLiteral":
            content += "ExpressionStatement: " + expression.value;
            break;
        case "BinaryExpression":
            content += "ExpressionStatement: " + binaryExpression(expression)
            break;
        case "CallExpression":
            content += tabulation + "CallExpression: " + expression.callee.name + '(' + searchVar(expression.arguments[0].name)[1] + ')';
            break;
        case "UpdateExpression":
            content += tabulation + "UpdateExpression: " + expression.argument.name
            switch (expression.operator) {
                case "++":
                    content += "++"
                    searchVar(expression.argument.name)[1]++;
                    break;

                case "--":
                    content += "--"
                    searchVar(expression.argument.name)[1]--;
                    break;
                default:
                    break;
            }
            break;    
        
        case "AssignmentExpression":
            switch (expression.operator) {
                case "+=":
                    content += tabulation + "AssignmentExpression: " + expression.left.name + " += " + expression.right.value 
                    searchVar(expression.left.name)[1] += expression.right.value;
                    break;

                case "-=":
                    content += tabulation + "AssignmentExpression: " + expression.left.name + " -= " + expression.right.value
                    searchVar(expression.left.name)[1] -= expression.right.value;
                    break;
                
                case "=":
                    content += tabulation + "AssignmentExpression: " + expression.left.name + " = " + expression.right.value
                    if (searchVar(expression.left.name) == "error"){    
                        variable.push([expression.left.name, expression.right.value])
                    }else{
                        searchVar(expression.left.name)[1] = expression.right.value;
                    }
                    
                    break;

                default:
                    console.log(expression.operator);
            }
            break;

        default:
            console.log(expression);
            break;
    }
}

function binaryExpression(expression) {
    let left;
    let right;
    switch (expression.left.type) {
        case "NumericLiteral":
            left = expression.left.value;
            break;
        case "BinaryExpression":
            left = binaryExpression(expression.left);
            break;
    }
    switch (expression.right.type) {
        case "NumericLiteral":
            right = expression.right.value;
            break;
        case "BinaryExpression":
            right = binaryExpression(expression.right);
            break;
    }
    return compute(left, expression.operator, right);
}

function compute(left, operator, right) {
    let value;
    switch (operator) {
        case "+":
            value = left + right;
            break;
        case "-":
            value = left - right;
            break;
        case "/":
            value = left / right;
            break;
        case "*":
            value = left * right;
    }
    return value;
}

function testEquals(gauche, operator, droite) {
    let res = false;
    switch (operator){
        case '<':
            if(gauche[1] < droite[1]) res = true;
            break;
        case '>':
            if(gauche[1] > droite[1]) res = true; 
            break;
        case '==':
            if(gauche[1] == droite[1]) res = true;
            break;        
        case '!=':
            if(gauche[1] != droite[1]) res = true;
    }
    return res;
}

function searchVar(searchVar) {
    let res = null;
    variable.forEach(element => {
        if (element[0] == searchVar) {
            res = element;
        };
    });
    if (res != null ) return res;
    return "error"
}

function testValueAssign(test, gauche, droite, operator){
    switch (test.left.type) {
        case "Identifier":
            gauche = searchVar(test.left.name)
            if (gauche == "error") {
                gauche = [test.left.name, 0];
                variable.push(gauche);
            }
            break;
        case "NumericLiteral":
            gauche = ["gauche", test.left.value];
            break;
    }
    
    switch (test.right.type) {
        case "Identifier":
            droite = searchVar(test.right.name);
            if (droite == "error") {
                droite = [test.droite.name, 0];
                variable.push(droite);
            }
            break;
        default:
            droite = ["droite", test.right.value]
            break;
    }

    operator = test.operator

    return [gauche, droite, operator];
}