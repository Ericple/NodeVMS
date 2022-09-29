import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
})

export const HOME_PAGE = router;