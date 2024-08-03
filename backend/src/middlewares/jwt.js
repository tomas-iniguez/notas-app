import jwt  from 'jsonwebtoken';


export const generarJWT = (obj_token) => {
    return new Promise( (resolve, reject) => {
        jwt.sign({ data:obj_token }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 30 * 24 
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};


 export const validarJWT = (req, res, next) => {
  try {
    const  token = req.get('x-token');
    if (!token) {
        return  res.status(401).json({
           msg: 'No hay token en la petición',
           estado: false
        });
      }
     jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
        if (error) {
            return  res.status(401).json({
                msg: 'Token no válido',
                estado: false
            });
        }
        req.decoded_token = decoded.data;
        req.token = token;
        next();
     });
  } catch (error) {
    res.status(500).json({
        msg: error.message,
        valid: false,
        estado: false
    });
    
    console.log(error);
    next();
  }
};