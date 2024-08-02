//models
import Note from "../models/notes.js";

export const saveNotes = async (req, res) => {
    try {
        const newNote = new Note({ ...req.body });
        await newNote.save();

       res.status(200).json({
            estado: true,
           msg: `Se guardo la nota`,
       }); 
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const findNotes = async (req, res) => {
    try {
        const notes = await Note.find().select(['_id', 'title', 'content', 'date']).sort({ date: -1 });
        
        const formattedNotes = notes.map(note => ({
            ...note._doc,
            date: note.date.toLocaleDateString(),
        }));

        res.status(200).json({
            estado: true,
            notes: formattedNotes,
        });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateNotes = async (req, res) => {
    try {
        const { noteId } = req.params;

        const note = await Note.findById(noteId);
        if(!note) {
            return  res.status(404).json({ message: 'Nota no encontrada' });
        }

        const filter = { '_id': noteId };
        const update = { $set: { ...req.body } };

        await Note.updateOne(filter, update);
        
        res.status(200).json({
            estado: true,
            msg: `Se actualizo la nota`,
        });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const { noteId } = req.params;

        const note = await Note.findById(noteId);
        if(!note) {
            return  res.status(404).json({ message: 'Nota no encontrada' });
        }

        await Note.deleteOne({ '_id': noteId });
        
        res.status(200).json({
            estado: true,
            msg: `Se elimino la nota`,
        });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}