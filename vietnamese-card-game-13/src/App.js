import React, { useState, useEffect } from 'react';
import './App.css';
// Create 2 Arrays with the card ranks and suits
const CARD_RANKS = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
const CARD_SUITS = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
// Generate the deck and combine the ranks and suiits
const generateDeck = () => {
  const deck = [];
  for (const suit of CARD_SUITS) {
    for (const rank of CARD_RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
};
// Deals the cards to 4 players
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

const sortHand = (hand) => {
  const suitOrder = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
  return hand.sort((cardA, cardB) => {
    const rankOrder = CARD_RANKS.indexOf(cardA.rank) - CARD_RANKS.indexOf(cardB.rank);
    if (rankOrder !== 0) {
      return rankOrder;
    }
    return suitOrder.indexOf(cardA.suit) - suitOrder.indexOf(cardB.suit);
  });
};

const dealCardsToPlayers = (deck, numPlayers) => {
  const hands = Array.from({ length: numPlayers }, () => []);
  for (let i = 0; i < deck.length; i++) {
    const playerIndex = i % numPlayers;
    hands[playerIndex].push(deck[i]);
  }
  return hands.map((hand) => sortHand(hand)); // Sort each player's hand
};

function App() {
  const [deck, setDeck] = useState([]);
  const [playerHands, setPlayerHands] = useState([]);
  const [playArea, setPlayArea] = useState([]);

  useEffect(() => {
    setDeck(generateDeck());
  }, []);

  const dealCards = (numPlayers) => {
    const shuffledDeck = [...deck];
    shuffleDeck(shuffledDeck);
    const hands = dealCardsToPlayers(shuffledDeck, numPlayers);
    setPlayerHands(hands);
    setPlayArea([]);
  };

  return (
    <div className="App">
      <h1>Vietnamese Card Game 13</h1>
      <button onClick={() => dealCards(4)}>Deal Cards for 4 Players</button>
      <div className="game-container">
        {playerHands.map((hand, playerIndex) => (
          <div key={playerIndex} className="player-hand">
            Player {playerIndex + 1}:
            {hand.map((card, index) => (
              <div key={index} className="card">
                {card.rank} {card.suit}
              </div>
            ))}
          </div>
        ))}
        <div className="play-area">
          {playArea.map((card, index) => (
            <div key={index} className="card">
              {card.rank} {card.suit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;