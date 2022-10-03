
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const easy = document.getElementById("easy");

let arrayOfURL = ["https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=31&region=FR&difficulty=easy", "https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=31&region=FR&difficulty=medium", "https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=31&region=FR&difficulty=hard"]

function chooseURL() {
    easy.addEventListener("click", () => {
        url = arrayOfURL[0];
        console.log(url);
    })
    medium.addEventListener("click", () => {
        url = arrayOfURL[1];
        console.log(url);
    })
    hard.addEventListener("click", () => {
        url = arrayOfURL[2];
        console.log(url);
    })
}

chooseURL();


