import Note from "../models/notes.js";

const saveService = async (body) => {
    const newNote = new Note(body);
    await newNote.save();
}

const findByIdService = async (noteId) => {
    const note = await Note.findById(noteId);
    return note;
}

const updateService = async (noteId, body) => {
    const filter = { '_id': noteId };
    const update = { $set: body };

    await Note.updateOne(filter, update);
}


 const deleteService = async (noteId) => {
    await Note.deleteOne({ '_id': noteId });;
}

const findAllService = async (userId, attributes= [], sort) => {
    const notes = Note.find({ userId }).select(attributes).sort(sort);
    return notes;
}

const noteServices = {
    saveService,
    findByIdService,
    updateService,
    deleteService,
    findAllService,
};

export default noteServices;