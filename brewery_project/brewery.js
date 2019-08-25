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

function createBeerTemplate(beer) {
    return `
        <div class='flip-card' data-id='${beer.id}'>
            <div class='flip-card-inner'>
                <div class='flip-card-front'>
                    <img src='${beer.image}' />
                    <div class='headers'>${beer.name}</div>
                </div>
                <div class='flip-card-back'>
                    <p class='back-header'>${beer.name}</p>
                    <p>${beer.abv}</p>
                    <p>${beer.ibu}</p>
                    <p>${beer.organic}</p>
                    <p>${beer.status}</p>
                </div>
            </div>
        </div>
    `;
}

function createBeerGallery(beers) {
    for (let i = 0; i < beers.length; i++) {
        let beerTemplate = createBeerTemplate({
            id: beers[i].id,
            image: getBeerImageSrc(beers[i]),
            name: beers[i].name,
            abv: getABVText(beers[i]),
            ibu: getIBUText(beers[i]),
            organic: getOrganicDetail(beers[i]),
            status: getStatus(beers[i])
        })

        $('#beer-container').append(beerTemplate);
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
