//  还原  jsfuck编码

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("1.js", {encoding: "utf-8"});
const ast = parser.parse(code, {sourceType: "module"});

const visitor = {
        "BinaryExpression|UnaryExpression"(path) {
        if(path.isUnaryExpression({operator:"-"}) ||
         path.isUnaryExpression({operator:"void"}))
      {
        return;
      }
        const {confident, value} = path.evaluate();
        if (!confident)
            return;
        if (typeof value == 'number' && (!Number.isFinite(value))) {
            return;
        }
        path.replaceWith(types.valueToNode(value));
    }}

traverse(ast, visitor);
const newCode = generator(ast, {retainLines: true, concise: false})
fs.writeFile("newCode.js", newCode.code, (err)=>{})



