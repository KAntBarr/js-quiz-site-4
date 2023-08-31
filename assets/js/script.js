const mainScreen = document.querySelector(".main");
const quizScreen = document.querySelector(".quiz");
const finishedScreen = document.querySelector(".finished");
const startButton = document.querySelector("#start-button");
const list = document.querySelector("#answers");
const timer = document.querySelector("#time");
let timerInterval;
const scoreEl = document.querySelector("#score");
const submitEl = document.querySelector("#submit");

const questions =  ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"];
let questionNum = 0;
let score = 0;
const answers = [
["Answer 1a", "Answer 2a", "Answer 3a", "Answer 4a"],
["Answer 1b", "Answer 2b", "Answer 3b", "Answer 4b"],
["Answer 1c", "Answer 2c", "Answer 3c", "Answer 4c"],
["Answer 1d", "Answer 2d", "Answer 3d", "Answer 4d"],
["Answer 1e", "Answer 2e", "Answer 3e", "Answer 4e"]
]

function loadFinished() {
    quizScreen.style.display = 'none';
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

    questionNum++;
}

function startCountDown() {

    timerInterval = setInterval(function() {
        timer.textContent = timer.textContent - 1;
    
        if(timer.textContent == 0) {
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

list.addEventListener("click", function(event) {
    element = event.target;
    
    if(element.value) {}

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