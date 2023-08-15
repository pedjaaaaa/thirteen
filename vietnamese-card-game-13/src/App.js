import React, { useState, useEffect } from 'react';
import './App.css';

const CARD_RANKS = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
const CARD_SUIT_RANKS = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];

const generateDeck = () => {
  const deck = [];
  for (const suit of CARD_SUITS) {
    for (const rank of CARD_RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
};

function App() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playArea, setPlayArea] = useState([]);

  useEffect(() => {
    setDeck(generateDeck());
  }, []);

  const dealCards = () => {
    // Implement card dealing logic
    const newPlayerHand = deck.slice(0, 13);
    const newPlayArea = deck.slice(13);
    setPlayerHand(newPlayerHand);
    setPlayArea(newPlayArea);
  };

  return (
    <div className="App">
      <h1>Thirteen</h1>
      <button onClick={dealCards}>Deal Cards</button>
      <div className="game-container">
        <div className="player-hand">
          {playerHand.map((card, index) => (
            <div key={index} className="card">
              {card.rank} {card.suit}
            </div>
          ))}
        </div>
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
