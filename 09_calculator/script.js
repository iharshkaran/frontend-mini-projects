const clearBtn = document.querySelector("#clear-button");
const deleteBtn = document.querySelector("#delete-button");
const divideBtn = document.querySelector("#divide-button");
const multiplyBtn = document.querySelector("#multiply-button");
const subtractBtn = document.querySelector("#subtract-button");
const addBtn = document.querySelector("#add-button");
const equalBtn = document.querySelector("#equal-button");
const numbersBtn = document.querySelectorAll(".number");
const resultElement = document.querySelector("#result");
const decimalBtn = document.querySelector("#decimal-button");

// Initialize the variables
let result ='';
let operation = '';
let previousOperand = '';

// Function to append number
const appendNumber = (num) => {
    if(num === "." && result.includes(".")){
        return;
    }
    result += num;
    updateDisplay();
}

// function to update display
const updateDisplay = () => {
    if(operation){
        resultElement.textContent = `${previousOperand} ${operation} ${result}`;
    }
    else resultElement.textContent = result;
    
}

// function to select operator
const selectOperator = (operatorValue) => {
    if(result === '') return;
    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

// function to calculate result
const calculateResult = ()=>{
    let evaluatedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;
    switch(operation){
        case '+':
        evaluatedResult = prev + current;
        break;
        case '-':
        evaluatedResult = prev - current;
        break;
        case '*':
        evaluatedResult = prev * current;
        break;
        case '/':
        if (current === 0) {
            result = 'Error';
            operation = '';
            previousOperand = '';
        return;
    }
    evaluatedResult = prev / current;
    break;


        default:
            return;
    }

    result = evaluatedResult.toString();
    operation = '';
    previousOperand = '';

}

// Add event listener to number buttons
numbersBtn.forEach(button =>{
    button.addEventListener("click",()=>{
        appendNumber(button.textContent);
    });
});

//function to clear display 
const clearDisplay =() => {
    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay();
}

//function to delete last digit
const deleteLastDigit = () => {
    if (result !== '') {
        result = result.slice(0, -1);
    } else if (operation !== '') {
        operation = '';
    } else {
        previousOperand = previousOperand.slice(0, -1);
    }
    updateDisplay();
};


decimalBtn.addEventListener("click",()=>{
    appendNumber(".");
});
addBtn.addEventListener("click",()=>selectOperator("+"));
subtractBtn.addEventListener("click",()=>selectOperator("-"));
multiplyBtn.addEventListener("click",()=>selectOperator("*"));
divideBtn.addEventListener("click",()=>selectOperator("/"));
equalBtn.addEventListener("click",()=>{
    if(result === '') return;
    calculateResult();
    updateDisplay();
});
clearBtn.addEventListener("click",clearDisplay);
deleteBtn.addEventListener("click",deleteLastDigit);