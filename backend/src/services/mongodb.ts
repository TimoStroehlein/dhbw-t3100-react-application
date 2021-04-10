import {Db, InsertWriteOpResult, MongoClient} from 'mongodb';
import {User, Users} from '../models/user.types';

// Setup MongoDB
export const mongodbClient = (): MongoClient => {
    const isset = process.env.MONGO_INITDB_USERNAME && process.env.MONGO_INITDB_PASSWORD;
    const DB_URI = `mongodb://${isset ? (process.env.MONGO_INITDB_USERNAME + ':' + process.env.MONGO_INITDB_PASSWORD + '@') : ''}${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`;
    return new MongoClient(DB_URI, { useUnifiedTopology: true });
}

export const getUser = (db: Db, username: string, callback: (cards: User[]) => void): void => {
    const collection = db.collection('users');
    collection.find({$where: `this.username == '${username}'`}).toArray((err, users) => {
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
            console.log('An error occurred.\n', err);
            return;
        }
        console.log(`Successfully removed ${result.result.n} documents.`);
    });
    collection.insertMany(users.users, (err, result) => {
        if (err) {
            console.log('An error occurred.\n', err);
        }
        callback(result);
    });
}
