const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.use(cors({
  origin: 'http://43.205.124.4'
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
