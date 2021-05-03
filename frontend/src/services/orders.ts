import axios from 'axios';
import {Order} from '../models/order.type';

export const postOrders = async (): Promise<void> => {
    await axios.post('http://localhost:8090/rest/api/v1/sast/orders');
}

export const getOrders = async (username: string, orderNumber: string): Promise<Array<Order>> => {
    const response = await axios.get('http://localhost:8090/rest/api/v1/sast/orders', {
        params: {
            username: username,
            orderNumber: orderNumber
        }
    });
    console.log(response);
    return response.data['orders'];
}

export const getOrderPdf = async (pdfName: string): Promise<any> => {
    const response = await axios.get('http://localhost:8090/rest/api/v1/sast/order', {
        responseType: 'blob',
        params: {
            pdfName: `${pdfName}`
        }
    });
    console.log(response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${pdfName}`);
    document.body.appendChild(link);
    link.click();
}
