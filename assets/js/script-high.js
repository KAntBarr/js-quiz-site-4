const scoresList = document.querySelector("#scores");
const clearEl = document.querySelector(".clear");

function loadScores(clearFlag) {
    if(localStorage.getItem("score-list") === null || clearFlag) {
        scoresList.innerHTML = '';
        localStorage.setItem("score-list", JSON.stringify([]));
        return;
    }
    const list = JSON.parse(localStorage.getItem("score-list"));
    for(let i=0; i<list.length; i++) {
        const listEl = document.createElement('li');
        listEl.textContent = list[i];
        scoresList.append(listEl);
    }
}

clearEl.addEventListener("click", function() {
    loadScores(true);
})

loadScores();