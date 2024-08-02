import { Router } from 'express';
import { check, param } from 'express-validator';

//middlewares
import { validarCampos } from '../middlewares/validationResult.js';

//controllers
import { saveNotes, findNotes, updateNotes, deleteNotes } from '../controllers/notes.controllers.js';


const router_notes = Router();

router_notes.post('/save', [
        check('title').notEmpty().withMessage('Title is required'),
        check('content').notEmpty().withMessage('Content is required'),
    ],
    validarCampos,
    saveNotes
);

router_notes.get('/all', [], findNotes);

router_notes.put('/update/:noteId?', [
        param('noteId').notEmpty().withMessage('noteId is required'),
        param('noteId').isMongoId().withMessage('Invalid MongoDB ID'),

        check('title').notEmpty().withMessage('Title is required'),
        check('content').notEmpty().withMessage('Content is required'),
    ],
    validarCampos, 
    updateNotes
);

router_notes.delete('/delete/:noteId?', [
        param('noteId').notEmpty().withMessage('noteId is required'),
        param('noteId').isMongoId().withMessage('Invalid MongoDB ID'),
    ],
    validarCampos,
    deleteNotes
);

export default router_notes;
