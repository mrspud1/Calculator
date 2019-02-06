let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
let divide = (a,b) => a/b;

function operate(a,b,operator) {
    return (operator === "add") ? add(a,b)
    : (operator === "subtract") ? subtract(a,b)
    : (operator === "multiply") ? multiply(a,b)
    : (operator === "divide") ? divide(a,b)
    : alert("operator not defined");
}