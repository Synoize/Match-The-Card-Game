const cardContainer = document.querySelector("#card-container");
const mainContainer = document.querySelector("#main-container");
const resultContainer = document.querySelector("#result-container");
let flips = document.querySelector("#flip-number");
const play = document.querySelector("#play-btn");

// Function to generate random numbers and shuffle them
function generateRandomNumbers() {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(i);
        numbers.push(i); // Each number pair twice for matching
    }

    numbers.sort(() => Math.random() - 0.5);
    return numbers;
}

let numbers = generateRandomNumbers();

let flippedCards = [];
let matchedCards = [];
let canFlip = true;
let numFlip = 0;



play.addEventListener("click", () => {
    play.style.display = "none";
    mainContainer.style.justifyContent = "start";
    cardContainer.style.display = "flex";
    resultContainer.style.display = "flex";

    createCards();
});

function createCards() {
    numbers.forEach((number, index) => {
        const card = document.createElement("div");
        card.classList.add('card');
        card.dataset.number = number;
        card.textContent = '?';
        cardContainer.appendChild(card);

        card.addEventListener("click", () => {
            flipCard(card);
        });
    });
}


function flipCard(card) {
    if (!canFlip || flippedCards.length === 2 || card === flippedCards[0] || matchedCards.includes(card)) {
        return;
    }

    card.textContent = card.dataset.number;
    card.classList.add("card-flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(checkForMatch, 300);
    }
}

function checkForMatch() {
    numFlip++;
    flips.innerHTML = `Flips : ${numFlip}`;
    const [card1, card2] = flippedCards;

    if (card1.dataset.number === card2.dataset.number) {
        matchedCards.push(card1, card2);
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
    } else {
        setTimeout(() => {
            card1.textContent = '?';
            card2.textContent = '?';
            card1.classList.remove('card-flipped');
            card2.classList.remove('card-flipped');
        }, 300);
    }

    flippedCards = [];
    canFlip = true;

    checkGameEnd();
}

function checkGameEnd() {
    if (matchedCards.length === numbers.length) {
        setTimeout(() => {
            alert("Congratulations! You've matched all cards.");
        }, 300);
    }

}