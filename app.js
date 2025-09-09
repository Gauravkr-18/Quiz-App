let questions = [];
let remainingIndexes = [];
let currentIndex = null;
let score = 0;

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");

fetch("questions.json")
  .then((r) => r.json())
  .then((data) => {
    questions = data;
    startQuiz();
  })
  .catch((err) => {
    questionEl.textContent = "Failed to load questions.";
    console.error(err);
  });

function startQuiz() {
  score = 0;
  scoreEl.textContent = `Score: ${score}`;
  remainingIndexes = questions.map((_, i) => i);
  shuffleArray(remainingIndexes);
  progressEl.textContent = `0 / ${questions.length}`;
  nextBtn.disabled = true;
  feedbackEl.textContent = "";
  loadNextQuestion();
}

function loadNextQuestion() {
  if (remainingIndexes.length === 0) {
    showResults();
    return;
  }

  currentIndex = remainingIndexes.pop();
  const q = questions[currentIndex];

  questionEl.textContent = q.question;
  optionsContainer.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.disabled = false;
    btn.addEventListener("click", () => handleAnswer(btn, opt, q.answer));
    optionsContainer.appendChild(btn);
  });

  const shown = questions.length - remainingIndexes.length;
  progressEl.textContent = `${shown} / ${questions.length}`;
  nextBtn.disabled = true;
}

function handleAnswer(button, selected, correct) {
  // disable all options
  Array.from(optionsContainer.children).forEach((b) => (b.disabled = true));
  if (selected === correct) {
    feedbackEl.textContent = "🎉 Correct!";
    button.classList.add("correct");
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    feedbackEl.textContent = `❌ Wrong — answer: ${correct}`;
    button.classList.add("wrong");
    // highlight correct
    Array.from(optionsContainer.children).forEach((b) => {
      if (b.textContent === correct) b.classList.add("correct");
    });
  }
  nextBtn.disabled = false;
}

function showResults() {
  questionEl.textContent = `Quiz complete — final score ${score} / ${questions.length}`;
  optionsContainer.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
}

nextBtn.addEventListener("click", () => {
  feedbackEl.textContent = "";
  loadNextQuestion();
});

restartBtn.addEventListener("click", startQuiz);


function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// keyboard support: 1-4 to choose option
document.addEventListener("keydown", (e) => {
  if (!optionsContainer.children.length) return;
  const k = e.key;
  if (/^[1-4]$/.test(k)) {
    const idx = parseInt(k, 10) - 1;
    if (optionsContainer.children[idx] && !optionsContainer.children[idx].disabled) {
      optionsContainer.children[idx].click();
    }
  }
});
