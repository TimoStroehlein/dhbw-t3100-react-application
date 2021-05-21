import {Router} from 'express';
import { Recommendation, Recommendations } from '../../models/recommendation';
import { Session } from '../../models/session';
import { User } from '../../models/user';
import { 
    mongoDb, 
    addRecommendation, 
    getRecommendations, 
    getSession,
    setSession,
    unsetSession,
    checkUser,
    changePassword 
} from '../../services/mongodb';

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

router.route('/session')
    .get((req, res) => {
        const session = {
            username: req.query.username,
            sessionId: req.query.sessionId
        } as Session;
        console.log(session)
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                getSession(db, session, (session: Session) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json(session)
                });
            }
        });
    })
    .put((req, res) => {
        mongoDb((db, err) => {
            const session = {
                username: req.body.data.username,
                sessionId: req.body.data.sessionId

            } as Session;
            if (err) {
                res.json(err);
            } else if (db) {
                setSession(db, session, (result: any) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({ 'success': result.result.ok == 1 ? true : false})
                });
            }
        });
    })
    .post((req, res) => {
        console.log(req.body)
        const sessionId = req.body.sessionId;
        console.log(sessionId)
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                unsetSession(db, sessionId as string, (result: any) => {
                    console.log(result)
                    res.json({'success': result.result.ok == 1 ? true : false });
                });
            }
        });
    });

router.route('/user')
    .get((req, res) => {
        const user = {
            username: req.query.username,
            password: req.query.password
        } as User;
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                checkUser(db, user, (result: User) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({ 'success': result ? true : false})
                });
            }
        });
    })
    .post((req, res) => {
        console.log(req.body)
        const userData = req.body;
        console.log(userData)
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                changePassword(db, userData as User, (result: any) => {
                    console.log(result)
                    res.json({'success': result.result.ok == 1 ? true : false });
                });
            }
        });
    });