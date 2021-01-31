const jourSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// on récupère la date actuelle
let ajd = new Date();
// on obtient le jour avec le mot complet
let options = {weekday: 'long'};
// on utilise le format FR jour/mois/année
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
// console.log(jourActuel, ajd);

// On prend la première lettre du jour actuel, on la met en majuscule et on y ajoute le mot entier à partir de la 2ème lettre via slice(1)
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
// console.log(jourActuel);

// on découpe le tableau à partir du jour actuel et on vient lui concaténer le tableau jourSemaine jusqu'au jour d'aujourd'hui  
let tabJoursEnOrdre = jourSemaine.slice(jourSemaine.indexOf(jourActuel)).concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));
// console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;