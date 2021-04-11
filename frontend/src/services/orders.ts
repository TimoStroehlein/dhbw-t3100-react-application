import axios from 'axios';
import {Order} from '../models/order.type';

export const getOrders = async (username: string, orderNumber: string): Promise<Array<Order>> => {
    const response = await axios.get('http://localhost:8090/rest/api/v1/sast/orders', {
        params: {
            username: username,
            orderNumber: orderNumber
        }
    });
    console.log('Testtt');
    console.log(response);
    return response.data['orders'];
}
