import {Button, Col, Container, Content, FlexboxGrid, Header, Input, Row} from 'rsuite';
import React, {useState} from 'react';
import './styles.scss';
import {getOrderPdf} from '../../../services/orders';

export const SASTPathTraversal = (): JSX.Element => {
    const [orderPdf, setOrderPdf] = useState('');

    const downloadOrderPdf = async () => {
        await getOrderPdf(orderPdf);
    }

    return (
        <Container>
            <Header>
                <Row>
                    <Col xs={12}>
                        <h2>
                            SAST - Path Traversal
                        </h2>
                    </Col>
                    <Col xs={4} xsPush={8}>
                        <Row>
                            <h3>
                                Rank 12 <a href="https://cwe.mitre.org/data/definitions/22.html"
                                          target="_blank"
                                          className="cwe-id">CWE-22</a>
                            </h3>
                        </Row>
                    </Col>
                </Row>
            </Header>
            <Content>
                <hr/>
                <div className="content-grid">
                    <h4>Data</h4>
                    <p><b>Order ID:</b> f2e71bcb-152e-4a23-ab72-6d7f6022ed60</p>
                </div>
                <hr/>
                <FlexboxGrid justify="center" className="content-grid">
                    <FlexboxGrid.Item colspan={8}>
                        <h3>Order PDF Download</h3>
                        <Input placeholder="Order ID"
                               className="input"
                               onChange={(value) => setOrderPdf(value)}/>
                        <Button appearance="primary"
                                className="button"
                                onClick={() => downloadOrderPdf()}>
                            Download PDF
                        </Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    );
}
