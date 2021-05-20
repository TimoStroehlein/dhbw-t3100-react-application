import {Router} from 'express';
import {router as sastRouter} from './sast';
import {router as dastRouter} from './dast';

export const router = Router()

router.use('/sast', sastRouter)
router.use('/dast', dastRouter)

router.route('/')
    .get((req, res) => {
        res.send('Hello World!');
    });
