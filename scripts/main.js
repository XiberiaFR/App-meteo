
const CLEAPI = 'ca7fe76ef3323095b224d0745e22fc77';
let resultatsAPI;

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        
        console.log(position);
    
    }, () => {
        alert('Vous avez refusé la géolocalisation, l\'application ne peut pas fonctionner, veuillez l\'activer')
    } )
}
