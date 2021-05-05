import {
    Col,
    Container,
    Content,
    Header,
    Form,
    FormGroup,
    FormControl,
    HelpBlock,
    Button,
    ButtonToolbar,
    FlexboxGrid
} from 'rsuite';
import React from 'react';
import './styles.scss';

export const SASTImproperInputValidation = (): JSX.Element => {
    return (
        <Container>
            <Header>
                <FlexboxGrid>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                        <h2>
                            SAST - Improper Input Validation
                        </h2>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={14} className="cwe-col">
                        <h3>
                            <a href="https://cwe.mitre.org/data/definitions/20.html"
                               target="_blank">CWE-20</a> (Rank 3)&nbsp;
                            <a href="https://cwe.mitre.org/data/definitions/20.html"
                               target="_blank">CAPEC-123</a>
                        </h3>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Header>
            <Content>
                <hr/>
                <div className="content-grid">
                    <h4>Data</h4>
                </div>
                <hr/>
                <FlexboxGrid justify="center" className="content-grid">
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={12} sm={24}>
                        <h3>Contact</h3>
                        <Form fluid>
                            <FormGroup>
                                <FormControl name="name" placeholder="Username" />
                                <HelpBlock>This field is required</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <FormControl name="email" type="email" placeholder="E-Mail" />
                                <HelpBlock>This field is required</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <FormControl rows={5} name="textarea" placeholder="Message" componentClass="textarea" />
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar>
                                    <Button appearance="primary">Submit</Button>
                                    <Button appearance="default">Cancel</Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    );
}
