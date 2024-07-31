const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;
const dataPath = './src/assets/data/cards.json';

app.use(cors());
app.use(express.json());

app.get('/cards', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading cards data:', err);
      return res.status(500).send('Error reading cards data');
    }
    try {
      const cards = JSON.parse(data);
      res.json(cards);
    } catch (parseError) {
      console.error('Error parsing cards data:', parseError);
      res.status(500).send('Error parsing cards data');
    }
  });
});

app.post('/cards', (req, res) => {
  // Validate if the received data is an array
  if (!Array.isArray(req.body)) {
    return res.status(400).send('Invalid data format. Expected an array.');
  }

  // Optional: Validate each card structure if needed
  const isValidCard = (card) => card && typeof card.title === 'string' && typeof card.id === 'string' && typeof card.column === 'string';
  if (!req.body.every(isValidCard)) {
    return res.status(400).send('Invalid card structure.');
  }

  fs.writeFile(dataPath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error saving cards data');
    }
    res.send('Cards data saved successfully');
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on https://nkl-kanban.netlify.app:${PORT}`);
});
