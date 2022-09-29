import express from 'express';
import { MailAPI } from './airmail';
import { userAPI } from './user';
import { WEATHER_API } from './weather';

const router = express.Router();

router.use('/weather', WEATHER_API);
router.use('/airmail', MailAPI);
router.use('/user', userAPI);

export const APIs = router;