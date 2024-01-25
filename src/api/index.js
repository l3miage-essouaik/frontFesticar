import axios from 'axios';

class Api {
    constructor(url) {
        this.axios = axios.create({
            baseURL: url,
        });
    }

    nomFunction() {
        return this.axios.get('/user'); 
    }
}

export default new Api(process.env.VUE_APP_BACKEND_URL);
