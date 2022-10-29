const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// reading from database
notes.get('*', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// get route for specific note
notes.get('/:notes_id', (req, res) => {
    const noteId = req.params.notes_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.notes_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

// deleting from database
notes.delete('/:notes_id', (req, res) => {
    const noteId = req.params.notes_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.notes_id !== noteId);
            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been deleted 🗑️`)
        });
});

// posting to database
notes.post('*', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            notes_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully 🚀')
    } else {
        res.errored('Error in adding new note');
    }
});

module.exports = notes;