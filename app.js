const GAME_VARIANTS = ['paper', 'scissors', 'stone']
const WIN_MAP = {
	stone: 'scissors',
	scissors: 'paper',
	paper: 'stone',
}

function getRandomIdx() {
	return Math.floor(Math.random() * GAME_VARIANTS.length)
}
function calculateGameResult(userValue, opponentValue) {
	if (GAME_VARIANTS.includes(userValue)) {
		if (userValue === opponentValue) return 0
		else if (WIN_MAP[userValue] === opponentValue) {
			return 1
		} else {
			return -1
		}
	}
}

function setUserValueToResult(newValue) {
	const userChoice = document.getElementById('user-value')
	userChoice.textContent = newValue
}
function playRound(userValue) {
	const opponentValue = GAME_VARIANTS[getRandomIdx()]
	const opponentChoice = document.getElementById('opponent-value')
	opponentChoice.textContent = opponentValue

	const roundResult = calculateGameResult(userValue, opponentValue)
	return roundResult
}
function showResult(roundStatus) {
	const resultHeader = document.querySelector('.game-result')
	const opponentChoice = document.getElementById('opponent-value')
	const userChoice = document.getElementById('user-value')
	const retryBtn = document.querySelector('.retry-button')
	const confirmBtn = document.querySelector('.confirm-button')
	const opponentValue = opponentChoice.textContent
	const userValue = userChoice.textContent

	switch (roundStatus) {
		case -1:
			resultHeader.textContent = `You LOSE! Your choice: ${userValue}. Opponent choice: ${opponentValue}.`
			break
		case 0:
			resultHeader.textContent = `DRAW! Your choice: ${userValue}.opponent choice: ${opponentValue}.`
			break
		case 1:
			resultHeader.textContent = `You WON! Your choice: ${userValue}. opponent choice: ${opponentValue}.`
			break
	}
	confirmBtn.style.display = 'none'
	retryBtn.style.display = 'block'
}
function resetGame() {
	const retryBtn = document.querySelector('.retry-button')
	const confirmBtn = document.querySelector('.confirm-button')
	const resultHeader = document.querySelector('.game-result')
	const opponentChoice = document.getElementById('opponent-value')
	const userChoice = document.getElementById('user-value')

	resultHeader.textContent = 'Status will be shown here!'
	opponentChoice.textContent = 'PC choice'
	userChoice.textContent = 'Your choice'
	confirmBtn.style.display = 'block'
	retryBtn.style.display = 'none'

	enableButtons()
	editCards(null, 'reset')
}

function editCards(roundResult, mode) {
	const opponentCard = document.getElementById('opponent-card')
	const opponentCardTitle = document.getElementById('opponent-value')
	const userCard = document.getElementById('user-card')
	const userCardTitle = document.getElementById('user-value')

	if (mode === 'decorate') {
		switch (roundResult) {
			case -1:
				opponentCard.style.backgroundColor = '#000'
				opponentCardTitle.style.fontSize = '28px'
				opponentCard.style.color = '#fff'
				break
			case 0:
				opponentCard.style.backgroundColor = '#000'
				opponentCardTitle.style.fontSize = '28px'
				opponentCard.style.color = '#fff'
				userCard.style.backgroundColor = '#000'
				userCardTitle.style.fontSize = '28px'
				userCard.style.color = '#fff'
				break
			case 1:
				userCard.style.backgroundColor = '#000'
				userCardTitle.style.fontSize = '28px'
				userCard.style.color = '#fff'
				break
		}
	} else if (mode === 'reset') {
		opponentCard.style.backgroundColor = '#fff'
		opponentCardTitle.style.fontSize = '16px'
		opponentCard.style.color = '#000'
		userCard.style.backgroundColor = '#fff'
		userCardTitle.style.fontSize = '16px'
		userCard.style.color = '#000'
	}
}

function enableButtons() {
	const buttons = document.querySelectorAll('.buttons-to-play__choice__button')
	buttons.forEach(button => {
		button.disabled = false
	})
}
function disableButtons() {
	const buttons = document.querySelectorAll('.buttons-to-play__choice__button')
	buttons.forEach(button => {
		button.disabled = true
	})
}

function main() {
	const resultHeader = document.querySelector('.game-result')
	const buttons = document.querySelectorAll('.buttons-to-play__choice__button')
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const buttonValue = button.dataset.value
			setUserValueToResult(buttonValue)
		})
	})

	const confirmBtn = document.querySelector('.confirm-button')
	confirmBtn.addEventListener('click', () => {
		const userChoice = document.getElementById('user-value')
		const userValue = userChoice.textContent
		if (
			userValue !== 'paper' &&
			userValue !== 'stone' &&
			userValue !== 'scissors'
		) {
			resultHeader.textContent = 'Choose something!'
		} else {
			disableButtons()
			const roundResult = playRound(userValue)
			showResult(roundResult)
			editCards(roundResult, 'decorate')
		}
	})

	const retryBtn = document.querySelector('.retry-button')
	retryBtn.addEventListener('click', () => {
		resetGame()
	})
}

main()
