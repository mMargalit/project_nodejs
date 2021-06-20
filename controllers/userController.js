const User = require('../models/User');
const env = require('dotenv');
env.config();
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const Weather = require('../models/Weather');
const Admin = require('../models/Admin');


const createUser = async (req, res) => {
    let newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    try {
        await newUser.save();
        await Admin.findByIdAndUpdate(req.params.adminId, { $push: { users: newUser._id } })
        await sendMail(req.body.email, req.body.name);
        const token = await jwt.sign({
            name: req.body.name,
            password: req.body.password
        }, process.env.SECRET);
        res.cookie('jwt', token);
        res.status(200).json({ message: 'success', newUser: newUser });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const searchAllWeathers = async (req, res) => {
    try {
        const token = await checkPermission(req.headers['authorization'])
        console.log(token);
        const id = req.params.userId;
        User.findById(id).populate({ path: 'weathers', select: 'name main.temp' })
            .then(currentUser => {
                res.status(200).json({ currentUser: currentUser })
            })
            .catch(err => {
                res.send(err.message)
            })
    } catch (err) {
        res.send(err.message);
    }
}

const deleteWeather = async (req, res) => {
    const id = req.body.id;
    try {
        const token = await checkPermission(req.headers['authorization'])
        console.log(token);
        const myWeather = await Weather.findById(id);
        await User.findByIdAndUpdate(myWeather.userId, { $pull: { weathers: myWeather._id } })
        await Weather.findByIdAndDelete(id);
        res.status(200).json({ menubar: 'success' })
    }
    catch (err) {
        res.status(400).send(err.message)
    }

}

const checkPermission = (myJwt) => {
    return new Promise((resolve, reject) => {
        let token = jwt.verify(myJwt, process.env.SECRET)
        if (!token)
            reject('err')
        else
            resolve(token);
    })
}


module.exports = {
    createUser,
    searchAllWeathers,
    deleteWeather

}