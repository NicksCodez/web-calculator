const results = document.querySelector('.result');
const calculator = document.querySelector('#calculator');

const plusSign = '\u002B';
const minusSign = '\u2212';
const multipilicationSign = '\u00D7';
const divisionSign = '\u2215';
const equalSign = '=';
const plusOrMinusSign = '\u00B1';
const dotSign = '.';
const moduloSign = '\u0025';


var operationComplete = /\d+[\u002B\u2212\u2215\u0025\u00D7\+\-\/\%\*]\d+/; 
                            // plus minus division modulo multiplication
var firstOperandComplete = /\d+[\u002B\u2212\u2215\u0025\u00D7\+\-\/\%\*]/;
var operation = /[\u002B\u2212\u2215\u0025\u00D7\+\-\/\%\*]/;

calculator.addEventListener('click', clickCalculator);
window.addEventListener('keydown', typeOnCalculator)


function typeOnCalculator(e){
    var operationStatus = checkInput(results.textContent);
        switch(e.key){
            case 'Shift':
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                console.log(e.key);
                switch(operationStatus){
                    case 0:
                        if(results.textContent === ''){
                            if(e.key === '-'){
                                results.appendChild(document.createTextNode(e.key));
                            }
                        } else results.appendChild(document.createTextNode(e.key));
                        break;
                    case 1:
                        results.removeChild(results.lastChild);
                        results.appendChild(document.createTextNode(e.key));
                        break;
                    case 2:
                        calculateInput(e);
                        results.appendChild(document.createTextNode(e.key));
                        break;
                }
                break;
            case 'C':
                clearResults();
                break;
            case '=':
            case 'Enter':
                if(operationStatus === 2) calculateInput(e);
                break;
            default:
                results.appendChild(document.createTextNode(e.key));
                break;
        }
}

function clickCalculator(e){
    e.preventDefault();
    if(e.target.tagName.toLowerCase() === "button"){
        var operationStatus = checkInput(results.textContent);
        switch(e.target.textContent){
            case plusSign:
            case minusSign:
            case multipilicationSign:
            case divisionSign:
            case moduloSign:
                switch(operationStatus){
                    case 0:
                        if(results.textContent === ''){
                            if(e.target.textContent === minusSign){
                                results.appendChild(document.createTextNode(e.target.textContent));
                            }
                        } else results.appendChild(document.createTextNode(e.target.textContent));
                        break;
                    case 1:
                        results.removeChild(results.lastChild);
                        results.appendChild(document.createTextNode(e.target.textContent));
                        break;
                    case 2:
                        calculateInput(e);
                        results.appendChild(document.createTextNode(e.target.textContent));
                        break;
                }
                break;
            case 'C':
                clearResults();
                break;
            case equalSign:
                if(operationStatus === 2) calculateInput(e);
                break;
            case plusOrMinusSign:
                if(operationStatus === 0){
                    if(results.textContent[0] === minusSign){
                        results.textContent = results.textContent.slice(1);
                    } else results.textContent = `${minusSign}${results.textContent}`;       
                }
                break;
            default:
                results.appendChild(document.createTextNode(e.target.textContent));
                break;
        }
    }
}

function calculateInput(e){
    var savedSign = 0;
    var operationString = '';
    if (results.textContent[0] === minusSign || results.textContent[0] === '-') {
        var savedSign = 1;
        operationString = results.textContent.slice(1); // keep string without - sign
    } else operationString = results.textContent;
    [a, b] = operationString.split(operation);
    var operationCode = operationString.substring(a.length, a.length + 1);
    if (savedSign) a = -a;
    var result = operate(operationCode, a, b);
    clearResults();
    results.appendChild(document.createTextNode(Math.round((result + Number.EPSILON) * 100000) / 100000));
}

function clearResults(){
    while(results.firstChild){
        results.removeChild(results.lastChild);
    }
}

function checkInput(input){
    if(operationComplete.test(input)) // change operand
        return 2;
    else if(firstOperandComplete.test(input)) // do operation
        return 1;
    else return 0; // keep adding
}

function add(a,b){
    return Number(a) + Number(b);
}

function subtract(a,b){
    return Number(a)-Number(b);
}

function multiply(a,b){
    return Number(a)*Number(b);
}

function divide(a,b){
    if(Number(b) === 0){
        return 'Not enough room to display infinite -_-';
    }
    return Number(a)/Number(b);
}

function modulo(a,b){
    if(Number(b)===0){
        return 'You\'ll have to figure that one on your own';
    }
    return Number(a)%Number(b);
}

function changeSign(a){
    return -a;
}

function operate(operation, a, b){
    switch(operation){
        case plusSign:
        case '+':
            return add(a,b);
            break;
        case minusSign:
        case '-':
            return subtract(a,b);
            break;
        case multipilicationSign:
        case '*':
            return multiply(a,b);
            break;
        case divisionSign:
        case '/':
            return divide(a,b);
            break;
        case moduloSign:
        case '%':
            return modulo(a,b);
            break;
        case plusOrMinusSign:
            return changeSign(a);
            break;
    }
    return 'That operation must be some advanced math, you\'re on your own';
}