const Weather = require('../models/Weather');
const User = require('../models/User');
const reqest = require('request');


const createWeather = async (req, res) => {
    try {
        const data = await requestApi(req.body.city)
        const myData = JSON.parse(data)
        const newWeather = new Weather({
            name: myData.name,
            main: myData.main,
            speed: myData.wind.speed,
            userId: req.params.userId,
        })
        try {
            await newWeather.save();
            await User.findByIdAndUpdate(req.params.userId, { $push: { weathers: newWeather._id } })
            console.log('save weather');
        }
        catch (err) {
            console.log(err.message);
        }
        res.status(200).json({ newWeather: newWeather });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const requestApi = (city) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8e6dd91d9ad7646c50b1d050fe5aeba9`
        }
        reqest(options, (err, res, body) => {
            if (err)
                reject(err)
            else
                resolve(body);
        })
    })
}


module.exports = {
    createWeather
}