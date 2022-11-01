const express = require('express');
const api = require('./routes/notes');
const html = require('./routes/html');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', api);
app.use('/', html);

app.use(express.static('public'));

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
