import axios from 'axios';

class Api {
    constructor(url) {
        this.axios = axios.create({
            baseURL: url,
        });
    }

    get8Festival() {
        return this.axios.get('/api/allFestivals'); 
    }
}

export default new Api(process.env.VUE_APP_BACKEND_URL);
