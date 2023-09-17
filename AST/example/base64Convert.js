//  还原  base64 编码

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("./example/code.js", {encoding: "utf-8"});
const ast = parser.parse(code, {sourceType: "module"});

const visitor = {
    MemberExpression(path){
        let decryptStr = path.node.property.value;
        let result = atob(decryptStr)
        path.node.property = types.stringLiteral(result)
        }
    };

traverse(ast, visitor);
const newCode = generator(ast)
fs.writeFile("newCode.js", newCode.code, (err)=>{})

