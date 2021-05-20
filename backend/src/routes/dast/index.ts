import {Router} from 'express';
import { Recommendation, Recommendations } from '../../models/recommendation';
import { mongoDb, addRecommendation, getRecommendations } from '../../services/mongodb';

export const router = Router()

router.route('/recommendations')
    .get((req, res) => {
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                getRecommendations(db, (recommendations: any[]) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({recommendations})
                });
            }
        });
    })
    .post((req, res) => {
        console.log(req.body)
        const recommendation = req.body;
        console.log(recommendation)
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                addRecommendation(db, recommendation as Recommendation, (result: any) => {
                    res.json({'message': `Successfully inserted one recommendation.`});
                });
            }
        });
    });
