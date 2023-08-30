const mainScreen = document.querySelector(".main");
const quizScreen = document.querySelector(".quiz");
const finishedScreen = document.querySelector(".finished");
const startButton = document.querySelector("#start-button");
const list = document.querySelector("#answers");
const timer = document.querySelector("#time");

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

startButton.addEventListener("click", function() {
    // console.log("test");
    mainScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
    timer.textContent = 3;
})

list.addEventListener("click", function(event) {

})