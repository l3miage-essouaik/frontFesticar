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

    getFestivalById(id){
        return this.axios.get('/api/Festival/'+id)
    }

    getFestivalsWithcriterias(nomFestival,dateDebut,dateFin,tarif,sousDomaine){
        let url = '/api/festivals/?';

        if (nomFestival) url += `nomFestival=${nomFestival}&`;
        if (dateDebut) url += `dateDebut=${dateDebut}&`;
        if (dateFin) url += `dateFin=${dateFin}&`;
        if (tarif) url += `tarif=${tarif}&`;
        if (sousDomaine) url += `sousDomaine=${sousDomaine}&`;

        // Supprimez le dernier '&' de l'URL
        url = url.slice(0, -1);

        return this.axios.get(url);
    }

    getCovoiturageByCriteriaAndFestivalId(festivalId,nomCommune,modelVoiture,placesDispo,budget){
        let url = '/api/covoituragesCriteria?festivalId='+festivalId+'&numPage=1&taille=10&';
        
        if (nomCommune) url += `nomCommune=${nomCommune}&`;
        if (modelVoiture) url += `modelVoiture=${modelVoiture}&`;
        if (placesDispo) url += `placeDispo=${placesDispo}&`;
        if (budget) url += `budget=${budget}&`;
        
        url = url.slice(0, -1);
        return this.axios.get(url);
    }

    getCovoiturageByFestivalId(idFestival, numPage, taillePage){
        return this.axios.get(`/api/Covoiturage/${idFestival}?numPage=${numPage}&taillePage=${taillePage}`)
    }

    getDomaines(){
        return this.axios.get('/api/domains'); 
    }

    createUser(user){
        return this.axios.post('/api/utilisateur/',user);
    }

    createPanier(utilisateurId,panier){
        return this.axios.post(`/api/panier/${utilisateurId}`,panier);
    }

    getModelVoiture(){
        return this.axios.get('/api/Covoiturage/ModeleVoiture');
    }
}

export default new Api(process.env.VUE_APP_BACKEND_URL);
