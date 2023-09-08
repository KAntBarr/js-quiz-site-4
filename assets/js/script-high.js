// global variables to capture important elements
const scoresListEl = document.querySelector("#scores");
const clearEl = document.querySelector(".clear");

// load all the scores stored in local storage to the screen.
// if clear flag is true, remove all scores from local storage.
function loadScores(clearFlag) {
    // if scores list is empty or the clear flag is true,
    // set the score list element to empty
    if(localStorage.getItem("score-list") === null || clearFlag) {
        scoresListEl.innerHTML = ''; // set the score list element to empty
        localStorage.setItem("score-list", JSON.stringify([])); // set local storage to empty
        return;
    }
    // set score list to the list of scores from local storage
    const scoreList = JSON.parse(localStorage.getItem("score-list"));
    for(let i=0; i<scoreList.length; i++) { // loop through the score list 
        const listEl = document.createElement('li'); // create a new list element
        // set the text of the new list element to the corresponding
        // score in the score list
        listEl.textContent = scoreList[i];
        scoresListEl.append(listEl); // append new list element to score list element
    }
}

// clear all scores on click
clearEl.addEventListener("click", function() {
    loadScores(true); // call loadScores() with the clear flag set
})

loadScores();