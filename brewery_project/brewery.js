let beers = [];

fetch('https://ubiqum-cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/beers?key=1b66372cfda3abdd9b017e9fe2177901')
    .then(response => {
        return response.json()
    })
    .then(data => {
        beers = data;
    })
    .catch(err => {
        console.log('oh snap, summit went wrong', err);
    });
