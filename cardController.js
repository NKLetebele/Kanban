const fs = require('fs');
const path = './src/assets/data/cards.json';

// Function to read existing cards
const readCards = () => {
  try {
    const dataBuffer = fs.readFileSync(path);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Function to save updated cards
const saveCards = (cards) => {
  fs.writeFileSync(path, JSON.stringify(cards, null, 2));
};

// Function to create a new card
const createCard = (req, res) => {
  const newCard = req.body;
  const cards = readCards();
  cards.push(newCard);
  saveCards(cards);
  res.status(201).send(newCard);
};

module.exports = { createCard };
