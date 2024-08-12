//services
import userServices from '../services/users.services.js';
import noteServices from '../services/notes.services.js';

//plugin
import { obtenerMoment } from "../plugin/moment.js";



export const saveNotes = async (req, res) => {
    try {
        const { email } = req.decoded_token; 
        const body = req.body;

        const user = await userServices.findUserEmailService(email);
        if(!user) {
            return res.status(404).json({
                estado: false,
                msg: 'No esta registrado el email',
            });
        }

        body.userId = user._id;

        await noteServices.saveService(body);

       res.status(200).json({
            estado: true,
           msg: `Se guardo la nota`,
       }); 
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: error.message });
    }
}

export const findNotes = async (req, res) => {
    try {
        const { email } = req.decoded_token;
        const user = await userServices.findUserEmailService(email)
        if(!user) {
            return res.status(404).json({
                estado: false,
                msg: 'No esta registrado el email',
            });
        }

        const attributes = ['_id', 'title', 'content', 'date'];
        const sort = { date: -1 };
        const notes = await noteServices.findAllService(user._id, attributes, sort);
        
        const formattedNotes = notes.map(note => ({
            ...note._doc,
            date: (!note.date || note.date === undefined)? obtenerMoment(note.date) : obtenerMoment(new Date()),
        }));

        res.status(200).json({
            estado: true,
            notes: formattedNotes,
        });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: error.message });
    }
}

export const updateNotes = async (req, res) => {
    try {
        const { noteId } = req.params;
        const body = req.body;

        const note = await noteServices.findByIdService(noteId);
        if(!note) {
            return  res.status(404).json({
                estado: false,
                msg: `Nota no encontrada`,
            });
        }

        await noteServices.updateService(noteId, body);
        
        res.status(200).json({
            estado: true,
            msg: `Se actualizo la nota`,
        });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const { noteId } = req.params;

        const note = await noteServices.findByIdService(noteId);
        if(!note) {
            return  res.status(404).json({
                estado: false,
                msg: `Nota no encontrada`,
            });
        }

        await noteServices.deleteService(noteId);
        
        res.status(200).json({
            estado: true,
            msg: `Se elimino la nota`,
        });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: error.message });
    }
}