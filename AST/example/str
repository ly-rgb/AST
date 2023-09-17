//  还原  ASCII码混淆

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("./example/code.js", {encoding: "utf-8"});
const ast = parser.parse(code, {sourceType: "module"});

const visitor = {
    CallExpression(path){
        if(path.node.callee.name == "eval"){
            let evalCode = generator(path.node.arguments[0]).code
            let result = eval(evalCode)
            path.replaceWith(types.identifier(result))
        }
    }

};

traverse(ast, visitor);
const newCode = generator(ast)
fs.writeFile("newCode.js", newCode.code, (err)=>{})
