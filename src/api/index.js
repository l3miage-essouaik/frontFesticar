import axios from 'axios';

class Api {
    constructor(url) {
        this.axios = axios.create({
            baseURL: url,
        });
    }

    getFestivals() {
        return this.axios.get('/api/allFestivals'); 
    }

    getDomaines(){
        return this.axios.get('/api/domains'); 
    }
    getFestivalsWithcriterias(nomFestival,dateDebut,dateFin,tarif,sousDomaine){
        return this.axios.get('/api/festivals/'); 
    }
}

export default new Api(process.env.VUE_APP_BACKEND_URL);
