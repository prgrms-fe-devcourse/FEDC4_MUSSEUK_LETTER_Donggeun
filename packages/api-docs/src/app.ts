import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(5010, () => {
  console.log('Server running on port 5010');
});
