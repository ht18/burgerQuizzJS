const questionDiv = document.querySelector(".question");
const answer1 = document.querySelector("#a1");
const answer2 = document.querySelector("#a2");
const answer3 = document.querySelector("#a3");
const answer4 = document.querySelector("#a4");
const answer = document.querySelectorAll(".answer");
const scoreDiv = document.querySelector(".score");
const timerDiv = document.querySelector("#timer");
let arrayOfAnswers = [];

//API
let temps = 15;
function timer() {
    timerDiv.innerText = temps;
    temps--
}

setInterval(timer, 1000);

fetch("https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=10&region=FR&difficulty=easy")
    .then(res => res.json())
    .then((data) => {
        console.log(data[0]);
        for (let i = 0; i < data.length; i++) {
            const questionData = data[i].question;
            const correctAnswer = data[i].correctAnswer;
            let arrayWrongAnswers = [];
            for (let j = 0; j < data[i].incorrectAnswers.length; j++) {
                const wrongAnswer = data[i].incorrectAnswers[j];
                arrayWrongAnswers.push({ value: wrongAnswer, status: "False" });

            }

            //construction du tableau de réponses 
            arrayWrongAnswers.push({ value: correctAnswer, status: "True" });
            arrayOfAnswers.push(arrayWrongAnswers);
        }
        console.log(arrayOfAnswers);

        //mélange du tableau
        for (let k = 0; k < arrayOfAnswers.length; k++) {
            arrayOfAnswers[k].sort((a, b) => 0.5 - Math.random());
        }

        console.log(arrayOfAnswers);

        //ajout des questions et réponses au HTML
        for (let l = 0; l < arrayOfAnswers.length; l++) {
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

        console.log(answer);

        //vérification du statut de la réponse
        answer.forEach((div) => {
            div.addEventListener('click', (e) => {
                e.stopPropagation();
                let counter = 0;
                const status = div.firstChild.dataset.status;
                if (status === "True") {
                    counter++;
                }
                scoreDiv.innerHTML = `Your score is : ${counter}`;
            })
        })

    })




