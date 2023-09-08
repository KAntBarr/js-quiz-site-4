// create global variables to capture important elements
const mainScreen = document.querySelector(".main");
const quizScreen = document.querySelector(".quiz");
const finishedScreen = document.querySelector(".finished");
const centerFinishedEl = document.querySelector("#center-finished");
const startButton = document.querySelector("#start-button");
const options = document.querySelector("#answers");
const timer = document.querySelector("#time");
const scoreEl = document.querySelector("#score");
const submitEl = document.querySelector("#submit");
const popupEl = document.querySelector(".popup");
const resultEl = document.querySelector("#result");

// set the interval variables to be global
// so it can be accessed by all functions
let timerInterval;
let resultInterval;

let questionNum = 0; // a global variable that keeps track of the current question

// create a global array of quiz questions
const questions =  [
    "Javascript is an _______ language?",
    "Which of the following keywords is used to define a variable in Javascript?",
    "Which of the following methods is used to access HTML elements using Javascript?",
    "Upon encountering empty statements, what does the Javascript Interpreter do?",
    "Which of the following methods can be used to display data in some form using Javascript?"
];

// global 2d array for quiz answers per question
const answers = [
["Object-Based", "Procedural", "Object-Oriented", "None of the Above"],
["var", "Both var and let", "let", "None of the Above"],
["getElementById()", "getElementsByClassName()", "Both", "None of the Above"],
["Ignores the statements", "Throws an error", "Gives a warning", "None of the Above"],
["document.write()", "console.log()", "window.alert()", "All of the Above"]
]

// global object of the correct answers for each question
const answerKey = {
    "Javascript is an _______ language?": "Object-Oriented",
    "Which of the following keywords is used to define a variable in Javascript?": "Both var and let",
    "Which of the following methods is used to access HTML elements using Javascript?": "Both",
    "Upon encountering empty statements, what does the Javascript Interpreter do?": "Ignores the statements",
    "Which of the following methods can be used to display data in some form using Javascript?": "All of the Above"
}

// load the finish screen
function loadFinished() {
    quizScreen.style.display = 'none'; // hide the quiz screen
    centerFinishedEl.appendChild(popupEl); // show the result as quiz screen is hidden
    finishedScreen.style.display = "flex"; // show the finished screen
    clearInterval(timerInterval); // stop the timer count down
    scoreEl.textContent = timer.textContent; // set the timer to the score element text
}

// loads the next question
function loadQuestion() {
    // if this is the last question, load the finish screen
    if(questionNum===questions.length) {
        loadFinished();
        return;
    };

    // variables to hold the question and button elements
    const firstButton = document.querySelector("#first-button");
    const secondButton = document.querySelector("#second-button");
    const thirdButton = document.querySelector("#third-button");
    const fourthButton = document.querySelector("#fourth-button");
    const question = document.querySelector("#question");

    // set the question and buttons text to the corresponding question and answers
    question.textContent = questions[questionNum];
    firstButton.textContent = answers[questionNum][0];
    secondButton.textContent = answers[questionNum][1];
    thirdButton.textContent = answers[questionNum][2];
    fourthButton.textContent = answers[questionNum][3];

    // increase question number count
    questionNum++;
}

// start the timer interval timer and the count down
function startCountDown() {
    timerInterval = setInterval(function() {
        timer.textContent = timer.textContent - 1; // decrement the timer
        if(timer.textContent <= 0) { // if timer reaches 0, load the finished screen
            loadFinished();
        }
    }, 1000); // set the timer interval to one second

    return 25; // return the timer duration
}

// on click, start the quiz
startButton.addEventListener("click", function() {
    mainScreen.style.display = 'none'; // hide the main screen
    quizScreen.style.display = 'flex'; // show the quiz screen
    timer.textContent = startCountDown(); // get the timer duration and start the count down
    loadQuestion(); // load the first question
})

// when clicking on an answer option, display 
// the result and load the next question
options.addEventListener("click", function(event) {
    clearInterval(resultInterval); // clear the result popup of the previous click
    element = event.target; // get the element the user clicked on
    let result; // variable that will hold the result value
    if(answerKey[questions[questionNum-1]]===element.textContent) {
        result = "Correct!";
    } else {
        result = "Wrong!";
        timer.textContent -= 5; // decrement the timer by 5, if wrong answer
    }
    let clear = 0; // variable to help clear the result popup
    // set the css attributes of the result popup element 
    // to show on screen
    popupEl.style.cssText = "\
    display: flex;\
    flex-direction: column;\
    opacity: 0.4\
    ";
    resultEl.textContent = result; // show the result on screen
    resultInterval = setInterval(function() {
        if(clear) { // if clear flag is truthy, hide the result popup element
            popupEl.style.display = 'none'; // hide the result popup elemnt
            clearInterval(resultInterval); // clear the interval
        }
        clear ++; // after one interval, set the clear flag to 1(truthy)
    }, 900); // set the interval to 900 milliseconds

    loadQuestion(); // load the next question
})

// submit the user's initials and score to local storage
submitEl.addEventListener("click", function(event) {
    event.preventDefault(); // prevent the page from refreshing after clicking
    let scoreList; // variable to store the scores from local storage
    if (localStorage.getItem("score-list") === null) {
        scoreList = []; // if local storage is empty, set the score list to empty
    } else {
        // parse the scores from local storage to storage list
        scoreList = JSON.parse(localStorage.getItem("score-list"));
    }
    // create a string to join the user's initials and the score
    const scoreString = `${document.querySelector("#input").value} - ${timer.textContent}`;
    // push that string to the scores list
    scoreList.push(scoreString);
    // set the score list to local storage
    localStorage.setItem("score-list", JSON.stringify(scoreList));
    window.location.href = "./highscores.html"; // load the high scores page
})