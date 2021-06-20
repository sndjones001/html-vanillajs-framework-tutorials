const wordEl = document.getElementById('word');
const popupContainerEl = document.getElementById('popup-contaner');
const notificationContainerEl = document.getElementById(
  'notification-container'
);
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const finalMessageEl = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Display word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) => `
        <span class='letter'>${
          correctLetters.includes(letter) ? letter : ''
        }</span>
        `
      )
      .join('')}
    `;

  const innerword = wordEl.innerText.replace(/\n/g, '');

  if (innerword === selectedWord) {
    finalMessageEl.innerText = 'Congratulations! You won!';
    popupContainerEl.style.display = 'flex';
  }
}

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'flex';
    } else {
      part.style.display = 'none';
    }
  });

  // check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessageEl.innerText = 'Unfortunately you lost !';
    popupContainerEl.style.display = 'flex';
  }
}

function showNotification() {
  notificationContainerEl.classList.add('show');

  setTimeout(() => {
    notificationContainerEl.classList.remove('show');
  }, 2000);
}

// Keydown letter
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    let letter = e.key.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();
  popupContainerEl.style.display = 'none';
});

displayWord();
