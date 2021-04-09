import {Router} from 'express';
import {addUser, getUser, mongodbClient} from '../../services/mongodb';
import {MongoError} from 'mongodb';
import * as users from '../../data/sast/users.json';

export const router = Router()

router.route('/user')
    .get((req, res) => {
        const username = req.query.username as string;
        const client = mongodbClient();
        client.connect((err: MongoError) => {
            if (err) {
                console.error('Failed to connect to mongodb.', err);
                res.json({'error': 'Failed to connect to mongodb.'});
                return;
            }
            console.log('Connected to mongodb');
            const db = client.db(process.env.MONGO_INITDB_DATABASE);

            getUser(db, username, (cards: any[]) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.json({'users': cards})
            });
        });
    })
    .post((req, res) => {
        const client = mongodbClient();
        client.connect((err: MongoError) => {
            if (err) {
                console.log('Failed to connect to mongodb.');
                res.json({'error': 'Failed to connect to mongodb.'});
                return;
            }
            console.log('Connected to mongodb');
            const db = client.db(process.env.MONGO_INITDB_DATABASE);
            console.log(users);

            addUser(db, users, (result: any) => {
                res.json({'message': `Successfully inserted ${result.result.n} documents.`});
            });
        });
    });
