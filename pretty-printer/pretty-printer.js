const fs = require("fs");
const endOfLine = require("os").EOL;

/// Récupération des arguments de lancement
let inputFilePath = process.argv[2];

let outputFilePath = inputFilePath.split("/")[3];
outputFilePath = "./output/" + outputFilePath.substring(0, outputFilePath.length - 2);

const json = require(inputFilePath);
const logger = fs.createWriteStream(outputFilePath);

const body = JSON.parse(JSON.stringify(json)).program.body;

let content = "";
let flagEmpty = false;

for (let index = 0; index < body.length; index++) {
    const contentBody = body[index];

    if(flagEmpty){
        logger.write(endOfLine);
        flagEmpty = false
    }else{
        astToString(contentBody);
        logger.write(content +";");
        logger.write(endOfLine);
    }
    content = "";
}

logger.end();

function astToString(contentBody) {
    switch (contentBody.type) {

        case "ExpressionStatement":
            astToString(contentBody.expression)
            break;

        case "BinaryExpression":            
            if(contentBody.extra !== undefined && contentBody.extra.parenthesized) {
                content += "(";
                astToString(contentBody.left);
                content += " " + contentBody.operator + " ";
                astToString(contentBody.right);
                content += ")";
            }else{
                astToString(contentBody.left);
                content += " " + contentBody.operator + " ";
                astToString(contentBody.right);
            }
            break;

        case "NumericLiteral":
            content += contentBody.value;
            break;
            
        case "VariableDeclaration":
            content += contentBody.kind + " "
            astToString(contentBody.declarations)
            
            for (let index = 0; index < contentBody.declarations.length; index++) {
                astToString(contentBody.declarations[index]);
                if(index < contentBody.declarations.length - 1) content += ", ";
            }

            break;

        case "VariableDeclarator":
            astToString(contentBody.id);
            if(contentBody.init != null) {
                content += " = ";
                astToString(contentBody.init)
            }
            
            break;

        case "Identifier":
            content += contentBody.name
            break;  

        case "StringLiteral":
            content += "\"" + contentBody.value + "\"";
            break;

        case "NullLiteral":
            content += "null";
            break;
    
        case "WhileStatement":
            content += "while ("
            astToString(contentBody.test)
            content += ") {"
            astToString(contentBody.body)
            content += endOfLine + "}"
            break;

        case "BlockStatement":

            for (let index = 0; index < contentBody.body.length; index++) {
                content += endOfLine + "\t"
                astToString (contentBody.body[index])
                content += ''
            }
            break;
        
        case "UpdateExpression":
            astToString(contentBody.argument)
            content += contentBody.operator
            break;

        case "CallExpression":
            astToString(contentBody.callee);
            content += "(";    
            for (let index = 0; index < contentBody.arguments.length; index++) {
                astToString(contentBody.arguments[index])
                if(index < contentBody.arguments.length - 1) content += ", ";
            }
            content += ")"; 
            break;   
        
        case "IfStatement":
            content += "if ("
            astToString(contentBody.test)
            content += ") {"
            astToString(contentBody.consequent)
            content += endOfLine + "}"
            if(contentBody.alternate != null) {
                content += endOfLine + "else {"   
                astToString(contentBody.alternate)
                content += endOfLine + "}"
            }
            break;
        
        case "AssignmentExpression":
            astToString(contentBody.left);
            content += " " + contentBody.operator + " ";
            astToString(contentBody.right);
            break;
        
        case "ForStatement":
            content += "for ("
            if(contentBody.init != null) astToString(contentBody.init)
            content += "; "
            astToString(contentBody.test)
            content += "; " 
            astToString(contentBody.update)
            content += ") {"
            astToString(contentBody.body)
            content += endOfLine + "}"
            break;
        
        case "BreakStatement":
            content += "break"
            break;

        case "ContinueStatement":
            content += "continue"
            break;
        
        case "MemberExpression":
            astToString(contentBody.object)
            content += "."
            astToString(contentBody.property)
            break;
    
        case "LogicalExpression":
            if(contentBody.extra != undefined && contentBody.extra.parenthesized) {
                content += "(";
                astToString(contentBody.left);
                content += " " + contentBody.operator + " ";
                astToString(contentBody.right);
                content += ")";
            }else{
                astToString(contentBody.left);
                content += " " + contentBody.operator + " ";
                astToString(contentBody.right);
            }
            break;    

        case "BooleanLiteral":
            return content += contentBody.value
        
        case "FunctionDeclaration":
            content += "function "
            astToString(contentBody.id)

            content += "("
            for (let index = 0; index < contentBody.params.length; index++) {
                astToString(contentBody.params[index])
                if(index < contentBody.params.length - 1) content += ", ";
            }
            content += ") {"
            astToString(contentBody.body) 
            content += endOfLine + "}"
            break;

        case "ReturnStatement":
            content += "return "
            astToString(contentBody.argument)
            break;

        case "EmptyStatement":
            flagEmpty = true; 
            break;
        
        case "UnaryExpression":
            if(contentBody.prefix != undefined) {
                content += "(" + contentBody.operator 
                astToString(contentBody.argument)
                content += ")"
            }else{
                content += "(" 
                astToString(contentBody.argument)
                content += contentBody.operator  + ")"
            }
            break;

        case "SwitchStatement":
            content += "switch ("    
            astToString(contentBody.discriminant)
            content += ") {" + endOfLine;

            for (let index = 0; index < contentBody.cases.length; index++) {
                astToString(contentBody.cases[index])
                content += "\n"
            }
            content += "\t}"
            break;
    
        case "SwitchCase":
            if(contentBody.test == undefined){
                content += "\t\t" +"default: "
            } else {
                content += "\t\t" +"case " 
                astToString(contentBody.test) 
                content += ": ";
            }
 
            for (let index = 0; index < contentBody.consequent.length; index++) {
                content += "\n" + "\t\t\t"
                astToString(contentBody.consequent[index])
            }
            break;
        
        case "ObjectExpression":
            content += "{";
            for (let index = 0; index < contentBody.properties.length; index++) {
                astToString(contentBody.properties[index])
                if(index < contentBody.properties.length - 1) content += ", ";
            }
            content += "}";
            break;

        case "ObjectProperty":
            astToString(contentBody.key);
            content += ": "
            astToString(contentBody.value);
            break;

        case "ThisExpression":
            content += "this";
            break;

        case "NewExpression":
            astToString(contentBody.callee)
            content += "("
            for (let index = 0; index < contentBody.arguments.length; index++) {
                astToString(contentBody.arguments[index])
                if(index < contentBody.arguments.length - 1) content += ", ";
            }
            content += ")";
            break;

        default:
            console.log(contentBody.type)
            break;
    }
}

