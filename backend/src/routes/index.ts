import {Router} from 'express';
import {router as sastRouter} from './sast';

export const router = Router()

router.use('/sast', sastRouter)

router.route('/')
    .get((req, res) => {
        res.send('Hello World!');
    });
