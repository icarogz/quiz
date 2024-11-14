let questionArray = [
    {
      "question": "Quanto é 20 ÷ 4?",
      "answers": ["5",  "4", "8"],
      "correctAnswer": 0
    },
    {
      "question": "Se você tem 36 balas e divide igualmente entre 9 amigos, quantas balas cada um recebe?",
      "answers": ["5", "3", "6"],
      "correctAnswer": 2
    },
    {
      "question": "Qual é o resultado de 81 ÷ 9?",
      "answers": ["6",  "7", "9"],
      "correctAnswer": 2
    },
    {
      "question": "Se você tem 72 reais e divide por 8 pessoas, quanto cada uma recebe?",
      "answers": ["10", "9", "8"],
      "correctAnswer": 1
    },
    {
      "question": "Quanto é 144 ÷ 12?",
      "answers": ["12", "10", "14", "16"],
      "correctAnswer": 0
    }
  ]
  


const startBtn = document.getElementById('start');
const submitScoreBtn = document.getElementById("submit-score");
const highScoresBtn = document.getElementById('high-scores-btn');
const quizLayout = document.getElementById('quiz');
const timer = document.getElementById('timer');
const nameInputForm = document.getElementById("name-input-form");
const quizTitle = document.getElementById("quiz-title");
const TOTALTIMEGIVEN = 100;    
const PENALTYTIME = 20;         
const SCORELISTLENGTH = 10;    
const MAXNAMELENGTH = 50;      
const INITIALSONLY = true;       
let highestScores = [];        
let highScoresObj = {};        
let timeOver = true;            
let newTime = TOTALTIMEGIVEN;   
let questionNumber = 0;        
let answerDisplayTime;          
let highScore;                 


function initialQuiz() {
    console.log("Page reloaded.");
    quizLayout.innerHTML = "Responda todas as perguntas dentro do limite de tempo! Respostas incorretas subtrairão " + PENALTYTIME + " segundos do tempo."
;
    startBtn.style.display = "visible";

    let storedHighScoresArray = JSON.parse(localStorage.getItem("highestScoresArray"));
    if (storedHighScoresArray !== null) {
        highestScores = storedHighScoresArray;
    }
    let storedHighScoreList = JSON.parse(localStorage.getItem("storedHighScoreList"));
    if (storedHighScoreList !== null) {
        highScoresObj = storedHighScoreList;
    }
}

initialQuiz();

startBtn.addEventListener("click", function () {
    highScoresBtn.style.display = "none";
    quizTitle.textContent="Coding Quiz";
    newTime = TOTALTIMEGIVEN;
    timeOver = false;
    questionNumber = 0;
    startBtn.style.display = "none";
    quizLayout.textContent = "";
    timer.textContent = "Time left: " + newTime + " seconds";
    document.getElementsByClassName("name-input-row")[0].style.display="none";

    decrement();
    runQuiz();
});


function runQuiz() {
   
    if (questionNumber === questionArray.length) {
        youGotAHighScore();
        return;
    }
   
    quizLayout.innerHTML = "";
    createLayout(questionArray[questionNumber]);
    questionNumber++;
}


function decrement() {
    let timerInterval = setInterval(
        function() {
            newTime--;
            timer.textContent = "Time left: " + newTime + " seconds";
            if (newTime <= 0) {
                clearInterval(timerInterval);
                youGotAHighScore();
            }
            if (timeOver) {
                clearInterval(timerInterval);
                timer.textContent = "Timer";
            }
        },
        1000
    );
}


function penalize(PENALTYTIME) {
    newTime -= PENALTYTIME;
}


function createLayout(questionObj) {
    let numberOfAnswers = questionObj.answers.length;

    let questionPara = document.createElement('p');
    questionPara.textContent = questionObj["question"];
    questionPara.setAttribute("class", "question col md-12");
    quizLayout.appendChild(questionPara);


    for (let i = 0; i < numberOfAnswers; i++) {
        let newRow = document.createElement('div');
        newRow.setAttribute("class", "row");
        quizLayout.appendChild(newRow);

        let answerBtn = document.createElement('button');

        answerBtn.textContent = i + 1 + ".";
        answerBtn.setAttribute("class", "answerBtn btn btn-primary col-md-1");
        answerBtn.setAttribute("type", "button");
        
        if (questionObj.correctAnswer === i) {
            answerBtn.setAttribute("id", "correctAnswer");
        }
        
        let answerPara = document.createElement('p');
        answerPara.textContent = questionObj.answers[i];
        answerPara.setAttribute("class", "answerPara col-md-11");

        
        newRow.appendChild(answerBtn);
        newRow.appendChild(answerPara);
    }

    
    quizLayout.addEventListener("click", checkAnswer);
}

