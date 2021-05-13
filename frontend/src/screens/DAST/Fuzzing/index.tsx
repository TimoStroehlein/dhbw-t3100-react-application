import {Container, Content, Header} from 'rsuite';
import React from 'react';
import './styles.scss';

export const DASTFuzzing = (): JSX.Element => {
    return (
        <Container>
            <Header>
                <h2>DAST - Fuzzing (CAPEC-28)</h2>
            </Header>
            <Content>
                <p>Content</p>
            </Content>
        </Container>
    );
}
