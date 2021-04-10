import axios from 'axios';
import {User} from '../models/user.type';

export const getUsers = async (username: string, password: string): Promise<Array<User>> => {
    const response = await axios.get('http://dhbw-:3031/rest/api/v1/user', {
        params: {
            username: username,
            password: password
        }
    });
    return response.data['users'];
}
