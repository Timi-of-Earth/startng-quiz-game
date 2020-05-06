const startBtn = document.getElementById("start-btn"),
  nextBtn = document.getElementById("next-btn"),
  // restartBtn = document.getElementById("restart-btn"),
  startPage = document.getElementById("start-page"),
  endPage = document.getElementById("end-page"),
  questionContainer = document.getElementById("question-container"),
  optionContainer = document.getElementById("option-container"),
  navBar = document.getElementById("nav-bar"),
  scoreContainer = document.getElementById("score-container"),
  scoreValue = document.getElementById("score");

// array of questions
let data = [
  {
    question: "Who invented the World Wide Web?",
    options: [
      "Vint Cerf",
      "Robert E. Kahn",
      "Tim Berners-Lee",
      "Charles Babbage",
    ],
    answer: "Tim Berners-Lee",
  },
  {
    question: "What is the diameter of the Earth?",
    options: ["12.7km", "6.4km", "10.3km", "6.9km"],
    answer: "12.7km",
  },
  {
    question: "What metal exists as a liquid at room temperature?",
    options: ["Indaboskiiii", "Mercury", "Bromine", "Neodymium"],
    answer: "Mercury",
  },
  {
    question: "How many tribes are there in Nigeria?",
    options: ["193", "750", "371", "450"],
    answer: "371",
  },
  {
    question: "Who discovered penicillin?",
    options: [
      "Howard Florey",
      "Hippocrates",
      "Alexander Fleming",
      "Rudolf Virchow",
    ],
    answer: "Alexander Fleming",
  },
  {
    question: "What is Meteorology the study of?",
    options: ["weather", "horoscopes", "space", "meteors"],
    answer: "weather",
  },
  {
    question: "What's the Capital of Spain?",
    options: ["Barcelona", "Grenada", "Seville", "Madrid"],
    answer: "Madrid",
  },
  {
    question: "Colombo is the largest city of which Asian country?",
    options: ["India", "Sri Lanka", "Malaysia", "Thailand"],
    answer: "Sri Lanka",
  },
  {
    question:
      "Bikini Bottom is the setting for which popular children’s cartoon?",
    options: [
      "Tom and Jerry",
      "The Jetsons",
      "The Flintstones",
      "SpongeBob SquarePants",
    ],
    answer: "SpongeBob SquarePants",
  },
  {
    question: "Who is Sinzu Money?",
    options: ["Spending!!!", "The President", "Ogun's biggest customer", "a Fraud in a turtleneck"],
    answer: "Spending!!!",
  },
  {
    question: "What is a cosmonaut?",
    options: [
      "a Canadian athlete",
      "a Russian sailor",
      "a Russian space explorer",
      "a Chinese sailor",
    ],
    answer: "a Russian space explorer",
  },
  {
    question: "What was Buzz Aldrin's mother's maiden name?",
    options: ["Moon", "June", "Jupiter", "Mark"],
    answer: "Moon",
  },
  /*{
    question: "?",
    options: ["", "", "", ""],
    answer: "",
  },
  {
    question: "?",
    options: ["", "", "", ""],
    answer: "",
  }, */
  /* {
    question: "?",
    options: ["", "", "", ""],
    answer: "",
  }, */
];

let counter = 0;
let currentScore = 0;

// start game function
function startGame() {
  //shuffle data array
  data = data.sort(() => Math.random() - 0.5);
  optionContainer.classList.remove("clicked");
  nextBtn.classList.remove("hide");
  !endPage.classList.contains("hide") ? endPage.classList.add("hide") : false;
  startPage.classList.add("hide");
  questionContainer.classList.remove("hide");
  optionContainer.classList.remove("hide");
  scoreContainer.classList.remove("hide");
  navBar.classList.remove("hide");
  currentScore = 0;
  scoreValue.innerText = currentScore;
  showQuestion();
}

// update score
function updateScore() {
  scoreValue.innerText = ++currentScore;
}

// show question to tiles
function showQuestion() {
  let currentQuestion = document.createElement("p");
  currentQuestion.innerText = data[counter].question;
  questionContainer.appendChild(currentQuestion);
  for (let option of data[counter].options.sort(() => Math.random() - 0.5)) {
    let btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = selectAnswer;
    btn.classList.add("btn", "option");
    optionContainer.appendChild(btn);
  }
}

// select answer
function selectAnswer(e) {
  let selectedAnswer = e.target;
  optionContainer.classList.add("clicked");
  // check the selected answer
  if (selectedAnswer.innerText === data[counter].answer) {
    // when selected answer is correct
    selectedAnswer.classList.add("correct");
    updateScore();
  } else {
    //when wrong
    selectedAnswer.classList.add("wrong");
  }
  /* 
  selectedAnswer.innerText === data[counter].answer
    ? selectedAnswer.classList.add("correct")
    : selectedAnswer.classList.add("wrong"); */
  // console.log(selectedAnswer.classList);
  // nextBtn.classList.remove("hide");
  showCorrect();
}

// show correct answer and next btn
function showCorrect() {
  let options = Array.from(document.getElementsByClassName("option"));
  // console.log(options);
  options
    .filter((option) => option.innerText === data[counter].answer)
    .map((correct) => correct.classList.add("correct"));
}

// show the next question
function nextQuestion() {
  if (counter >= 4) {
    return endGame();
  }
  questionContainer.innerHTML = ``;
  optionContainer.innerHTML = ``;
  counter++;
  showQuestion();
  // nextBtn.classList.add("hide");
  optionContainer.classList.remove("clicked");
}

// end game
function endGame() {
  counter = 0;
  questionContainer.innerHTML = ``;
  optionContainer.innerHTML = ``;
  nextBtn.classList.add("hide");
  scoreContainer.classList.add("hide");
  endPage.classList.remove("hide");
  endPage.innerHTML = `
  <h1>Game Over!</h1>
  <p>You scored ${currentScore}/5.</p>
  <div class='end-page-buttons'>
  <button id="restart-btn" class="start-btn btn" onclick='startGame()'>Restart Game</button>
  <button id="end-btn" class="restart-btn btn" onclick='location.reload()'>End Game</button>
  </div>
  `;
}

// event listeners
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
// restartBtn.addEventListener("click", startGame);
