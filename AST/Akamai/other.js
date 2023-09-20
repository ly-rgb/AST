//  变量替换脚本， 将生成的500个变量标识符替换成数字型参数

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("step2.js", {encoding: "utf-8"});
const ast = parser.parse(code, {sourceType: "module"});

const visitor = {
    Identifier(path){
        if(path.node.name == "Km"){
            path.node.type = "NumericLiteral"
            path.node.value = 8
        };
        if(path.node.name == "rm"){
            path.node.type = "NumericLiteral"
            path.node.value = 4
        };
        if(path.node.name == "Mm"){
            path.node.type = "NumericLiteral"
            path.node.value = 0
        };
        if(path.node.name == "fm"){
            path.node.type = "NumericLiteral"
            path.node.value = 9
        };
        if(path.node.name == "Fm"){
            path.node.type = "NumericLiteral"
            path.node.value = 5
        };
        if(path.node.name == "hm"){
            path.node.type = "NumericLiteral"
            path.node.value = 3
        };
        if(path.node.name == "lm"){
            path.node.type = "NumericLiteral"
            path.node.value = 6
        };
        if(path.node.name == "Rm"){
            path.node.type = "NumericLiteral"
            path.node.value = 1
        };
        if(path.node.name == "XT"){
            path.node.type = "NumericLiteral"
            path.node.value = 10
        };
        if(path.node.name == "Om"){
            path.node.type = "NumericLiteral"
            path.node.value = 2
        };
        if(path.node.name == "gm"){
            path.node.type = "NumericLiteral"
            path.node.value = 7
        };
    }
};

traverse(ast, visitor);
const newCode = generator(ast)
fs.writeFile("newCode.js", newCode.code, (err)=>{})
