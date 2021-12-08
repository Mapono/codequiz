function printScores() {
  let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    let liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    let olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearScores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearScores;

printScores();
