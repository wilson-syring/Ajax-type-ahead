//variables for the json file from github and the array for storing the data
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

//fetch from the json file
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

// function for finding a match
function findMatch(query, cities) {
    return cities.filter(place => {
        const regex = new RegExp(query, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
}

//function borrowed from stack overflow to add commas to numbers
function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

//function for displaying the match
function displayMatch() {
    const matchArray = findMatch(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
           <li>
             <span class="name">${cityName}, ${stateName}</span>
             <span class="population">${numberWithCommas(place.population)}</span>
           </li>
        `;
    }).join('');
    suggestion.innerHTML = html;
}

//variables for query selectors
const searchInput = document.querySelector('.search');
const suggestion = document.querySelector('.suggestions');

// event listeners for handling the display
searchInput.addEventListener('change', displayMatch);
searchInput.addEventListener('keyup', displayMatch);