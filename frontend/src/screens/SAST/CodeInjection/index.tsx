import {Container, FlexboxGrid, Content, Header, Row, Col, Input, Button, List, Notification} from 'rsuite';
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
                <Row>
                    <Col xs={12}>
                        <h2>
                            SAST - Code Injection
                        </h2>
                    </Col>
                    <Col xs={4} xsPush={8}>
                        <Row>
                            <h3>
                                Rank 17 <a href="https://cwe.mitre.org/data/definitions/94.html"
                                           target="_blank"
                                           className="cwe-id">CWE-94</a>
                            </h3>
                        </Row>
                        <Row>
                            <h3>
                                Rank 6 <a href="https://cwe.mitre.org/data/definitions/89.html"
                                          target="_blank"
                                          className="cwe-id">CWE-89</a>
                            </h3>
                        </Row>
                    </Col>
                </Row>
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
                    <FlexboxGrid.Item colspan={8}>
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
                    {orders.map((order) => (
                        <List.Item>
                            <FlexboxGrid justify="center">
                                <FlexboxGrid.Item colspan={4}>
                                    {order.username}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={4}>
                                    {order.orderNumber}
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                    ))}
                </List>
            </Content>
        </Container>
    );
}
