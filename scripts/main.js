import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

const CLEAPI = 'ca7fe76ef3323095b224d0745e22fc77';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempsPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');


// On affiche une demande d'autorisation pour accéder à la localisation via le navigateur
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        
        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);
    
    }, () => {
        alert('Vous avez refusé la géolocalisation, l\'application ne peut pas fonctionner, veuillez l\'activer')
    } )
}


// On crée la fonction qui gère la gestion des données de l'API 
function AppelAPI(long,lat) {

    // console.log(long, lat);

    // On se connecte à l'API pour obtenir les données
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
    
    // On récupère les données et on les convertit au format .json pour les utiliser
    .then((reponse) => {
        return reponse.json();
    })
    
    // On sélectionne les données souhaitées et on les affiche dans l'app
    .then((data) => {
        // console.log(data);

        resultatsAPI = data;

        // La météo du moment, Math.trunc permet d'enlever les chiffres après la virgule
        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = Math.trunc(resultatsAPI.current.temp) + '°c';
        localisation.innerText = resultatsAPI.timezone;

        // les heures, par tranche de 3h avec leur température
        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            // Si l'heure est supérieure à 24h, on lui retire 24 pour repartir sur une nouvelle journée
            if(heureIncr > 24) {
                heure[i].innerText = heureIncr - 24 + 'h';
            } 
              // si on est strictement égal à 24h, on affiche minuit 
              else if(heureIncr === 24) {
                heure[i].innerText === '00 h';
            } 
              // sinon on affiche l'heure actuelle + i * 3
              else {
                heure[i].innerText = heureIncr + 'h';
            }

        }

        // temperature pour 3h
        for(let t = 0; t < tempsPourH.length; t++) {
            tempsPourH[t].innerText = Math.trunc(resultatsAPI.hourly[t * 3].temp) + '°c';
        }

        // 3 premières lettres des jours
        for(let d = 0; d < tabJoursEnOrdre.length; d++) {
            joursDiv[d].innerText = tabJoursEnOrdre[d].slice(0,3);
        }

        // temperature par jour
        for (let m = 0; m < 7; m++){
            tempJoursDiv[m].innerText = Math.trunc(resultatsAPI.daily[m + 1].temp.day) + '°c';
        }

        // Icone météo dynamique
        if(heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        } else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition');

    })
}