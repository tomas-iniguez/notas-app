import { Router } from 'express';
import { check, param } from 'express-validator';

//middlewares
import { validarCampos } from '../middlewares/validationResult.js';


// controllers
import { saveUser, authUser } from '../controllers/users.controllers.js';

const router_users = Router();

router_users.post('/', [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
        check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    validarCampos, 
    saveUser
);

router_users.post('/auth', [
        check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
        check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    validarCampos,
    authUser
);

export default router_users;
