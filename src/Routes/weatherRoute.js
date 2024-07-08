const express=require("express")
const {getCurrentWeather,getWeatherForecast,getHistoricalWeather,getFavoriteCities,addFavoriteCity}=require('../Controllers/weatherController')
const AuthenticationToken=require('../middlewares/authMiddlewares')


const router=express.Router()

// weather Route

router.get('/current',AuthenticationToken,getCurrentWeather)
router.get('/forecast',AuthenticationToken,getWeatherForecast)
router.get('/historical',AuthenticationToken,getHistoricalWeather)
router.post('/favorites ',AuthenticationToken,addFavoriteCity)
router.get('/favorites ',AuthenticationToken,getFavoriteCities)

module.exports=router