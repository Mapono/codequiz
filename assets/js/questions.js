const questions = [
  {
    title: "What does 'HTML'stand for?",
    choices: [
      "HyperText Markup Language",
      "Holtzman-effect Map Logic",
      "HyperText Manual Language",
      "Hexidecimal Text Markup Log",
    ],
    answer: "HyperText Markup Language",
  },
  {
    title: "What does 'CSS' stand for?",
    choices: [
      "Colorized Styling Scripts",
      "Cascading Style Sheets",
      "Computational Styling Scripts",
      "Corrective Styling Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    title: "What git command is to push new code to a repository?",
    choices: ["git add .", "git commit", "git push", "git status"],
    answer: "quotes",
  },
  {
    title: "JavaScript arrays can store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title: "Declared objects in Java Script are encased in:",
    choices: ["{}", "``", "<>", "()"],
    answer: "{}",
  },
];

const startBtn = document.getElementById("start");
const timeEl = document.getElementById("time");
const questionEl = document.getElementById("questions");
const responseEl = document.getElementById("response");
const choiceEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const initEl = document.getElementById("initials");

let qDex = 0;
let time = questions.length * 20;
let timerId;

function start() {
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");
  questionEl.removeAttribute("class");
  timerId = setInterval(clockTick, 2000);
  timeEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  let currentQuestion = questions[qDex];
  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choiceEl.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    let choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    choiceEl.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[qDex].answer) {
    time -= 20;
    if (time < 0) {
      time = 0;
    }
    timeEl.textContent = time;
    responseEl.textContent = "Incorrect!";
  } else {
    responseEl.textContent = "Correct!";
  }
  responseEl.setAttribute("class", "response");
  setTimeout(function () {
    responseEl.setAttribute("class", "response hide");
  }, 1000);
  qDex++;
  if (qDex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initEl.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "scores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

startBtn.onclick = start;
submitBtn.onclick = saveHighscore;
initEl.onkeyup = checkForEnter;
