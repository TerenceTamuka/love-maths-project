//Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

/**
 * The main game "loop" called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    //locating the answer box with empty string for the value to be filled thereafter
    document.getElementById("answer-box").value = "";

    //Setting the cursor to be in the answer box when page loads
    document.getElementById("answer-box").focus();



    // Creates two random numbers between 1 and 25
    let num1 = Math. floor(Math.random() * 25) + 1;
    let num2 = Math. floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply"){
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;

    }

}

/**
 * Checks the answer against the first element in 
 * the returned calculateCorrectAnswer array function.
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let caculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === caculatedAnswer[0];

    if (isCorrect) {
        alert("Awesome!.. you nailed it! :D");
        incrementScore();
    } else {
        alert(`Oh no!! you answered ${userAnswer}, but the correct answer is ${caculatedAnswer[0]}. Better luck next time !`);
        incrementWrongAnswer();
    }

    runGame(caculatedAnswer[1]);

}

/**
 * Gets the operants (the numbers) and the operator (plus, minus etc)
 * directly from the DOM elements and returns the correct answer.
 */
function calculateCorrectAnswer() {

    // Get the operands and the operator from the DOM elements
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unknown operator: ${operator}`);
        throw `Unknown operator: ${operator}. Aborting!`;
    }




}

/**
 * Gets the score from the DOM and increments it by 1
 */
function incrementScore(){
    
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

/**
 * Gets the current tally of incorrected answers from the DOM and increments it by 1
 */
function incrementWrongAnswer(){

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {

    // Ternary operator for choosing the larger number
    document.getElementById("operand1").textContent = operand1 > operand2? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";



}


// function displayDivisionQuestion() {

// }