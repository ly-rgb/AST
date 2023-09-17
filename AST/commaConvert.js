// 还原 逗号表达式  混淆

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("./example/code.js", {encoding: "utf-8"});
const ast = parser.parse(code);

const visitor = {
    SequenceExpression:{
        exit(path){
            let expressions = path.node.expressions;
            let finalExpression = expressions.pop();
            let statement = path.getStatementParent();
            expressions.map(function (v){
                statement.insertBefore(types.ExpressionStatement(v));
            });
            path.replaceInline(finalExpression);
        }
    }
}

traverse(ast, visitor);
const newCode = generator(ast)
fs.writeFile("newCode.js", newCode.code, (err)=>{})

