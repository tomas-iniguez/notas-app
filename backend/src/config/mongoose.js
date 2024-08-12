import mongoose from 'mongoose';

const conectMongoDB = async () => {
    try {   
    mongoose.connect(process.env.MONGOBD_URI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default conectMongoDB;  
