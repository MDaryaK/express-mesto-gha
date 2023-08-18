const express = require('express');
const { connect } = require('mongoose');

const error = require('./controllers/error');
const routes = require('./routes');

const app = express();
const port = 3000;

(async () => {
  try {
    await connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
    });
  } catch (e) {
    console.error('DB', e);
  }
})();

app.use((req, res, next) => {
  req.user = {
    _id: '64de8837453e2fcc9fc60a5a',
  };

  next();
});

app.use(express.json());
app.use(routes);

app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});