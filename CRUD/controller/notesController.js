const Note = require('../models/notes');

const fetchNotes = async (req, res) => {
    const notes = await Note.find();

    res.json({
        notes,
    })
};

const fetchNote = async (req, res) =>{
    //get id off the url
    const id = req.params.id;
    const note = await Note.findById(id);
    res.json({
        note,
    });
};

const createNote = async (req, res) => {
    // get the sent data off the request body
    const{title, body} = req.body;
    //create a note with it
    const note = await Note.create({
        title,
        body,
    });
    //respond with a new note
    res.json({
        note,
    });
};

const updateNote = async (req, res) =>{
    const id = req.params.id;
    const {title, body} = req.body;
    //update the note with id
    const note = await Note.findByIdAndUpdate(id, {
        title,
        body,
    });

    res.json({note});
};

const deleteNote = async (req, res) => {
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id);
    res.json({ note });
};

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}