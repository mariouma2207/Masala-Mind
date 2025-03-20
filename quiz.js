document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("leaderboard-modal");
    const leaderboardBtn = document.getElementById("leaderboard-btn");
    const closeBtn = document.querySelector(".close-btn");
    const leaderboardList = document.getElementById("leaderboard-list");
    const nextBtn = document.getElementById("next-btn");
    const questionElement = document.getElementById("question");
    const answersContainer = document.querySelector(".answers-container");
    const scoreElement = document.getElementById("score");

    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            question: "Who is the actor in the movie 'Devdas'?",
            options: ["Shah Rukh Khan", "Salman Khan", "Amitabh Bachchan", "Ranbir Kapoor"],
            answer: "Shah Rukh Khan"
        },
        {
            question: "In which movie did Alia Bhatt play the role of Gangubai?",
            options: ["Gangubai Kathiawadi", "Raazi", "Highway", "Student of the Year"],
            answer: "Gangubai Kathiawadi"
        },
        {
            question: "Which movie features the song 'Channa Mereya'?",
            options: ["Ae Dil Hai Mushkil", "Kabhi Khushi Kabhie Gham", "Dilwale", "Yeh Jawaani Hai Deewani"],
            answer: "Ae Dil Hai Mushkil"
        },
        {
            question: "Who directed the film 'Lagaan'?",
            options: ["Aamir Khan", "Rajkumar Hirani", "Ashutosh Gowariker", "Karan Johar"],
            answer: "Ashutosh Gowariker"
        },
        {
            question: "Which Bollywood actress played the role of Paro in 'Devdas'?",
            options: ["Aishwarya Rai", "Katrina Kaif", "Deepika Padukone", "Priyanka Chopra"],
            answer: "Aishwarya Rai"
        },
        {
            question: "What is the name of the movie where Shah Rukh Khan plays a character named Rahul?",
            options: ["Dilwale Dulhania Le Jayenge", "Kabhi Khushi Kabhie Gham", "Dil Se", "Baazigar"],
            answer: "Kabhi Khushi Kabhie Gham"
        },
        {
            question: "Which movie Aishwarya Rai acted as Paro in?",
            options: ["Devdas", "Mohobbatein", "Jodha Akbar"],
            answer: "Devdas"
        },
    ];

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answersContainer.innerHTML = "";
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.classList.add("option-btn");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(option));
            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedAnswer) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (selectedAnswer === correctAnswer) {
            score += 10; // Award points for correct answer
        }
        scoreElement.textContent = `Score: ${score}`;
        nextBtn.style.display = "inline-block";  // Show the "Next" button after answering

        // Disable option buttons to prevent multiple clicks
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => btn.disabled = true);
    }

    // Next button functionality
    nextBtn.addEventListener("click", function() {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion(); // Load the next question
            nextBtn.style.display = "none";  // Hide "Next" button until the answer is clicked again
        } else {
            alert("Quiz over!");
            updateLeaderboard();
        }
    });

    function updateLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push(score);
        leaderboard.sort((a, b) => b - a); // Sort leaderboard in descending order
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }

    leaderboardBtn.addEventListener("click", function() {
        showLeaderboard();
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    function showLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboardList.innerHTML = "";
        leaderboard.forEach(score => {
            let li = document.createElement("li");
            li.textContent = `Score: ${score}`;
            leaderboardList.appendChild(li);
        });
    }

    // Initialize quiz
    loadQuestion();
});

const startQuizBtn = document.getElementById("start-quiz-btn");
const nameContainer = document.getElementById("name-container");

startQuizBtn.addEventListener("click", function() {
    const playerName = document.getElementById("player-name").value;
    if (playerName) {
        nameContainer.style.display = "none";
        loadQuestion();  // Start the quiz after the name is entered
    } else {
        alert("Please enter your name!");
    }
});
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

shuffleQuestions();  // Call this function before loading the questions
const correctSound = new Audio('correct-answer.mp3');
const incorrectSound = new Audio('incorrect-answer.mp3');

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score += 10;  // Award points for correct answer
        correctSound.play();
    } else {
        incorrectSound.play();
    }
    scoreElement.textContent = `Score: ${score}`;
    nextBtn.style.display = "inline-block";
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => btn.disabled = true);
}
const difficultySelect = document.createElement('select');
difficultySelect.innerHTML = `
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
`;

const startDifficulty = document.createElement('button');
startDifficulty.textContent = "Start Quiz";

document.body.appendChild(difficultySelect);
document.body.appendChild(startDifficulty);

startDifficulty.addEventListener("click", function() {
    const difficulty = difficultySelect.value;
    filterQuestionsByDifficulty(difficulty); // Filter questions based on difficulty
});

function filterQuestionsByDifficulty(difficulty) {
    // Filter questions here based on the chosen difficulty
}
function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById("quiz-progress").value = progress;
}

nextBtn.addEventListener("click", function() {
    currentQuestionIndex++;
    updateProgress();
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        alert("Quiz over!");
        updateLeaderboard();
    }
});
document.getElementById("retry-btn").addEventListener("click", function() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    loadQuestion();
    nextBtn.style.display = "none";
});
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        answersContainer.appendChild(button);
    });
    startTimer(); // Start the timer each time a question loads
}
function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById("quiz-progress").value = progress;
}

nextBtn.addEventListener("click", function() {
    currentQuestionIndex++;
    updateProgress(); // Update the progress bar
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Quiz over!");
        updateLeaderboard();
    }
});
document.getElementById("retry-btn").addEventListener("click", function() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    loadQuestion(); // Load the first question
    nextBtn.style.display = "none"; // Hide "Next" button until an answer is chosen
    updateProgress(); // Reset progress bar
});


