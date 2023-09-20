// 还原控制流平坦化

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("./example/code.js", {encoding: "utf-8"});
const ast = parser.parse(code, {sourceType: "module"});

var arr1 = [];
var arr2;
function my(node){
        for(let i = 0; i < arr2.length; i++){
                        if(arr2[i].test.value == node){
                                let myNode = arr2[i].consequent[0].body;
                                for(let i = 0; i < myNode.length; i++){
                                        if(myNode[i].expression.left.name == "qL" && myNode[i].expression.operator == "="){
                                                nextNode = myNode[i].expression.right.value
                                                arr1.push(nextNode)

                                        };
                                        if(myNode[i].expression.left.name == "qL" && myNode[i].expression.operator == "+="){
                                                nextNode = myNode[i].expression.right.value + node
                                                arr1.push(nextNode)
                                        };
                                        if(myNode[i].expression.left.name == "qL" && myNode[i].expression.operator == "-="){
                                                nextNode = node - myNode[i].expression.right.value
                                                arr1.push(nextNode)
                                        };
                                };
                                console.log(arr1)
                        }
                };
        my(nextNode)
};
const visitor = {
        SwitchStatement(path){
                let cList = path.node.cases;
                arr2 = cList;
                my(221)

        }
}

traverse(ast, visitor);
const newCode = generator(ast, {retainLines: true, concise: false})
fs.writeFile("newCode.js", newCode.code, (err)=>{})

