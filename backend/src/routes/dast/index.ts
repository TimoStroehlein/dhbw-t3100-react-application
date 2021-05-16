import {Router} from 'express';
import { mongoDb, addRecommendation, getRecommendations } from '../../services/mongodb';

export const router = Router()

router.route('/recommenations')
    .get((req, res) => {
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                getRecommendations(db, (recommendations: string[]) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({'recommendations': recommendations})
                });
            }
        });
    })
    .post((req, res) => {
        const recommendation = req.body.recommendation;
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                addRecommendation(db, recommendation as string, (result: any) => {
                    res.json({'message': `Successfully inserted one recommendation.`});
                });
            }
        });
    });