function checkAnswer(event) {
    event.preventDefault();
    if (event.target.matches("button")) {
        let hrElem = document.getElementById("answer-bar");
        let feedbackText = document.getElementById('right-wrong');
        if (event.target.id === "correctAnswer") {
            feedbackText.textContent = "Correct!!!"
        }
        else {
            feedbackText.textContent = "Wrong :(";
            penalize(PENALTYTIME);
        }
        
        hrElem.style.visibility = 'visible';
        feedbackText.style.visibility = 'visible';
        
        runQuiz();

        answerDisplayTime = newTime - 2;
        if (answerDisplayTime < 0) {
            answerDisplayTime = 0;
        }
        let displayInterval = setInterval(
            function() {
                if (answerDisplayTime >= newTime) {
                    hrElem.style.visibility = 'hidden';
                    feedbackText.style.visibility = 'hidden';
                    clearInterval(displayInterval);
                }
            },
            1000
        );
    }
}

nameInputForm.addEventListener("submit", function() {
    submitName(event);
});
submitScoreBtn.addEventListener("click", function() {
    submitName(event);
});
document.getElementById("high-scores-btn").addEventListener("click", displayHighScores);
document.getElementById("top-left-high-scores").addEventListener("click", function() {
    startBtn.style.display = "inline-block";
    displayHighScores();
});

if (INITIALSONLY) {
    document.getElementById("name-text").setAttribute("placeholder", "Your initials here");
}

function youGotAHighScore() {
    
    timeOver = true;
    let displayInterval = setTimeout(
        function() {
            document.getElementById("answer-bar").style.visibility = "hidden";
            document.getElementById('right-wrong').style.visibility = "hidden";
        },
        2000
    );
    
    quizLayout.innerHTML = "";
    console.log("ITS OVER");
    
    timer.textContent = "Timer";
    highScore = newTime;
    if (highScore < 0) {
        highScore = 0;
    }
    
    let highScoreDisplay = document.createElement('p');
    highScoreDisplay.setAttribute("class", "col-md-12 high-score");
    quizLayout.textContent = "sua pontuação foi " + highScore;

    // Chama a função para enviar o highScore
    submitHighScore(highScore);

    if (highScore === 0) {
        highScoreDisplay.textContent += "\n Ouch, better luck next time!";
        quizLayout.appendChild(highScoreDisplay);
    }
  
    else if (!isHighScore(highScore)) {
        highScoreDisplay.textContent += "\nGood job! But you didn't get a high score this time!";
        quizLayout.appendChild(highScoreDisplay);
    }

    else {
        highScoreDisplay.textContent += "\nGood job!";
        quizLayout.appendChild(highScoreDisplay);
        document.getElementsByClassName("name-input-row")[0].style.display="block";
    }

    startBtn.textContent = "Restart?";
    startBtn.style.display = "inline-block";
    highScoresBtn.style.display = "inline-block";
}


function isHighScore(highScore) {
    highestScores.sort();
    if (highestScores.length < SCORELISTLENGTH) {
        return true;
    }
    // Since highestScores is sorted, only check if the given highScore is higher than the lowest score.
    if (highScore > highestScores[0]) {
        return true;
    }
    return false;
}


function submitName(event) {

    event.preventDefault();
  
    if (inputName(highScore)) {
        if (highestScores.length >= SCORELISTLENGTH) {
            
            let sortedScores = scoreSort();
            let lowScorerName = sortedScores[sortedScores.length - 1][1];
            highScoresObj[lowScorerName].sort();
          
            highScoresObj[lowScorerName].splice(0, 1);
           
            highestScores.shift();
        }
        // Add the newest high score and put it into local storage.
        highestScores.push(highScore);
        localStorage.setItem("highestScoresArray", JSON.stringify(highestScores));

        // Display the high scores list.
        document.getElementsByClassName("name-input-row")[0].style.display="none";
        displayHighScores();
    }
}


/** inputName() validates name inputs.
 * After validation, it adds the input name and score to the highScoresObj Object. */
