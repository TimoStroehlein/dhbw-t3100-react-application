import {Db, DeleteWriteOpResultObject, InsertOneWriteOpResult, InsertWriteOpResult, MongoClient, MongoError, UpdateWriteOpResult} from 'mongodb';
import {Order, Orders} from '../models/order';
import { Recommendation, Recommendations } from '../models/recommendation';
import { Session } from '../models/session';
import { User } from '../models/user';
import { comparePassword, hashPassword } from './security';

export const mongoClient = (): MongoClient => {
    const isset = process.env.MONGO_INITDB_USERNAME && process.env.MONGO_INITDB_PASSWORD;
    const DB_URI = `mongodb://${isset ? (process.env.MONGO_INITDB_USERNAME + ':' + process.env.MONGO_INITDB_PASSWORD + '@') : ''}${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`;
    return new MongoClient(DB_URI, { useUnifiedTopology: true });
}

export const mongoDb = (callback: (db?: Db, err?: {error: string}) => void): void => {
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

export const getOrder = (db: Db, username: string, orderNumber: string, callback: (orders: Order[]) => void): void => {
    const collection = db.collection('orders');
    // username = '"a"; sleep(5000)';
    // { '$where': 'this.username == "a"; sleep(5000)' }
    const query = {$where: `this.username == '${username}' && this.orderNumber == '${orderNumber}'`};
    console.log(query);
    collection.find(query).toArray((err, orders) => {
        if (err) {
            console.log('An error occurred.\n', err);
        }
        callback(orders);
    });
}

export const getOrder2 = (db: Db, username: string, password: string, callback: (orders: Order[]) => void): void => {
    const collection = db.collection('orders');
    const query = {username: username, password: password};
    console.log(query);
    collection.find(query).toArray((err, orders) => {
        if (err) {
            console.log('An error occurred.\n', err);
        }
        callback(orders);
    });
}

export const addOrder = (db: Db, orders: Orders, callback: (result: InsertWriteOpResult<any>) => void): void => {
    const collection = db.collection('orders');
    collection.deleteMany({}, (err, result) => {
        if (err) {
            console.error('An error occurred.\n', err);
            return;
        }
        console.log(`Successfully removed ${result.result.n} documents.`);
    });
    collection.insertMany(orders.orders, (err, result) => {
        if (err) {
            console.error('An error occurred.\n', err);
        }
        callback(result);
    });
}

// Adds a recommendation string to the DB
export const addRecommendation = (db: Db, data: Recommendation, callback: (result: InsertWriteOpResult<any>) => void): void => {
    const collection = db.collection('recommendations');
    collection.insertOne(data, (err: any, result: any) => {
        if (err) {
            console.error('An error occurred.\n', err);
        }
        callback(result);
    });
}

// Reads all recommendations as string array from DB
export const getRecommendations = (db: Db, callback: (recommendations: Recommendation[]) => void): void => {
    const collection = db.collection('recommendations');
    collection.find().toArray((err, recommenations) => {
        if (err) {
            console.log('An error occurred.\n', err);
        }
        callback(recommenations);
    });
}

export const getSession = (db: Db, session: Session, callback: (session: Session) => void): void => {
    const collection = db.collection('users');
    const query = { sessionId: session.sessionId };
    collection.findOne(query, (error: any, session: any) => {
        if (error) {
            console.log('An error occurred.\n', error);
        }
        callback(session);
    });
}

export const setSession = (db: Db, session: Session, callback: (result: UpdateWriteOpResult) => void): void => {
    const collection = db.collection('users');
    const query = { username: session.username };
    const newValue = { $set: { sessionId: session.sessionId }};
    collection.updateOne(query, newValue, (error: any, result: any) => {
        if (error) {
            console.log('An error occurred.\n', error);
        }
        callback(result);
    });
}

export const unsetSession = (db: Db, sessionId: string, callback: (result: DeleteWriteOpResultObject) => void): void => {
    const collection = db.collection('users');
    const query = {sessionId: sessionId};
    collection.deleteOne(query, (err, result) => {
        if (err) {
            console.log('An error occurred.\n', err);
        }
        callback(result);
    });
}

export const checkUser = (db: Db, user: User, callback: (result: boolean) => void): void => {
    const collection = db.collection('users');
    const query = { username: user.username };
    console.log(query)
    collection.findOne(query, (error: any, foundUser: any) => {
        if (error) {
            console.log('An error occurred.\n', error);
        }
        if(!foundUser) return false;
        const result = comparePassword(user.password, foundUser.password)
        console.log(result)
        callback(result);
    });
}


// Changes a password of a given user
export const changePassword = (db: Db, userData: any, callback: (result: UpdateWriteOpResult) => void): void => {
    const collection = db.collection('users');
    const query = { username: userData.data.username, sessionId: userData.data.sessionId };
    const newValue = { $set: { password: hashPassword(userData.data.newPassword) }}
    collection.updateOne(query, newValue, (err, result) => {
        if (err) {
            console.log('An error occurred.\n', err);
        }
        callback(result);
    });
}