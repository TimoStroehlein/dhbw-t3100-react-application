import {Db, InsertWriteOpResult, MongoClient, MongoError} from 'mongodb';
import {User, Users} from '../models/user.types';
import * as jsonUsers from '../data/sast/users.json';

export const mongoClient = (): MongoClient => {
    const isset = process.env.MONGO_INITDB_USERNAME && process.env.MONGO_INITDB_PASSWORD;
    const DB_URI = `mongodb://${isset ? (process.env.MONGO_INITDB_USERNAME + ':' + process.env.MONGO_INITDB_PASSWORD + '@') : ''}${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`;
    return new MongoClient(DB_URI, { useUnifiedTopology: true });
}

export const mongoDb = (callback: (db?: Db, err?: {'error': string}) => void): void => {
    const client = mongoClient();
    client.connect((err: MongoError) => {
        if (err) {
            console.log('Failed to connect to mongodb.');
            callback(undefined,{'error': 'Failed to connect to mongodb.'})
        }
        console.log('Connected to mongodb');
        callback(client.db(process.env.MONGO_INITDB_DATABASE))
    });
}

export const getUser = (db: Db, username: string, password: string, callback: (cards: User[]) => void): void => {
    const collection = db.collection('users');
    // username = '"a"; sleep(5000)';
    // { '$where': 'this.username == "a"; sleep(5000)' }
    const query = {$where: `this.username == '${username}' && this.password == '${password}'`};
    console.log(query);
    collection.find(query).toArray((err, users) => {
        if (err) {
            console.log('An error occurred.\n', err);
        }
        callback(users);
    });
}

export const getUser2 = (db: Db, username: string, password: string, callback: (cards: User[]) => void): void => {
    const collection = db.collection('users');
    const query = {username: username, password: password};
    console.log(query);
    collection.find(query).toArray((err, users) => {
        if (err) {
            console.log('An error occurred.\n', err);
        }
        callback(users);
    });
}

export const addUser = (db: Db, users: Users, callback: (result: InsertWriteOpResult<any>) => void): void => {
    const collection = db.collection('users');
    collection.deleteMany({}, (err, result) => {
        if (err) {
            console.error('An error occurred.\n', err);
            return;
        }
        console.log(`Successfully removed ${result.result.n} documents.`);
    });
    collection.insertMany(jsonUsers.users, (err, result) => {
        if (err) {
            console.error('An error occurred.\n', err);
        }
        callback(result);
    });
}
