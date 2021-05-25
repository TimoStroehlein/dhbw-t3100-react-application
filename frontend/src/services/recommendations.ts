import axios from 'axios';
import { Recommendation, RecommendationData } from '../models/recommendations.type';

export const getRecommendations = async (): Promise<Array<Recommendation>> => {
    const response = await axios.get('http://localhost:8090/rest/api/v1/dast/recommendations');
    console.log(response);
    return response.data['recommendations'];
}

export const postRecommendations = async (recommendation: RecommendationData): Promise<void> => {
    const response = await axios.post('http://localhost:8090/rest/api/v1/dast/recommendations', {
        data: recommendation
    });
    console.log(response);
    return response.data;
}