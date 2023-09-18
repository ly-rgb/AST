//  还原  函数花指令

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("./example/code.js", {encoding: "utf-8"});
const ast = parser.parse(code, {sourceType: "module"});
visitor = {
    FunctionDeclaration(path){
        if (path.node.body.body === null
            || !types.isReturnStatement(path.node.body.body[0])
            )return;
        let funcValue = path.node.body.body[0].argument
        let Bind = path.scope.getBinding(path.node.id.name)
        console.log(path.node.id.name)
        Bind.scope.traverse(
            Bind.scope.block,
            {
                CallExpression(p) {
                    console.log(path.node.id.name)
                    if (p.node.callee.name != path.node.id.name){
                        return
                    }
                    if (p.node.callee.name == path.node.id.name){
                        p.replaceWith(funcValue)
                    }
                    
                    }
                }
            
        );
    },
}

traverse(ast, visitor);
const newCode = generator(ast)
fs.writeFile("newCode.js", newCode.code, (err)=>{})
