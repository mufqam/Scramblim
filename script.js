// Daftar kata langsung di sini
const kataIslami = [
  "masjid", "shalat", "puasa", "zakat", "haji",
  "iman", "malaikat", "kitab", "rasul", "takdir",
  "wudhu", "tayamum", "qurban", "zuhur", "adzan",
  "thaharah", "niat", "doa", "sujud", "rukuk",
  "ikhlas", "jujur", "sabar", "syukur", "taat",
  "berkah", "amanah", "rahmat", "ridha", "taubat",
  "adam", "nuh", "ibrahim", "musa", "isa", "muhammad",
  "umar", "ali", "bilal", "khalid", "ka'bah", "madinah",
  "mekkah", "arafah", "hijrah", "uhud", "badar", "isra", "mi'raj", "qiblat"
];

let currentWord = "";
let scrambled = "";
let score = 0;
let level = 1;
let time = 60;
let timerInterval;

// Elemen DOM
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const gameContainer = document.querySelector(".game-container");
const scrambledWord = document.getElementById("scrambled-word");
const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-button");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const timerDisplay = document.getElementById("timer");
const gameOverBox = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

// Suara
const suaraBenar = new Audio("sounds/benar.mp3");
const suaraSalah = new Audio("sounds/salah.mp3");
const suaraGameOver = new Audio("sounds/gameover.mp3");

// Fungsi
function acakKata(kata) {
  return kata.split('').sort(() => Math.random() - 0.5).join('');
}

function loadNewWord() {
  userInput.value = "";
  feedback.textContent = "";

  currentWord = kataIslami[Math.floor(Math.random() * kataIslami.length)];
  scrambled = acakKata(currentWord);

  while (scrambled === currentWord) {
    scrambled = acakKata(currentWord);
  }

  scrambledWord.textContent = scrambled.toUpperCase();
}

function updateTimer() {
  time--;
  timerDisplay.textContent = `Waktu: ${time} detik`;

  if (time <= 0) {
    endGame();
  }
}

// Event Listener
checkButton.addEventListener("click", () => {
  const answer = userInput.value.trim().toLowerCase();

  if (answer === currentWord) {
    suaraBenar.play();
    score += 10;
    level++;
    feedback.textContent = "Benar! 🎉";
    scoreDisplay.textContent = `Skor: ${score}`;
    levelDisplay.textContent = `Level: ${level}`;
    loadNewWord();
  } else {
    suaraSalah.play();
    feedback.textContent = "Coba lagi! ❌";
  }
});

startButton.addEventListener("click", () => {
  time = 60;
  score = 0;
  level = 1;
  startScreen.style.display = "none";
  gameContainer.style.display = "block";
  scoreDisplay.textContent = `Skor: ${score}`;
  levelDisplay.textContent = `Level: ${level}`;
  timerDisplay.textContent = `Waktu: ${time} detik`;
  timerInterval = setInterval(updateTimer, 1000);
  loadNewWord();
});

restartButton.addEventListener("click", () => {
  time = 60;
  score = 0;
  level = 1;
  scoreDisplay.textContent = `Skor: ${score}`;
  levelDisplay.textContent = `Level: ${level}`;
  timerDisplay.textContent = `Waktu: ${time} detik`;
  gameOverBox.style.display = "none";
  timerInterval = setInterval(updateTimer, 1000);
  loadNewWord();
});

function endGame() {
  clearInterval(timerInterval);
  suaraGameOver.play();
  scrambledWord.textContent = "_ _ _";
  feedback.textContent = "";
  gameOverBox.style.display = "block";
  finalScore.textContent = score;
}