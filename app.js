const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Mercury"],
    correct: "Mars",
  },
  {
    question: "How many sides does a hexagon have?",
    answers: ["Five", "Six", "Seven", "Eight"],
    correct: "Six",
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: "Pacific Ocean",
  },
  {
    question: "Which animal is the tallest in the world?",
    answers: ["Elephant", "Giraffe", "Ostrich", "Camel"],
    correct: "Giraffe",
  },
  {
    question: "What is the chemical symbol for water?",
    answers: ["CO2", "O2", "H2O", "NaCl"],
    correct: "H2O",
  },
];

const quizElement = document.querySelector("#quiz");
const resultsElement = document.querySelector("#results");
const questionElement = document.querySelector("#question");
const answersElement = document.querySelector("#answers");
const questionCountElement = document.querySelector("#question-count");
const scoreElement = document.querySelector("#score");
const progressBar = document.querySelector("#progress-bar");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const finalScoreElement = document.querySelector("#final-score");
const restartButton = document.querySelector("#restart-button");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  selectedAnswer = null;
  questionElement.textContent = currentQuestion.question;
  questionCountElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  scoreElement.textContent = `Score: ${score}`;
  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent = "Check answer";
  answersElement.replaceChildren();

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(button, answer));
    answersElement.append(button);
  });
}

function selectAnswer(button, answer) {
  if (selectedAnswer !== null) {
    return;
  }

  selectedAnswer = answer;
  const correctAnswer = questions[currentQuestionIndex].correct;
  const isCorrect = answer === correctAnswer;

  if (isCorrect) {
    score += 1;
    feedbackElement.textContent = "Correct! Nice work.";
    feedbackElement.classList.add("success");
  } else {
    feedbackElement.textContent = `Not quite. The correct answer is ${correctAnswer}.`;
    feedbackElement.classList.add("error");
  }

  answersElement.querySelectorAll(".answer-button").forEach((answerButton) => {
    answerButton.disabled = true;
    if (answerButton.textContent === correctAnswer) {
      answerButton.classList.add("correct");
    }
  });

  if (!isCorrect) {
    button.classList.add("incorrect");
  }

  scoreElement.textContent = `Score: ${score}`;
  nextButton.disabled = false;
  nextButton.textContent = currentQuestionIndex === questions.length - 1
    ? "See results"
    : "Next question";
}

function showResults() {
  quizElement.hidden = true;
  resultsElement.hidden = false;
  progressBar.style.width = "100%";
  finalScoreElement.textContent = `You got ${score} out of ${questions.length} correct.`;
}

nextButton.addEventListener("click", () => {
  if (selectedAnswer === null) {
    return;
  }

  currentQuestionIndex += 1;
  if (currentQuestionIndex === questions.length) {
    showResults();
    return;
  }

  showQuestion();
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  resultsElement.hidden = true;
  quizElement.hidden = false;
  showQuestion();
});

showQuestion();
