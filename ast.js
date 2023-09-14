// 还原字符串

const parser = require("@babel/parser");
const generate = require("@babel/generator").default
const traverse = require("@babel/traverse").default
const types = require("@babel/types");
const fs = require("fs");


const code = fs.readFileSync("Literal.js", {encoding: "utf-8"});
const ast = parser.parse(code);

const visitor = {
    Literal(path) {
    }
};

traverse(ast, {});

const result = generate(ast, {minified: true, jsescOption: {minimal: true}})

fs.writeFile("code.js", result.code, (err)=>{})

