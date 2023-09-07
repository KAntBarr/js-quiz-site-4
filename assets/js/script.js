const mainScreen = document.querySelector(".main");
const quizScreen = document.querySelector(".quiz");
const finishedScreen = document.querySelector(".finished");
const centerFinishedEl = document.querySelector("#center-finished");
const startButton = document.querySelector("#start-button");
const options = document.querySelector("#answers");
const timer = document.querySelector("#time");
let timerInterval;
let resultInterval;
const scoreEl = document.querySelector("#score");
const submitEl = document.querySelector("#submit");
const popupEl = document.querySelector(".popup");
const resultEl = document.querySelector("#result");

const questions =  [
    "Javascript is an _______ language?",
    "Which of the following keywords is used to define a variable in Javascript?",
    "Which of the following methods is used to access HTML elements using Javascript?",
    "Upon encountering empty statements, what does the Javascript Interpreter do?",
    "Which of the following methods can be used to display data in some form using Javascript?"
];
let questionNum = 0;
let score = 0;
const answers = [
["Object-Based", "Procedural", "Object-Oriented", "None of the Above"],
["var", "Both var and let", "let", "None of the Above"],
["getElementById()", "getElementsByClassName()", "Both", "None of the Above"],
["Ignores the statements", "Throws an error", "Gives a warning", "None of the Above"],
["document.write()", "console.log()", "window.alert()", "All of the Above"]
]

const answerKey = {
    "Javascript is an _______ language?": "Object-Oriented",
    "Which of the following keywords is used to define a variable in Javascript?": "Both var and let",
    "Which of the following methods is used to access HTML elements using Javascript?": "Both",
    "Upon encountering empty statements, what does the Javascript Interpreter do?": "Ignores the statements",
    "Which of the following methods can be used to display data in some form using Javascript?": "All of the Above"
}

function loadFinished() {
    // clearInterval(resultInterval);
    quizScreen.style.display = 'none';
    // finishedScreen.appendChild(popupEl);
    centerFinishedEl.appendChild(popupEl);
    finishedScreen.style.display = "flex";
    clearInterval(timerInterval);

    const score = timer.textContent;
    scoreEl.textContent = score;

}

function loadQuestion() {
    if(questionNum===questions.length) {
        loadFinished();
        return;
    };
    const firstButton = document.querySelector("#first-button");
    const secondButton = document.querySelector("#second-button");
    const thirdButton = document.querySelector("#third-button");
    const fourthButton = document.querySelector("#fourth-button");
    const question = document.querySelector("#question");

    question.textContent = questions[questionNum];
    firstButton.textContent = answers[questionNum][0];
    secondButton.textContent = answers[questionNum][1];
    thirdButton.textContent = answers[questionNum][2];
    fourthButton.textContent = answers[questionNum][3];
    // console.log(firstButton.textContent, "test");

    questionNum++;
}

function startCountDown() {

    timerInterval = setInterval(function() {
        timer.textContent = timer.textContent - 1;
    
        if(timer.textContent <= 0) {
            // Stops execution of action at set interval
            loadFinished();
        }
    
    }, 1000);
    return 25;
}

startButton.addEventListener("click", function() {
    // console.log("test");
    mainScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
    timer.textContent = startCountDown();
    loadQuestion();
})

options.addEventListener("click", function(event) {
    clearInterval(resultInterval);
    element = event.target;
    console.log(element.textContent);
    let result;
    if(answerKey[questions[questionNum-1]]===element.textContent) {
        result = "Correct!";
    } else {
        result = "Wrong!";
        timer.textContent -= 5;
    }
    let clear = 0;
    popupEl.style.cssText = "  \
    display: flex;\
    flex-direction: column;\
    opacity: 0.4\
    ";
    resultEl.textContent = result;
    resultInterval = setInterval(function() {
        
        if(clear) {
            // Stops execution of action at set interval
            popupEl.style.display = 'none';
            clearInterval(resultInterval);
            console.log("clear");
        }
        clear ++;
    }, 900);

    loadQuestion();

})

submitEl.addEventListener("click", function(event) {
    event.preventDefault();
    let scoreList;
    if (localStorage.getItem("score-list") === null) {
        scoreList = [];
    } else {
        scoreList = JSON.parse(localStorage.getItem("score-list"));
    }
    const scoreString = `${document.querySelector("#input").value} - ${timer.textContent}`
    scoreList.push(scoreString);
    localStorage.setItem("score-list", JSON.stringify(scoreList));
    window.location.href = "./highscores.html";
})