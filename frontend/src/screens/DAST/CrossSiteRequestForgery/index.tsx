import {Button, Container, Content, Form, FormControl, FormGroup, Header } from 'rsuite';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { checkSession, checkLogin, setSession, changePassword } from '../../../services/sessions';

export const DASTCrossSiteRequestForgery = (): JSX.Element => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ newPassword, setNewPassword ] = useState<string>('');

    useEffect(() => {
        checkSession()
            .then(result => setIsLoggedIn(result));
    }, []);

    const loginPressed = async () => {
        if(await checkLogin(username, password)) {
            console.log('Login valid.')
            setSession(username)
                .then(result => {
                    setIsLoggedIn(result);
                    result ? alert('You are now logged in.') : alert('Username and/or password are wrong.');
                })
                .finally(() => console.log('Session handled.'))
        }
        else alert('Username and/or password are wrong.')
    }

    const changePasswordPressed = async () => {
        if(await checkSession() && newPassword != '') {
            console.log('Session and new password valid.')
            changePassword(newPassword)
            .then(result => {
                result ? alert('Your password was successfully changed.') : alert('Your password could not be changed.');
            })
            .finally(() => console.log('Password change handled.'))
            
        }
    }

    if(isLoggedIn) {
        return(
            <Container>
                <Header>
                    <h2>DAST - Cross-Site Scripting (CAPEC-63)</h2>
                </Header>
                <Content>
                    <h3>Change Password</h3>
                    <Form fluid>
                        <FormGroup>
                            <FormControl 
                                name="new_password" 
                                type="password"
                                placeholder="New Password" 
                                onChange={(value) => setNewPassword(value)}/>
                        </FormGroup>
                        <FormGroup>
                        <Button 
                            appearance="primary" 
                            onClick={() => changePasswordPressed()}>
                            Submit
                        </Button>
                        </FormGroup>
                    </Form>
                </Content>
            </Container>
        );
    }
    else {
        return (
            <Container>
                <Header>
                    <h2>DAST - Cross-Site Scripting (CAPEC-63)</h2>
                </Header>
                <Content>
                    <h3>Login</h3>
                    <Form layou="inline">
                        <FormGroup>
                            <FormControl
                                name="username" 
                                placeholder="Username" 
                                onChange={(value) => setUsername(value)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl 
                                name="password" 
                                type="password"
                                placeholder="Password" 
                                onChange={(value) => setPassword(value)}/>
                        </FormGroup>
                        <FormGroup>
                        <Button 
                            appearance="primary" 
                            onClick={() => loginPressed()}>
                            Submit
                        </Button>
                        </FormGroup>
                    </Form>
                </Content>
            </Container>
        );
    }

    
}
