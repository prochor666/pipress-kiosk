import axios from 'axios';

export const apiEndpoint = async () => {

    try {

        const res = await axios.get('/api-endpoint.json');
        const e = await res.data;

        if (typeof (e) === 'object') {

            const url = e.url || '';

            return url;
        }
        return '';

    } catch (e) {

        console.log(e);
        return '';
    }
};

export default apiEndpoint;
