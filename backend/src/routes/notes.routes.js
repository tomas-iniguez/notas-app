import { Router } from 'express';
import { check } from 'express-validator';

//middlewares
import { validarCampos } from '../middlewares/validationResult.js';

//controllers
import { saveNotes } from '../controllers/notes.controllers.js';


const router_notes = Router();

router_notes.post('/save', [
        check('title').notEmpty().withMessage('Title is required'),
        check('content').notEmpty().withMessage('Content is required'),
    ],
    validarCampos,
    saveNotes
);

export default router_notes;
