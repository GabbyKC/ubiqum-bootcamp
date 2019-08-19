fetch('https://ubiqum-cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/beers?key=1b66372cfda3abdd9b017e9fe2177901')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let beers = data.data;
        createBeerGallery(beers);
    })
    .catch(err => {
        console.log('oh snap, summit went wrong', err);
    });


function createBeerGallery(beers) {
    let container = document.getElementById('beer-container');
    for (let i = 0; i < beers.length; i++) {

        let flipContainer = document.createElement('div');
        let card = document.createElement('div');
        let cardFront = document.createElement('div');
        let beerName = document.createElement('div');
        let nameText = document.createTextNode(beers[i].name);
        let image = document.createElement('img');
        image.setAttribute('src', getBeerImageSrc(beers[i]));

        cardFront.appendChild(image);
        cardFront.appendChild(beerName);
        beerName.appendChild(nameText);
        card.appendChild(cardFront);
        flipContainer.appendChild(card);
        container.appendChild(flipContainer);

        let cardBack = document.createElement('div');
        let description = document.createElement('p');
        let descriptionText = document.createTextNode(getABVText(beers[i]));

        description.appendChild(descriptionText);
        cardBack.appendChild(description);
        card.appendChild(cardBack);

        flipContainer.className = "flip-card";
        card.className = "flip-card-inner";
        cardFront.className = "flip-card-front";
        cardBack.className = "flip-card-back";
    }
}

function getBeerImageSrc(beer) {
    if (beer.hasOwnProperty('labels')) {
        return beer.labels.medium;
    }
    return 'beer_default.jpg';
}

function getABVText(beer) {
    if (beer.hasOwnProperty('abv')) {
        return 'ABV: ' + beer.abv;
    }
    return 'ABV: -';
}
