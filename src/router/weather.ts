import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('weather');
})

export const WEATHER_PAGE = router;