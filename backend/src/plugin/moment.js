import moment from 'moment';

export const obtenerMoment = (date) => {
    return moment(date).format("DD-MM-YYYY");
}