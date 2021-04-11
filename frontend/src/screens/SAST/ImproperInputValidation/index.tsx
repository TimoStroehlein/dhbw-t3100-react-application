import {Col, Container, Content, Header, Row} from 'rsuite';
import React from 'react';
import './styles.scss';

export const SASTImproperInputValidation = (): JSX.Element => {
    return (
        <Container>
            <Header>
                <Row>
                    <Col xs={12}>
                        <h2>
                            SAST - Improper Input Validation
                        </h2>
                    </Col>
                    <Col xs={4} xsPush={8}>
                        <Row>
                            <h3>
                                Rank 3 <a href="https://cwe.mitre.org/data/definitions/20.html"
                                           target="_blank"
                                           className="cwe-id">CWE-20</a>
                            </h3>
                        </Row>
                    </Col>
                </Row>
            </Header>
            <Content>
                <p>Content</p>
            </Content>
        </Container>
    );
}
