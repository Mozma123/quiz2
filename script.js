const questions = [
    {
         question: "which is the largest river of pakistan?",
          answers: [
            { text: "Indus River", correct: true },
             { text: "Panjnad River", correct: false },
              { text: "Chenab River", correct: false }, 
              { text: "Ravi River", correct: false }
            ]
         },
    {
         question: "Which is the largest planet in our solar system? ",
          answers:
           [
            { text: " Earth", correct: false }, 
            { text: "Mars", correct: false },
             { text: "Jupiter", correct: true },
              { text: " Saturn", correct: false }
            ] 
        },
    { question: "In which year the v1 of html is realse?",
     answers:
      [
        { text: "1913", correct: false },
         { text: "1991", correct: true }, 
         { text: "1987", correct: false }, 
         { text: "1934", correct: false }
        ] 
    },
    { 
        question: "which is the biggest ocean in the world?",
     answers: [{ text: " Atlantic Ocean", correct: false },
      { text: "Arctic Ocean", correct: false }, 
      { text: "Mediterranean Sea", correct: false },
       { text: "The Pacific Ocean", correct: true }
    ]
 },
    { question: "How many satellites are in 2024?'?",
     answers:
      [
        { text: "8,000", correct: false }, 
        { text: "9,900", correct: true }, 
        { text: "7,560", correct: false }, 
        { text: "6,099", correct: false }
    ] 
},
    { question: "What is the boiling point of water?",
     answers: [{ text: "90°C", correct: false }, 
     { text: "100°C", correct: true },
      { text: "110°C", correct: false },
       { text: "120°C", correct: false }
    ] 
},
    { 
        question: "what is the world  dangerous animal",
     answers:
      [
        { text: "saltwater crocodile", correct: true }, 
        { text: "frog", correct: false },
         { text: "lion", correct: false },
          { text: "Snakes", correct: false }
        ] 
    },
    {
         question: "What is the chemical symbol for gold?",
     answers: 
     [
        { text: "Au", correct: true },
         { text: "Ag", correct: false }, 
         { text: "Pb", correct: false },
          { text: "Pt", correct: false }
        ] },
    { question: "Who painted the Mona Lisa?",
     answers: [
        { text: "Vincent van Gogh", correct: false },
         { text: "Pablo Picasso", correct: false },
          { text: "Leonardo da Vinci", correct: true }, 
          { text: "Claude Monet", correct: false }
        ] 
    },
    { question: "who design the world map?",
     answers: [{ text: "greek", correct: false }, 
     { text: "Nile", correct: false },
      { text: "Anaximander", correct: true },
       { text: "alex", correct: false }] }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.removeEventListener("click", startQuiz); // Remove any existing event listener
    nextButton.addEventListener("click", handleNextButtonClick);
    showQuestion();
}

function handleNextButtonClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    nextButton.style.display = "none";
    clearTimeout(timer);
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    let timeLeft = 5;
    timerElement.innerHTML = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }
    }, 1000); // Update every second
}

function selectAnswer(button, correct) {
    if (correct) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (btn !== button && questions[currentQuestionIndex].answers.find(a => a.text === btn.innerHTML).correct) {
            btn.classList.add("correct");
        }
    });
    clearInterval(timer);
    nextButton.style.display = "block";
}

function showResult() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", handleNextButtonClick); // Remove the previous event listener
    nextButton.addEventListener("click", startQuiz); // Add a new one for restart
}

startQuiz();






// extra
     // Disable right-click context menu
     document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // Disable certain keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+U, Ctrl+S, Ctrl+Shift+I, Ctrl+Shift+J
        if (e.ctrlKey && (e.key === 'u' || e.key === 's' || (e.shiftKey && (e.key === 'I' || e.key === 'J')))) {
            e.preventDefault();
        }
    });