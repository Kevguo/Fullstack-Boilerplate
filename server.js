const app = require('express')();

const port = 5000;

app.get('/api/test', (req, res) => {
  res.json({ response: 'From Server' });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
