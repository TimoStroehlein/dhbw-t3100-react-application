import {Db, InsertWriteOpResult, MongoClient, MongoError} from 'mongodb';
import {Order, Orders} from '../models/order';

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
    collection.deleteMany({}, (err) => {
        if (err) {
            console.error('An error occurred.\n', err);
            return;
        }

        collection.insertMany(orders.orders, (err, result) => {
            if (err) {
                console.error('An error occurred.\n', err);
            }
            console.log(`Successfully inserted ${result.result.n} documents.`);
            callback(result);
        });
    });
}
