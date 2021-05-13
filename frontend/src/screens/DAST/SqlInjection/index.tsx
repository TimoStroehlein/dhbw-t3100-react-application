import {Container, Content, Header} from 'rsuite';
import React from 'react';
import './styles.scss';

export const DASTSqlInjection = (): JSX.Element => {
    return (
        <Container>
            <Header>
                <h2>DAST - SQL Injection (CAPEC-66)</h2>
            </Header>
            <Content>
                <p>Content</p>
            </Content>
        </Container>
    );
}
