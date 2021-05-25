import * as Cookies from 'js-cookie';
import axios from 'axios';
import cryptoRandomString from 'crypto-random-string';

export const setSession = async (username: string): Promise<boolean> => {
    Cookies.remove('user_session');

    const sessionId = cryptoRandomString({length: 32, type: 'alphanumeric'});
    const response = await axios.put('http://localhost:8090/rest/api/v1/dast/session', {
        data: {
            username: username,
            sessionId: sessionId
        }
    });
    console.log('Successfully put new database session.');

    if(response.status == 200 && response.data.success) {
        Cookies.set('user_session', { username: username, session_id: sessionId }, { expires: 10 });
        console.log('Successfully put new cookie session');
        return true;
    }
    else {
        return false;
    }
};

export const unsetSession = async (): Promise<boolean> => {
    // Cleanup of session ID in database is ignored
    Cookies.remove('user_session');
    return true;
}

const getSessionCookie = (): any => {
    const cookie = Cookies.getJSON('user_session')
    console.log(cookie);
    return cookie;  
}

export const checkSession = async (): Promise<boolean> => {
    const cookieData = getSessionCookie();
    if(!cookieData) return false;
    
    // Find database entry for cookie data
    const response = await axios.get('http://localhost:8090/rest/api/v1/dast/session', {
        params: {
            username: cookieData.username,
            sessionId: cookieData.session_id
        }
    });


    // Check if returned database entry matches cookie
    if(response.status == 200 && response.data) {
        if(response.data.username == cookieData.username && response.data.sessionId == cookieData.session_id) return true;
        return false;
    } else {
        return false;
    }
};

export const checkLogin = async (username: string, password: string): Promise<boolean> => {
    const response = await axios.get('http://localhost:8090/rest/api/v1/dast/user', {
        params: {
            username: username,
            password: password
        }
    });
    if(response.status == 200 && response.data.success == true) return true;
    else return false;
}

export const changePassword = async (newPassword: string): Promise<boolean> => {
    const cookieData = getSessionCookie();
    if(!cookieData) return false;

    const response = await axios.post('http://localhost:8090/rest/api/v1/dast/user', {
        data: {
            username: cookieData.username,
            newPassword: newPassword,
            sessionId: cookieData.session_id
        }
    });
    if(response.status == 200 && response.data.success == true) return true;
    else return false;
}