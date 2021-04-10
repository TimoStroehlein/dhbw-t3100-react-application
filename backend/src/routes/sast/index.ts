import {Router} from 'express';
import {addUser, getUser, getUser2, mongoDb} from '../../services/mongodb';
import * as users from '../../data/sast/users.json';
import {Users} from '../../models/user';

export const router = Router()

router.route('/user')
    .get((req, res) => {
        const username = req.query.username as string;
        const password = req.query.password as string;
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                getUser(db, username, password, (cards: any[]) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({'users': cards})
                });
            }
        });
    })
    .post((req, res) => {
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                addUser(db, users as Users, (result: any) => {
                    res.json({'message': `Successfully inserted ${result.result.n} documents.`});
                });
            }
        });
    });

router.route('/user2')
    .get((req, res) => {
        const username = req.query.username as string;
        const password = req.query.password as string;
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                getUser2(db, username, password, (cards: any[]) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({'users': cards})
                });
            }
        });
    })
