import User from  '../models/users.js';

const saveService = async (body) => {
    const newUser = new User(body);
    await newUser.save();
}

const findByIdService = async (userId) => {
    const user = await User.findById(userId);
    return user;
}

const updateService = async (userId, body) => {
    const filter = { '_id': userId };
    const update = { $set: body };

    await User.updateOne(filter, update);
}


 const deleteService = async (userId) => {
    await User.deleteOne({ '_id': userId });;
}


 const findUserEmailService = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

const userServices = {
    saveService,
    findByIdService,
    updateService,
    deleteService,
    findUserEmailService,
};

 export default userServices;