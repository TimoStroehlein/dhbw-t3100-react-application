import axios from 'axios';

export const getRecommendations = async (): Promise<Array<string>> => {
    const response = await axios.get('http://localhost:8090/rest/api/v1/dast/recommendations');
    console.log(response);
    return response.data['recommendations'];
}

export const postRecommendations = async (recommendation: string): Promise<void> => {
    const response = await axios.post('http://localhost:8090/rest/api/v1/dast/recommendations', {
        params: {
            recommendation: recommendation
        }
    });
    console.log(response);
    return response.data;
}