//models
import User from '../models/users.js';

//middlewares
import { generarJWT } from '../middlewares/jwt.js';

//plugin
import { generarBcryptjs, verificarBcryptjs } from '../plugin/bcrypt.js';

export const saveUser = async (req, res) => {
    try {
        const body = req.body;

        const user = await User.findOne({ email: body.email });
        if(user) {
            return  res.status(404).json({ 
                estado: false,
                msg: `Ya se encuentra registrado el email`,
             });
        }

        const password = generarBcryptjs(body.password);

        body.password = password;

        const newUser = new User(body);
        await newUser.save();

        res.status(200).json({
            estado: true,
           msg: `Se guardo el usuario`,
       });  
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                estado: false,
                msg: 'No esta registrado el email',
            });
        }

        const valid_bcryptjs = verificarBcryptjs(password, user.password);
        if(!valid_bcryptjs) {
            return res.status(404).json({
                estado: false,
                msg: 'La password es incorrecta',
            });
        }

        const uuidId = user._id;
        const name = user.name;
        
        const token = await generarJWT({uuidId, name, email});

        res.status(200).json({
            estado: true,
            'x-token': token,
        });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
}