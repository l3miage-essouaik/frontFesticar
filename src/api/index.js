import axios from 'axios';
import { update } from 'firebase/database';

class Api {
    constructor(url) {
        this.axios = axios.create({
            baseURL: url,
        });
    }

    getFestivals(numPage) {
        return this.axios.get(`/api/festivals/?numPage=${numPage !== null && numPage !== undefined ? numPage : 0}&taille=8`);
    }

    getFestivalById(id){
        return this.axios.get('/api/Festival/'+id)
    }

    getFestivalsWithcriterias(nomFestival,dateDebut,dateFin,tarif,sousDomaine,numPage=0){
        let url = '/api/festivals/?';

        if (nomFestival) url += `nomFestival=${nomFestival}&`;
        if (dateDebut) url += `dateDebut=${dateDebut}&`;
        if (dateFin) url += `dateFin=${dateFin}&`;
        if (tarif) url += `tarif=${tarif}&`;
        if (sousDomaine) url += `sousDomaine=${sousDomaine}&`;

        // Supprimez le dernier '&' de l'URL
        url += "numPage="+numPage+"&taille=10&";
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

    getUserByEmail(email){
        return this.axios.get('/api/utilisateur/?email='+email);
    }

    createPack(pack){
        return this.axios.post(`/api/pack/`,pack);
    }

    getHoraireArret(idCov,idLieu){
        return this.axios.get(`/api/ArretCovoiturage?id=${idCov}&idLieu=${idLieu}`);
    }

    affectPanierToUser(idUser, idPanier) {
        return this.axios.post(`/api/pack/anas?panierId=${idPanier}&userId=${idUser}`);
    }

    getPanierByUser(idUser){
        return this.axios.get(`/api/panier/?utilisateurId=`+idUser);
    }

    updateNbPlaces(updatedPack){
        return this.axios.put(`/api/pack/updateNbPlaces`,updatedPack);
    }

    getPackByIdPanier(idPanier){
        return this.axios.get(`/api/pack/allPack?panierId=${idPanier}`);
    }


    logUserbyEmailandMdp(email, mdp){
        return this.axios.get(`/api/utilisateur/login?email=${email}&mdp=${mdp}`);
    }

    updateEtatPanier(idPanier,etatPanier) { 
        return this.axios.put(`/api/panier/?panierId=${idPanier}&etatPanier=${etatPanier}`)
    }

    deletePack(horaire, idCov, panierId){
        return this.axios.delete(`/api/pack/?horaire=${horaire}&idCovoiturage=${idCov}&panierId=${panierId}`)
    }

}

export default new Api(process.env.VUE_APP_BACKEND_URL);
