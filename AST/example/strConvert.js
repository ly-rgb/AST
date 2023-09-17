//  还原 16进制字符串  和  unicode字符串

const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = fs.readFileSync("./example/code.js", {encoding: "utf-8"});
const ast = parser.parse(code, {sourceType: "module"});

const visitor = {

};


traverse(ast, visitor);
const newCode = generator(ast, {minified: true})
fs.writeFile("newCode.js", newCode.code, (err)=>{})

