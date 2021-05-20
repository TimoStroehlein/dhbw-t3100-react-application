import {Container, Content, Header, Form, FormControl, FormGroup, Button, Modal, List} from 'rsuite';
import { useEffect, useState } from 'react';
import { getRecommendations, postRecommendations } from '../../../services/recommendations';
import './styles.scss';
import { Recommendation, RecommendationData } from '../../../models/recommendations.type';

export const DASTCrossSiteScripting = (): JSX.Element => {
    const [ recommendations, setRecommendations ] = useState<Array<Recommendation>>([]);
    const [ link, setLink ] = useState<string>('');
    const [ name, setName ] = useState<string>('')
    const [ submitted, setSubmitted ] = useState(false);

    // fetch the saved recommendations on page load
    useEffect(() =>  {
        getRecommendations()
            .then(data => setRecommendations(data))
    }, [submitted])

    // user submitted a new recommendation
    const submitRecommendation = async () => {
        // send to db
        postRecommendations({ submittedLink: link, submitterName: name})
            .then(success => setSubmitted(true))
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
                            placeholder="Your Name" 
                            onChange={(value) => setName(value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            name="link" 
                            placeholder="The website you want to recommend" 
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
                    {recommendations.map((recommendation, index) => (
                        <List.Item key={recommendation.id}>
                            <div>
                                { /* <div dangerouslySetInnerHTML={{"__html": link}} /> */ }
                                <a href={recommendation.data.submittedLink}>Recommendation #{index+1}</a>
                                <p>by { recommendation.data.submitterName }</p>
                            </div>
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
