import {Router} from 'express';
import {addOrder, getOrder, getOrder2, mongoDb} from '../../services/mongodb';
import * as orders from '../../data/sast/orders.json';
import {Order, Orders} from '../../models/order';

export const router = Router()

router.route('/orders')
    .get((req, res) => {
        const username = req.query.username as string;
        const orderNumber = req.query.orderNumber as string;
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                getOrder(db, username, orderNumber, (orders: any[]) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({'orders': orders})
                });
            }
        });
    })
    .post((req, res) => {
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                addOrder(db, orders as Orders, (result: any) => {
                    res.json({'message': `Successfully inserted ${result.result.n} documents.`});
                });
            }
        });
    });

router.route('/orders2')
    .get((req, res) => {
        const username = req.query.username as string;
        const orderNumber = req.query.orderNumber as string;
        mongoDb((db, err) => {
            if (err) {
                res.json(err);
            } else if (db) {
                getOrder2(db, username, orderNumber, (orders: Order[]) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({'orders': orders})
                });
            }
        });
    })
