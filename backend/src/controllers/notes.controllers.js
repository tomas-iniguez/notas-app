//models
import Note from "../models/notes.js";

export const saveNotes = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newNote = new Note({
            title,
            content
        });
        
        const savedNote = await newNote.save();

       res.status(200).json({
            estado: true,
           msg: `Se guardo la nota`,
           savedNote,
       }); 
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}