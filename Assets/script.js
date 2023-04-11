const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: {
            1: "strings",
            2: "booleans",
            3: "alerts",
            4: "numbers",
        }, 
        correctAnswer: "3"
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        answers: {
            1: "quotes",
            2: "curly brackets",
            3: "parentheses",
            4: "square brackets",
        }, 
        correctAnswer: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: {
            1: "numbers and strings",
            2: "other arrays",
            3: "booleans",
            4: "all of the above",
        }, 
        correctAnswer: "4"
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answers: {
            1: "commas",
            2: "curly brackets",
            3: "quotes",
            4: "parentheses",
        }, 
        correctAnswer: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            1: "JavaScript",
            2: "terminal/bash",
            3: "for loops",
            4: "console.log",
        }, 
        correctAnswer: "4"
    },
]

var startButton = document.querySelector("#start-button");
var timerEl = document.getElementById('countdown');

//Shows the timer once the start button is clicked
startButton.addEventListener("click", function() {
    document.querySelector("#main-quiz").setAttribute("class", "show");
    document.querySelector("#start-page").setAttribute("class", "hide");
    }
);

// The startGame function is called when the start button is clicked
function startGame() {
    document.getElementById("#start-button").click();
    startTimer()
}

function startTimer() {
    var timeLeft = 100;
    var timeInterval = setInterval(function () {
        if (timeLeft >1) {
            timeInterval.textContent = timeLeft + ' seconds remaining';
            timeLeft--; 
        } else {
            timeInterval.textContent = '';
            clearInterval(timeInterval);
            displayMessage();
        }
    }, 100);
}
