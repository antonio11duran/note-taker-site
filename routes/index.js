const express = require('express');
const notesRouter = require('./notes');

const index = express();

index.use('/api/notes', notesRouter);

module.exports = index;