// Array of questions and answers for the quiz
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"], 
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"], 
        correctAnswer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"], 
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"], 
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"], 
        correctAnswer: "console.log"
    }
]

// Global Variables
var startButton = document.querySelector("#start-button");
var timerEl = document.getElementById('time-remaining');
var quizContainer = document.getElementById('quiz');
var questionNum = 0;
var score = 0;
var scoreEl = document.getElementById('points');
var currentTime = 100;
var timeInterval;
var resetButton = document.querySelector(".reset-button");

// Shows the timer once the start button is clicked
startButton.addEventListener("click", startGame);

// Stores score and user to localStorage
var nameInput = document.querySelector("#name");
var submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    var user = nameInput.value.trim();
    localStorage.setItem("user", JSON.stringify(user));    
    showHighscore();
});

// The startGame function is called when the start button is clicked
function startGame() {
    document.querySelector("#main-quiz").setAttribute("class", "show");
    document.querySelector("#start-page").setAttribute("class", "hide");
    questionNum = 0;
    currentTime = 100;
    startTimer();
    showQuestions();
    score = 0;
    scoreEl.textContent = score;
}

// The showQuestions function will pull the questions and answers from the array above to display onto the screen
function showQuestions() {
    quizContainer.innerHTML = "";
    var questionText = questions[questionNum].question;
    var questionEl = document.createElement("p");
    questionEl.textContent = questionText;
    quizContainer.appendChild(questionEl);
    for(var i = 0; i < questions[questionNum].answers.length; i++) {
        var answerChoice = questions[questionNum].answers[i];
        var answerEl = document.createElement("button");
        answerEl.textContent = answerChoice;
        quizContainer.appendChild(answerEl);
        answerEl.addEventListener("click", checkAnswer);
    }
}

// The function checkAnswers will check the answers and deduct points/score if wrong
function checkAnswer (event) {
    console.log(event.target.textContent);
    var correctAnswer = questions[questionNum].correctAnswer;
    var selectedAnswer = event.target.textContent;
    if (correctAnswer === selectedAnswer) {
        score=score+20; 
        scoreEl.textContent = score;
        alert("correct! +20 points!");
    } else {
        currentTime=currentTime-10;
        timerEl.textContent = currentTime;
        alert("incorrect! -10 seconds!");
    };
    questionNum++;
    if (questionNum >= 5 || currentTime === 0) {
        clearInterval(timeInterval);
        localStorage.setItem("score", JSON.stringify(score));
        document.querySelector("#main-quiz").setAttribute("class", "hide");
        document.querySelector("#result-page").setAttribute("class", "show");
    } else {
        showQuestions(); 
    };
}

function showHighscore() {
    document.querySelector("#result-page").setAttribute("class", "hide");
    document.querySelector("#highscore").setAttribute("class", "show");
    //TODO display initials + scores <li>
    const user = JSON.parse(localStorage.getItem("user"));
    const score = JSON.parse(localStorage.getItem("score"));
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    var newScore = {
        user : user,
        score : score
    }
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    var scoreDisplay = document.querySelector("#highscore-display");
    var scoreArray = {highscores};
    for(var i = 0; i < 4; i++) {    
        var highscoreEl = document.createElement("p");
        highscoreEl.textContent = `${highscores[i].user} ${highscores[i].score}`;
        console.log({highscores});
        scoreDisplay.appendChild(highscoreEl);
    };
    resetGame();
}

// The function startTimer will begin the timer
function startTimer() {
    timeInterval = setInterval(function () {
        if (currentTime >1) {
            timerEl.textContent = currentTime;
            currentTime--; 
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            displayResults();
        }
    }, 1000);
}

// Function to reset game
function resetGame() {
    var resetGameButton = document.querySelector("#reset-game-button")
    resetGameButton.addEventListener("click", function(event){
        document.querySelector("#highscore").setAttribute("class", "hide");
        document.querySelector("#start-page").setAttribute("class", "show"); 
    })
}