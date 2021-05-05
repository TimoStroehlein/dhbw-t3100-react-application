import {Button, Col, Container, Content, FlexboxGrid, Header, Input} from 'rsuite';
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
                <FlexboxGrid>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                        <h2>
                            SAST - Path Traversal
                        </h2>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={14} className="cwe-col">
                        <h3>
                            <a href="https://cwe.mitre.org/data/definitions/22.html"
                               target="_blank">CWE-22</a> (Rank 12)&nbsp;
                            <a href="https://capec.mitre.org/data/definitions/126.html"
                               target="_blank">CAPEC-126</a>
                        </h3>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Header>
            <Content>
                <hr/>
                <div className="content-grid">
                    <h4>Data</h4>
                    <p><b>Order ID:</b> f2e71bcb-152e-4a23-ab72-6d7f6022ed60</p>
                </div>
                <hr/>
                <FlexboxGrid justify="center" className="content-grid">
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={12} sm={24}>
                        <h3>Download Order PDF</h3>
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
