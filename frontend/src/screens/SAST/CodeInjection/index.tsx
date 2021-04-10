import {Container, FlexboxGrid, Content, Header, Row, Col, Input, Button} from 'rsuite';
import React from 'react';
import './styles.scss';

export const SASTCodeInjection = (): JSX.Element => {
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
                <FlexboxGrid justify="center" className="content-grid">
                    <FlexboxGrid.Item colspan={8}>
                        <h3>Orders</h3>
                        <Input placeholder="Username" className="input"/>
                        <Input placeholder="Password" className="input"/>
                        <Button appearance="primary" className="button">Submit</Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    );
}
