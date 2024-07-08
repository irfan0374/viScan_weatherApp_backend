const axios = require('axios')


// .env 
const { WEATHER_API_URL, WEATHER_API_KEY,HISTORICAL_API_URL } = process.env;
const GEOCODING_API_URL = process.env.GEOCODING_API_URL



const getPastDates = (days) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(Math.floor(date.getTime() / 1000));
    }
    return dates;
  };

//  get latitude and longitude from city name
const getCoordinate = async (city) => {
    const response = await axios.get(GEOCODING_API_URL, {
        params: {
            q: city,
            limit: 1,
            appid: WEATHER_API_KEY
        },
    })

    const { lat, lon } = response.data[0];

    return { lat, lon };
}

const getCurrentWeather = async (req, res) => {
    const { city } = req.query;

    try {
        const { lat, lon } = await getCoordinate(city)
      
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                lat,
                lon,
                exclude: 'minutely,hourly,daily,alerts',
                appid: WEATHER_API_KEY,
            }
        });
       
        res.status(200).json({ city, currentWeather: response?.data?.current });
    } catch (error) {
        res.status(400).json({ error: 'Currently Not Available' });
    }
}

// get weather forecast
const getWeatherForecast = async (req, res) => {
    const { city } = req.query;
    
    try {
        const { lat, lon } = await getCoordinate(city);
        
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                lat,
                lon,
                exclude: 'minutely,hourly,current,alerts',
                appid: WEATHER_API_KEY,
            },
        });
        res.json(response.data.daily);
    } catch (err) {
        res.status(400).json({ error: 'Failed to fetch weather forecast' });
    }
};

// Get Historical Weather Data

const getHistoricalWeather = async (req, res) => {
    const { city } = req.query;
    const timestamps = getPastDates(7);
    const historicalData = [];
    try {
        const { lat, lon } = await getCoordinate(city);


        for (const timestamp of timestamps) {
            try {
              const response = await axios.get(HISTORICAL_API_URL, {
                params: {
                  lat: lat,
                  lon: lon,
                  dt: timestamp,
                  appid:WEATHER_API_KEY ,
                },
              });
              historicalData.push(response.data);
            } catch (error) {
              console.error('Error fetching historical data:', error);
            }
          }

        const historicalData = await Promise.all(historicalDataPromises);
        const data = historicalData.map(response => response.data);
        res.json(data);

    } catch (err) {
        res.status(400).json({ error: 'Failed to fetch historical weather data' });
    }
  return historicalData;
};

// Get current weather data for a city

const CurrentWeather = async (city) => {
    const response = await axios.get(WEATHER_API_URL, {
        params: {
            q: city,
            appid: WEATHER_API_KEY,
        },
    });
    return response.data;
};

// Add city to the user's favorite

const addFavoriteCity = async (req, res) => {
    const { value } = req.body;
    const userId = req.user.id;

    try {
        // Check if city already exists

        const existingCity = await prisma.city.findFirst({
            where: {
                name: city,
                userId,
            },
        });

        if (existingCity) {
            return res.status(400).json({ error: 'City is already in your favorites' });
        }
        //   not exists add city

        const favorite = await prisma.city.create({
            data: {
                name: city,
                userId,
            },
        });
        res.json(favorite);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add city to favorites' });
    }
};

//Fetch the user's favorite cities


const getFavoriteCities = async (req, res) => {
    const userId = req.user.id;

    try {
        const favoriteCities = await prisma.city.findMany({
            where: { userId },
        });

        const weatherDataPromises = favoriteCities.map(async (city) => {
            const weatherData = await CurrentWeather(city.name);
            return { city: city.name, weather: weatherData };
        });

        const favoriteCitiesWeather = await Promise.all(weatherDataPromises);

        res.json(favoriteCitiesWeather);
    } catch (err) {
        res.status(400).json({ error: 'Failed to fetch favorite cities' });
    }
};



module.exports = { getCurrentWeather, getWeatherForecast, getHistoricalWeather, getFavoriteCities, addFavoriteCity }