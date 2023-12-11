let cardsContainer = document.querySelector('.js-cards'),
	cards = Array.from(cardsContainer.children),
	flippedCards = [],
	delay = 1000

cards.forEach(card => {
	card.addEventListener('click', flipCard)
})
function flipCard() {
	const selectedCard = this
	selectedCard.classList.add('flipped')
	flippedCards.push(selectedCard)
	console.log(flippedCards)
	if (flippedCards.length === 2) {
		validateCards()
	}
}
function validateCards() {
	const [firstCard, secondCard] = flippedCards

	cardsContainer.classList.add('no-event')

	if (firstCard.dataset.type === secondCard.dataset.type) {
		firstCard.classList.replace('flipped', 'has-match')
		secondCard.classList.replace('flipped', 'has-match')

		flippedCards = []

		setTimeout(() => {
			const allHaveMatches = cards.every(card =>
				card.classList.contains('has-match')
			)

			cardsContainer.classList.remove('no-event')

			if (allHaveMatches) {
				arrangeCards()
			}
		}, delay)
	} else {
		setTimeout(() => {
			firstCard.classList.remove('flipped')
			secondCard.classList.remove('flipped')

			flippedCards = []

			cardsContainer.classList.remove('no-event')
		}, delay)
	}
}

function arrangeCards() {
	cards.forEach(card => {
		const randomNumber = Math.floor(Math.random() * cards.length) + 1

		card.classList.remove('has-match')

		setTimeout(() => {
			card.style.order = `${randomNumber}`
		}, 400)
	})
}