function inputName(highScore) {
    let nameInput = document.querySelector("#name-text").value;

    // Validate name:
    if (nameInput === "") {
        alert("You must have at least one character in your name!");
        return false;
    }
    if (INITIALSONLY) {
        if (nameInput.length > 3) {
            alert("Only 3 initials accepted!");
            return false;
        }
        nameInput = nameInput.toUpperCase();
    }
    else if (nameInput.length > MAXNAMELENGTH) {
        nameInput = nameInput.trim();
        alert("Maximum character length for names is " + MAXNAMELENGTH + " characters!");
        return false;
    }

    // The score will be input as a part of an array of scores. Each score array is associated with
    // a unique name property, which is part of the Object highScoresObj.
    // This allows a given name to have more than one high score associated with it.
    // So, if the name is not already in use, create the new name and associated score array.
    if (highScoresObj[nameInput] === undefined) {
        highScoresObj[nameInput] = [];
        highScoresObj[nameInput].push(highScore);
        localStorage.setItem("storedHighScoreList", JSON.stringify(highScoresObj));
    }
    else {
        highScoresObj[nameInput].push(highScore);
        localStorage.setItem("storedHighScoreList", JSON.stringify(highScoresObj));
    }
    return true;
}


/** Sort and display high scores, in order from highest to lowest. */
function displayHighScores() {
    quizLayout.innerHTML = "";
    highScoresBtn.style.display = "none";
    quizTitle.textContent = "High Scores";

    // scoreSort() returns a sorted 2D array of names and scores.
    let sortedScores = scoreSort();

    let alternateBackground = true      // indicates alternate background colors for alternating rows
    // A loop that first appends a score row to the quiz. Then it adds two columns, one for names and one for scores.

    for (let i = 0, j = sortedScores.length; i < j; i++) {
        let scoreRow = document.createElement("div");
        if (alternateBackground) {
            scoreRow.setAttribute("class", "row high-score-row odd-row");
            alternateBackground = false;
        }
        else {
            scoreRow.setAttribute("class", "row high-score-row even-row");
            alternateBackground = true;
        }
        quizLayout.appendChild(scoreRow);

        let nameCol = document.createElement("div");
        nameCol.setAttribute("class", "col-md-11");
        nameCol.textContent = sortedScores[i][1];
        scoreRow.appendChild(nameCol);
        let scoreCol = document.createElement("div");
        scoreCol.setAttribute("class", "col-md-1");
        scoreCol.textContent = sortedScores[i][0];
        scoreRow.appendChild(scoreCol);
    }
}


/** Gets the names and high scores from highScoresObj and puts them into a 2D arrray.
 * Then uses bubble sort to sort the 2D array of names and scores, from highest to lowest.
 * The returned array scoreArray[i][0] is a score, and scoreArray[i][1] is the associated name. */
function scoreSort() {
    // Get names and scores into new array, scoreArray:
    let scoreArray = [];
    for (let scoreName in highScoresObj) {
        for (let i = 0, j = highScoresObj[scoreName].length; i < j; i++) {
            let individualScore = [];
            individualScore.push(highScoresObj[scoreName][i]);
            individualScore.push(scoreName);
            scoreArray.push(individualScore);
        }
    }

    // bubble sort on scoreArray, sorting in descending order:
    do {
        // Using var here instead of let, otherwise 'swap' is inaccessible to the while statement at the end.
        var swap = 0;
        for (let i = 0, j = scoreArray.length - 1; i < j; i++) {
            if (scoreArray[i][0] < scoreArray[i + 1][0]) {
                let tmp = scoreArray[i];
                scoreArray[i] = scoreArray[i + 1];
                scoreArray[i + 1] = tmp;
                swap++;
            } 
        }
    } while (swap != 0);
   
}


// Função para enviar o highScore via AJAX para o PHP
function submitHighScore(highScore) {
    // Cria o objeto de dados a ser enviado no corpo da requisição
    var data = {
        highScore: highScore
    };

    // Envia a requisição AJAX para o PHP
    fetch('point.php', {
        method: 'POST', // Método POST
        headers: {
            'Content-Type': 'application/json' // Envia os dados no formato JSON
        },
        body: JSON.stringify(data) // Converte os dados para JSON
    })
    .then(response => response.json()) // Espera a resposta do PHP e converte para JSON
    .then(data => {
        // Exibe a resposta do servidor (sucesso ou erro)
        if (data.success) {
            console.log(data.message); // Caso o score tenha sido salvo com sucesso
        } else {
            console.log(data.message); // Caso tenha ocorrido um erro
        }
    })
    .catch(error => {
        console.error('Erro:', error); // Em caso de falha na requisição
    });
}
