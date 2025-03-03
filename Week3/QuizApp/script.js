const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Text Machine Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "color", "font-color", "background-color"],
    answer: "color"
  },
  {
    question: "What is the correct syntax for referring to an external JavaScript file?",
    options: [
      '<script src="script.js">',
      '<script href="script.js">',
      '<script name="script.js">',
      '<script file="script.js">'
    ],
    answer: '<script src="script.js">'
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<css>", "<style>", "<script>", "<link>"],
    answer: "<style>"
  },
  {
    question: "What is the output of `console.log(typeof 42)` in JavaScript?",
    options: ["number", "string", "boolean", "undefined"],
    answer: "number"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const scoreContainer = document.getElementById('score-container');

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = '';
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(option));
    optionsElement.appendChild(button);
  });
  timeLeft = 10;
  timerElement.textContent = `Time Left: ${timeLeft}`;
  clearInterval(timer);
  startTimer();
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = optionsElement.querySelectorAll('button');

  // Disable all buttons to prevent multiple clicks
  buttons.forEach(button => {
    button.disabled = true;
  });

  // Check if the selected answer is correct
  if (selectedOption === currentQuestion.answer) {
    score++;
    // Add 'correct' class to the selected button
    buttons.forEach(button => {
      if (button.textContent === selectedOption) {
        button.classList.add('correct');
      }
    });
  } else {
    // Add 'incorrect' class to the selected button
    buttons.forEach(button => {
      if (button.textContent === selectedOption) {
        button.classList.add('incorrect');
      }
    });
    // Highlight the correct answer
    buttons.forEach(button => {
      if (button.textContent === currentQuestion.answer) {
        button.classList.add('correct');
      }
    });
  }

  // Move to the next question after a short delay
  setTimeout(() => {
    nextQuestion();
  }, 1000); // 1-second delay before moving to the next question
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  clearInterval(timer); // Stop the timer
  questionElement.textContent = "Quiz Completed!";
  optionsElement.innerHTML = '';
  nextBtn.style.display = 'none';
  scoreContainer.textContent = `Your Score: ${score} out of ${questions.length}`;
  localStorage.setItem('quizScore', score);
}

nextBtn.addEventListener('click', nextQuestion);

// Load the first question
loadQuestion();


function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = optionsElement.querySelectorAll('button');

  // Disable all buttons to prevent multiple clicks
  buttons.forEach(button => {
    button.disabled = true;
  });

  // Check if the selected answer is correct
  if (selectedOption === currentQuestion.answer) {
    score++;
    // Add 'correct' class to the selected button
    buttons.forEach(button => {
      if (button.textContent === selectedOption) {
        button.classList.add('correct');
      }
    });
  } else {
    // Add 'incorrect' class to the selected button
    buttons.forEach(button => {
      if (button.textContent === selectedOption) {
        button.classList.add('incorrect');
      }
    });
    // Highlight the correct answer
    buttons.forEach(button => {
      if (button.textContent === currentQuestion.answer) {
        button.classList.add('correct');
      }
    });
  }

  // Move to the next question after a short delay
  setTimeout(() => {
    nextQuestion();
  }, 1000); // 1-second delay before moving to the next question
}