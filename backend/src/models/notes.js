
import { Schema, model } from 'mongoose';

const NoteSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export default model('Note', NoteSchema);