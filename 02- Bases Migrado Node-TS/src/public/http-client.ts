import axios from 'axios'
import { error } from 'console';

export const httpClient = {

    get: async (url: string) => {
        const { data } = await axios.get(url);
        return data;

        //const response = await fetch(url);
        //return await response.json();
    },

    post: async (url: string, body: any) => {
        return error('Not implemented');
    },
    put: async (url: string, body: any) => {
        return error('Not implemented');
    },
    delete: async (url: string) => {
        return error('Not implemented');
    },

};
