import {Container, Content, Header, Form, FormControl, FormGroup, Button, Modal, List} from 'rsuite';
import { useState } from 'react';
import './styles.scss';

export const DASTCrossSiteScripting = (): JSX.Element => {
    // TODO: fetch last links
    const [ links ] = useState<string[]>([]);
    const [ link, setLink ] = useState<string>('');
    const [ submitted, setSubmitted ] = useState(false);

    const submitRecommendation = async () => {
        // send to db
        // TODO: send to db
        
        // success
        setSubmitted(true);
        links.push(link)
    }

    return (
        <Container>
            <Header>
                <h2>DAST - Cross-Site Scripting (CAPEC-63)</h2>
            </Header>
            <Content>
                <h3>Recommend links to users</h3>
                <Form fluid>
                    <FormGroup>
                        <FormControl 
                            name="name" 
                            placeholder="Name" 
                            onChange={(value) => setLink(value)}/>
                    </FormGroup>
                    <FormGroup>
                    <Button 
                        appearance="primary" 
                        onClick={() => submitRecommendation()}>
                        Submit
                    </Button>
                    </FormGroup>
                </Form>
                <List>
                    {links.map((link) => (
                        <List.Item>
                            { /* </List.Item>/<div dangerouslySetInnerHTML={{"__html": link}} */ }
                            <a href={link}>Recommendation</a>
                        </List.Item>
                    ))}
                </List>

                <Modal show={submitted}>
                    <Modal.Header>Thank you!</Modal.Header>
                    <Modal.Body>Your website recommendation has been submitted.</Modal.Body>
                    <Modal.Footer><Button appearance="subtle" onClick={() => setSubmitted(false)}>Got it</Button></Modal.Footer>
                </Modal>
            </Content>
        </Container>
    );
}
