var currentlyFetchingData = false;
var page = 1;

checkAndFetch();

function checkAndFetch() {
    if (haveReachedEndOfPage() && !currentlyFetchingData) {
        fetchBeers(page);
        page = page + 1;
    }
}

$(window).scroll(function() { // Every time you scroll this will get called
    // If we have reached the end of the HTML content AND we're not currently loading any data
    checkAndFetch();
});

function fetchBeers(pageNumber) {
    currentlyFetchingData = true;
    $('#loader').removeClass('d-none');

    console.log(`Will fetch page ${page}`);
    fetch(`https://ubiqum-cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/beers?key=1b66372cfda3abdd9b017e9fe2177901&p=${pageNumber}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let beers = data.data;

            if (beers && beers.length > 0) {
                createBeerGallery(beers);
                $('#loader').addClass('d-none');
                currentlyFetchingData = false;
            } else {
                $('#loader').addClass('d-none');
                $('#end-of-content').removeClass('d-none');
            }
        })
        .catch(err => {
            console.log('oh snap, summit went wrong', err);
        });
}

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
        let innerBeerName = document.createElement('p');
        let innerBeernameText = document.createTextNode(beers[i].name);
        let abvDetail = document.createElement('p');
        let abvDetailText = document.createTextNode(getABVText(beers[i]));
        let ibuDetail = document.createElement('p');
        let ibuDetailText = document.createTextNode(getIBUText(beers[i]));
        let organicDetail = document.createElement('p');
        let organicDetailText = document.createTextNode(getOrganicDetail(beers[i]));
        let statusDetail = document.createElement('p');
        let statusDetailText = document.createTextNode(getStatus(beers[i]));

        innerBeerName.appendChild(innerBeernameText);
        abvDetail.appendChild(abvDetailText);
        ibuDetail.appendChild(ibuDetailText);
        organicDetail.appendChild(organicDetailText);
        statusDetail.appendChild(statusDetailText);
        cardBack.appendChild(innerBeerName);
        cardBack.appendChild(abvDetail);
        cardBack.appendChild(ibuDetail);
        cardBack.appendChild(organicDetail);
        cardBack.appendChild(statusDetail);
        card.appendChild(cardBack);

        flipContainer.className = "flip-card";
        flipContainer.setAttribute('data-id', beers[i].id);
        card.className = "flip-card-inner";
        cardFront.className = "flip-card-front";
        cardBack.className = "flip-card-back";
        innerBeerName.className = "back-header"
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

function getIBUText(beer) {
    if (beer.hasOwnProperty('ibu')) {
        return 'IBU: ' + beer.ibu;
    }
    return 'IBU: -';
}

function getOrganicDetail(beer) {
    if (beer.hasOwnProperty('isOrganic')) {
        return 'Organic: ' + beer.isOrganic;
    }
    return '';
}

function getStatus(beer) {
    if (beer.hasOwnProperty('status')) {
        return 'Status: ' + beer.status;
    }
    return '';
}

function haveReachedEndOfPage() {
    return $(window).scrollTop() >= $(document).height() - $(window).height() - 10;
}
