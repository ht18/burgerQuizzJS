// déclaration des variables

//HTML sélection
const questionDiv = document.querySelector(".question");
const answer1 = document.querySelector("#a1");
const answer2 = document.querySelector("#a2");
const answer3 = document.querySelector("#a3");
const answer4 = document.querySelector("#a4");
const answers = document.querySelector(".answers");
const answer = document.querySelectorAll(".answer");
const scoreDiv = document.querySelector(".score");
const timerDiv = document.querySelector("#timer");
const buttons = document.querySelectorAll(".button");
const main = document.getElementsByTagName("main")
const difficulty = document.querySelector(".difficulty");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");

//Déclaration des variables autres
let time = 40;
let finalScore = 0;
let arrayOfURL = ["https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=31&region=FR&difficulty=easy", "https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=31&region=FR&difficulty=medium", "https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=31&region=FR&difficulty=hard"]
let arrayOfAnswers = [];

// Sélection de l'URL en fonction de la difficulté et lancement du jeu
const easyURL = easy.addEventListener('click', (e) => {
    let result = arrayOfURL[0];
    callAPI(result);
    difficulty.remove();
    timerOut();
})

const mediumURL = medium.addEventListener('click', (e) => {
    let result = arrayOfURL[1];
    callAPI(result);
    difficulty.remove();
    timerOut();
})

const hardURL = hard.addEventListener('click', (e) => {
    let result = arrayOfURL[2];
    callAPI(result);
    difficulty.remove();
    timerOut();
})


//API Récupération des données et traitement 
const callAPI = (URLApi) => {
    fetch(URLApi)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            //construction du tableau de réponses 
            for (let i = 0; i < data.length; i++) {
                const questionData = data[i].question;
                const correctAnswer = data[i].correctAnswer;
                let arrayWrongAnswers = [];
                for (let j = 0; j < data[i].incorrectAnswers.length; j++) {
                    const wrongAnswer = data[i].incorrectAnswers[j];
                    arrayWrongAnswers.push({ value: wrongAnswer, status: "False" });

                }
                arrayWrongAnswers.push({ value: correctAnswer, status: "True" });
                arrayOfAnswers.push(arrayWrongAnswers);
            }

            //mélange du tableau
            for (let k = 0; k < arrayOfAnswers.length; k++) {
                arrayOfAnswers[k].sort((a, b) => 0.5 - Math.random());
            }

            //ajout des questions et réponses au HTML
            let l = 0; // réponse à la première question

            function loadQuestion(p) {
                answer.forEach((div) => {
                    const question = data[l].question;
                    const answer1Data = arrayOfAnswers[l][0].status;
                    const answer1Text = arrayOfAnswers[l][0].value;
                    const answer2Text = arrayOfAnswers[l][1].value;
                    const answer2Data = arrayOfAnswers[l][1].status;
                    const answer3Text = arrayOfAnswers[l][2].value;
                    const answer3Data = arrayOfAnswers[l][2].status;
                    const answer4Text = arrayOfAnswers[l][3].value;
                    const answer4Data = arrayOfAnswers[l][3].status;

                    questionDiv.innerHTML = `${question}`;
                    answer1.innerHTML = `<div class="A1" data-status="${answer1Data}">${answer1Text}</div>`;
                    answer2.innerHTML = `<dsqiv class="A1" data-status="${answer2Data}">${answer2Text}</div>`;
                    answer3.innerHTML = `<div class="A1" data-status="${answer3Data}">${answer3Text}</div>`;
                    answer4.innerHTML = `<div class="A1" data-status="${answer4Data}">${answer4Text}</div>`;
                })
            }

            loadQuestion(l);

            //vérification du statut de la réponse
            let counter = 0;
            answer.forEach((div) => {
                div.addEventListener('click', (e) => {
                    e.stopPropagation();

                    const status = div.firstChild.dataset.status;
                    if (status === "True") {
                        counter++;
                        finalScore++;
                        div.style.backgroundColor = "green";
                        setInterval(() => { div.style.backgroundColor = "rgb(234, 182, 118)" }, 300);
                    } else {
                        div.style.backgroundColor = "red";
                        setInterval(() => { div.style.backgroundColor = "rgb(234, 182, 118)" }, 300);
                    }

                    loadQuestion(l++); //chargement d'une nouvelle question
                    scoreDiv.innerHTML = `Your score is : ${counter}`; //affichage du score dès qu'une réponse est donnée
                })
            })

        })
}


//fonction qui stoppe le jeu
function stopGame() {
    const allScore = document.createElement('article');
    allScore.classList.add('allScore');
    answers.appendChild(allScore);
    allScore.innerHTML = `Your final score is ${finalScore}`;
}

//fonction de lancement du timer
const timerOut = function () {
    setInterval(function () {
        timerDiv.innerText = time;
        timerDiv.dataset.t = time;
        if (time == 0) {
            stopGame();
            time = 0;
            clearInterval(timerOut);
        }
        else {
            time--;
        }
    }, 1000)
};




