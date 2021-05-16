import {Container, Content, Header, Form, FormControl, FormGroup, Button, Modal, List} from 'rsuite';
import { useEffect, useState } from 'react';
import { getRecommendations, postRecommendations } from '../../../services/recommendations';
import './styles.scss';

export const DASTCrossSiteScripting = (): JSX.Element => {
    const [ recommendations, setRecommendations ] = useState<string[]>([]);
    const [ recommendation, setRecommendation ] = useState<string>('');
    const [ submitted, setSubmitted ] = useState(false);

    // fetch the saved recommendations on page load
    useEffect(() =>  {
        getRecommendations()
            .then(data => setRecommendations(data));
    })

    // user submitted a new recommendation
    const submitRecommendation = async () => {
        // send to db
        postRecommendations(recommendation)
            .then(success => setSubmitted(true))
            .then(success => recommendations.push(recommendation))
            .catch(error => console.log(error));
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
                            onChange={(value) => setRecommendation(value)}/>
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
                    {recommendations.map((recommendation) => (
                        <List.Item>
                            { /* </List.Item>/<div dangerouslySetInnerHTML={{"__html": link}} */ }
                            <a href={recommendation}>Recommendation</a>
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
