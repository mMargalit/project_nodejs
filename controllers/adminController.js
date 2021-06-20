const Admin = require('../models/Admin');
const User = require('../models/User');
const Weather = require('../models/Weather');

const createAdmin = async (req, res) => {
    const admin = new Admin(req.body)
    try {
        await admin.save();
        res.status(200).send(admin)
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const deleteUser = (req, res) => {
    const id = req.body.user;
    User.findById(id)
        .then(thisUser => {
            Weather.deleteMany({ _id: { $in: thisUser.weathers } })
                .then(() => {
                    const currentUser = User.findByIdAndDelete(id)
                        .then(() => {
                            Admin.findByIdAndUpdate(currentUser.adminId, { $pull: { users: currentUser._id } })
                                .then(() => { res.send('ok') })
                                .catch(err => { res.send(err.message) })
                        })
                })
                .catch((err) => { res.send(err.message) })
        })
        .catch(err => { res.send(err.message) })
}

const searchAllUsers = (req, res) => {
    const id = req.params.adminId;
    Admin.findById(id).populate({ path: 'users', select: 'name weathers' })
        .then(currentAdmin => {
            res.status(200).json({ currentAdmin: currentAdmin })
        })
        .catch(err => {
            res.send(err.message)
        })
}

module.exports = {
    createAdmin,
    deleteUser,
    searchAllUsers
}
