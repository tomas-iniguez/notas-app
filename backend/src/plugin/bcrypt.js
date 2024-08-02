import bcryptjs from 'bcryptjs';

export const generarBcryptjs = (param) => {
    const salt = bcryptjs.genSaltSync();
    const data_bcryptjs = bcryptjs.hashSync(param, salt);

    return data_bcryptjs;
}

export const verificarBcryptjs = (param, param_compare) => {
    const valid_bcryptjs = bcryptjs.compareSync(param, param_compare);

    return valid_bcryptjs;
}