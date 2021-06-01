import {Container, FlexboxGrid, Content, Header, Col, Input, Button, List, Notification} from 'rsuite';
import React, {useState} from 'react';
import './styles.scss';
import {postOrders, getOrders} from '../../../services/orders';
import {Order} from '../../../models/order.type';

export const SASTCodeInjection = (): JSX.Element => {
    const [username, setUsername] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [orders, setOrders] = useState(Array<Order>());

    const addOrders = async () => {
        await postOrders();
        Notification['success']({
            title: 'Success',
            description: 'Data successfully added to the database.'
        });
    }

    const fetchOrders = async () => {
        const orders = await getOrders(username, orderNumber)
        setOrders(orders);
    }

    return (
        <Container>
            <Header>
                <FlexboxGrid>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                        <h2>
                            SAST - Code Injection
                        </h2>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={14} className="cwe-col">
                        <h3>
                            <a href="https://cwe.mitre.org/data/definitions/94.html"
                               target="_blank">CWE-94</a> (Rank 17)&nbsp;
                            <a href="https://capec.mitre.org/data/definitions/242.html"
                               target="_blank">CAPEC-242</a>
                        </h3>
                        <h3>
                            <a href="https://cwe.mitre.org/data/definitions/89.html"
                               target="_blank">CWE-89</a> (Rank 6)&nbsp;
                            <a href="https://capec.mitre.org/data/definitions/66.html"
                               target="_blank">CAPEC-66</a>
                        </h3>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Header>
            <Content>
                <hr/>
                <div className="content-grid">
                    <h4>Data</h4>
                    <p><b>Username:</b> admin</p>
                    <p><b>Order Number:</b> kldjkdfjkdf</p>
                    <Button appearance="primary"
                            className="button"
                            onClick={() => addOrders()}>
                        Add predefined Data
                    </Button>
                </div>
                <hr/>
                <FlexboxGrid justify="center" className="content-grid">
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={12} sm={24}>
                        <h3>Orders</h3>
                        <Input placeholder="Username"
                               className="input"
                               onChange={(value) => setUsername(value)}/>
                        <Input placeholder="Order Number"
                               className="input"
                               onChange={(value) => setOrderNumber(value)}/>
                        <Button appearance="primary"
                                className="button"
                                onClick={() => fetchOrders()}>
                            Submit
                        </Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <hr/>
                <List>
                    <List.Item>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={4}>
                                <b>Username</b>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={4}>
                                <b>Order Number</b>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={4}>
                                <b>Super Secret</b>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </List.Item>
                    {orders.map((order) => (
                        <List.Item>
                            <FlexboxGrid justify="center">
                                <FlexboxGrid.Item colspan={4}>
                                    {order.username}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={4}>
                                    {order.orderNumber}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={4}>
                                    {order.superSecret}
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                    ))}
                </List>
            </Content>
        </Container>
    );
}
