import { Router } from 'express';
import { check, param } from 'express-validator';

//middlewares
import { validarCampos } from '../middlewares/validationResult.js';
import { validarJWT } from '../middlewares/jwt.js';

//controllers
import { saveNotes, findNotes, updateNotes, deleteNotes } from '../controllers/notes.controllers.js';



const router_notes = Router();

router_notes.post('/', [
        validarJWT,
        check('title').notEmpty().withMessage('Title is required'),
        check('content').notEmpty().withMessage('Content is required'),
    ],
    validarCampos,
    saveNotes
);

router_notes.get('/', [validarJWT], findNotes);

router_notes.put('/:noteId?', [
        validarJWT,
        param('noteId').notEmpty().withMessage('noteId is required').isMongoId().withMessage('Invalid MongoDB ID'),
        check('title').notEmpty().withMessage('Title is required'),
        check('content').notEmpty().withMessage('Content is required'),
    ],
    validarCampos, 
    updateNotes
);

router_notes.delete('/:noteId?', [
        validarJWT,
        param('noteId').notEmpty().withMessage('noteId is required').isMongoId().withMessage('Invalid MongoDB ID'),
    ],
    validarCampos,
    deleteNotes
);

export default router_notes;
