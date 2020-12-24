//Gathering HTML elements for manipulation
let quizBody = document.getElementById("quiz");
let finalScoreEl = document.getElementById("finalScore");
let gameoverDiv = document.getElementById("gameover");
let questionsEl = document.getElementById("questions");
let quizTimer = document.getElementById("timer");
let startQuizButton = document.getElementById("startbtn");
let startQuizDiv = document.getElementById("startpage");
let highscoreContainer = document.getElementById("highscoreContainer");
let highscoreDiv = document.getElementById("high-scorePage");
let highscoreInputName = document.getElementById("initials");
let highscoreDisplayName = document.getElementById("highscore-initials");
let endGameBtns = document.getElementById("endGameBtns");
let submitScoreBtn = document.getElementById("submitScore");
let highscoreDisplayScore = document.getElementById("highscore-score");
let buttonA = document.getElementById("a");
let buttonB = document.getElementById("b");
let buttonC = document.getElementById("c");
let buttonD = document.getElementById("d");

//Creating the quiz question object
let quizQuestions = [{
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"
},
{
    question: "What language is primarily used to style to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"
},
{
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"
},
{
    question: "How many elements can you apply an 'ID' attribute to?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "128",
    correctAnswer: "c"
},
{
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"
},
{
    question: "When is localStorage data cleared?",
    choiceA: "Never",
    choiceB: "When the page reloads",
    choiceC: "When the browser closes",
    choiceD: "when the computer restarts",
    correctAnswer: "a"
},
{
    question: "Where is the correct place to insert JavaScript?",
    choiceA: "The &lt;body&gt section",
    choiceB: "The &lt;head&gt section",
    choiceC: "Both the &lt;head&gt section and the &lt;body&gt section are correct",
    choiceD: "The search bar",
    correctAnswer: "c"
},

{
    question: "How do you insert a comment in a CSS file?",
    choiceA: "// this is a comment //",
    choiceB: "/* this is a comment */",
    choiceC: "// this is a comment",
    choiceD: "' this is a comment",
    correctAnswer: "b"
},

{
    question: "How do you write Hello World in an alert box?",
    choiceA: "alert(Hello World);",
    choiceB: "alertBox(Hello World);",
    choiceC: "msg(Hello World);",
    choiceD: "show(Hello World)",
    correctAnswer: "a"

},

{
    question: "Choose the correct HTML element for the largest heading:",
    choiceA: "&lt;heading&gt",
    choiceB: " &lt;largest heading&gt",
    choiceC: " &lt;HEADING&gt",
    choiceD: " &lt;h1&gt",
    correctAnswer: "d"
},

];
//Declaring global variables
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 120;
let timerInterval;
let score = 0;
let correct;

//This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
}
//Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
//This function is the end page screen that displays your score after either completeing the quiz or when time runs out
function showScore() {
    quizBody.style.display = "none";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}
//When the submit button is clicked, it runs the function highscore that saves and stringifies the array of high scores already saved in local stoage
//as well as pushing the new user initials and score into the array that is being saved to the local storage. Then runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore() {

    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});
//Clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    let highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        let newNameSpan = document.createElement("li");
        let newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}
//Displays the high scores page while hiding all of the other pages 
function showHighscore() {
    startQuizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}
//Clears the scores from the local storage and clears the text from the scoreboard
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}
//Sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}
//Checks the response to each answer 
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}
//Starts the quiz when the Start Quiz button is clicked
startQuizButton.addEventListener("click", startQuiz);