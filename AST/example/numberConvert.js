//  还原  还原 数值常量加密   位异或运算

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("./example/code.js", {encoding: "utf-8"});
const ast = parser.parse(code, {sourceType: "module"});

const visitor = {
    BinaryExpression(path){
        if(types.isNumericLiteral(path.node.left) && types.isNumericLiteral(path.node.right)){
            let {confident, value} = path.evaluate()
            if(confident){
                path.replaceWith(types.valueToNode(value))
            }
        }
        }
    };

traverse(ast, visitor);
const newCode = generator(ast)
fs.writeFile("newCode.js", newCode.code, (err)=>{})

