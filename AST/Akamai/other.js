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


// 将二项表达式计算出来的脚本
const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const code = fs.readFileSync("step3.js", {encoding: "utf-8"});
const ast = parser.parse(code);

const visitor = {
    "BinaryExpression"(path) {
        if(types.isBinaryExpression(path.node.left) && types.isBinaryExpression(path.node.right)){
            const {confident, value} = path.evaluate()
            path.replaceInline(types.valueToNode(value))
        }
    }
}

traverse(ast, visitor);

const newCode = generator(ast)

fs.writeFile("newCode.js", newCode, (err)=>{})


//  将生成的变量替换到调用处
const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default


const code = fs.readFileSync("step4.js", {encoding: "utf-8"});
const ast = parser.parse(code);

var obj1 = {};

const visitor = {
    FunctionDeclaration(path){
        if(path.node.id.name == "B7V"){
            let expressions = path.node.body.body[0].expression.expressions
            for(i = 0; i < expressions.length; i++){
                let left = expressions[i].left.name
                let right = expressions[i].right.value;
                obj1[left] = right
            }
        }
    },
    CallExpression(path){
        if(path.node.arguments == []){
            return
        };
        for(i = 0; i < path.node.arguments.length; i++){
            if(path.node.arguments[i].type == 'Identifier'){
                let name = path.node.arguments[i].name;
                if(obj1.hasOwnProperty(name)){
                    let value = obj1[name]
                    path.node.arguments[i].type = 'NumericLiteral'
                    path.node.arguments[i].value = value
            }
        }
        }
         },
    enter(path){
        if(path.node.type == 'Identifier'){
            let name = path.node.name
            if(obj1.hasOwnProperty(name)){
                let value = obj1[name]
                path.node.type = 'NumericLiteral'
                path.node.value = value
        }
    }
}
}


traverse(ast, visitor)

newCode = generator(ast, {retainLines: true, compact: false})
fs.writeFile("newCode.js", newCode.code, (err)=>{})


