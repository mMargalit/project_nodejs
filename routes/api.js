const router = require('express').Router();
const user = require('../controllers/userController');
const weather = require('../controllers/weatherController');
const admin = require('../controllers/adminController');

router.post('/signUp/:adminId', user.createUser);
router.post('/addWeather/:userId', weather.createWeather);
router.get('/myWeathers/:userId', user.searchAllWeathers);
router.delete('/deleteWeather', user.deleteWeather);
router.post('/deleteUser', admin.deleteUser);
router.post('/createAdmin', admin.createAdmin);
router.get('/myUsers/:adminId', admin.searchAllUsers);

module.exports = router;