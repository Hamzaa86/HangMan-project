/*-------------- Constants -------------*/
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const words = {
  Countries: [
    'Argentina',
    'Brazil',
    'Canada',
    'Denmark',
    'Egypt',
    'France',
    'Germany',
    'India',
    'Japan',
    'Kenya',
    'Mexico',
    'Norway',
    'Peru',
    'Russia',
    'Spain',
    'Thailand',
    'United Kingdom',
    'United States',
    'Venezuela',
    'Zimbabwe',
    'Bahrain',
    'Pakistan',
    'Saudi Arabia',
    'Oman',
    'Kuwait'
  ],

  Sports: [
    'Basketball',
    'Soccer',
    'Tennis',
    'Baseball',
    'Rugby',
    'Cricket',
    'Golf',
    'Ice Hockey',
    'Volleyball',
    'Swimming',
    'Boxing',
    'Badminton',
    'Table Tennis',
    'Track and Field',
    'Skiing',
    'Surfing',
    'Archery',
    'Martial Arts',
    'Cycling',
    'Wrestling'
  ],

  Foods: [
    'Pizza',
    'Sushi',
    'Tacos',
    'Spaghetti',
    'Burger',
    'Pancakes',
    'Curry',
    'Salad',
    'Dumplings',
    'Ice Cream',
    'Chocolate',
    'Lasagna',
    'Rice',
    'Fries',
    'Sandwich',
    'Steak',
    'Hummus',
    'Soup',
    'Biryani'
  ],

  Animals: [
    'Elephant',
    'Lion',
    'Tiger',
    'Whale',
    'Dolphin',
    'Kangaroo',
    'Panda',
    'Giraffe',
    'Zebra',
    'Shark',
    'Crocodile',
    'Penguin',
    'Eagle',
    'Bear',
    'Wolf',
    'Cheetah',
    'Koala',
    'Otter',
    'Owl',
    'Parrot'
  ]
}

/*---------- Variables (state) ---------*/
let lettersArray = Array.from(letters)

let allKeys = Object.keys(words)

let randomPropNumber
let randomPropName
let randomPropValue
let randomValueNumber
let randomValueValue
let lettersAndSpace

let wrongAttempts
let correctGuesses

/*----- Cached Element References  -----*/
let lettersContainer = document.querySelector('.letters')
let lettersGuessContainer = document.querySelector('.letters-guess')
let theDraw = document.querySelector('.hangman-draw')
let categorySpan = document.querySelector('.category span')
let popupDiv
let guessSpans

// Get the existing New Game button from the HTML
let newGameButton = document.getElementById('restart-btn')

/*-------------- Functions -------------*/

// Initialize the game
const initGame = () => {
  // Reset game state variables
  wrongAttempts = 0
  correctGuesses = 0

  // Clear previous game UI elements
  lettersContainer.innerHTML = ''
  lettersGuessContainer.innerHTML = ''
  theDraw.className = 'hangman-draw' // Reset hangman drawing
  if (popupDiv) {
    popupDiv.remove()
  }
  lettersContainer.classList.remove('finished')

  // Random category and word selection
  randomPropNumber = Math.floor(Math.random() * allKeys.length)
  randomPropName = allKeys[randomPropNumber]
  randomPropValue = words[randomPropName]
  randomValueNumber = Math.floor(Math.random() * randomPropValue.length)
  randomValueValue = randomPropValue[randomValueNumber]

  // Convert chosen word to array
  lettersAndSpace = Array.from(randomValueValue)

  // Display category name
  categorySpan.textContent = randomPropName

  // Create letter boxes
  lettersArray.forEach((letter) => {
    let span = document.createElement('span')
    let theLetter = document.createTextNode(letter)
    span.appendChild(theLetter)
    span.className = 'letter-box'
    lettersContainer.appendChild(span)
  })

  // Create spans for the chosen word letters
  lettersAndSpace.forEach((letter) => {
    let emptySpan = document.createElement('span')
    if (letter === ' ') {
      emptySpan.className = 'with-space'
    }
    lettersGuessContainer.appendChild(emptySpan)
  })

  // Select guess spans after they are added to the DOM
  guessSpans = document.querySelectorAll('.letters-guess span')
}

// End game popup (win or lose)
const endGame = (isWin) => {
  popupDiv = document.createElement('div')
  let divText

  if (isWin) {
    divText = document.createTextNode(
      `Congratulations! You Win! The Word Was: ${randomValueValue}`
    )
  } else {
    divText = document.createTextNode(
      `Game Over! You Lose. The Word Was: ${randomValueValue}`
    )
  }

  popupDiv.appendChild(divText)
  popupDiv.className = 'popup'
  document.body.appendChild(popupDiv)
}

/*----------- Event Listeners ----------*/

// Letter click event listener
document.addEventListener('click', (e) => {
  if (e.target.className === 'letter-box') {
    e.target.classList.add('clicked')

    let theClickLetter = e.target.textContent.toLowerCase()
    let theChosenWord = Array.from(randomValueValue.toLowerCase())

    let theStatus = false

    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickLetter === wordLetter) {
        theStatus = true
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.textContent = theClickLetter
            correctGuesses++
          }
        })
      }
    })

    if (!theStatus) {
      wrongAttempts++
      theDraw.classList.add(`wrong-${wrongAttempts}`)
      document.getElementById('mis1').play()

      if (wrongAttempts === 6) {
        endGame(false)
        lettersContainer.classList.add('finished')
      }
    } else {
      document.getElementById('cor1').play()
    }

    // Check if the player has won (all letters guessed correctly)
    if (
      correctGuesses ===
      lettersAndSpace.filter((letter) => letter.toLowerCase() !== ' ').length
    ) {
      endGame(true)
      lettersContainer.classList.add('finished')
    }
  }
})

// New Game Button Click
newGameButton.addEventListener('click', initGame)

/*--------- Initialize the Game ---------*/
initGame()
