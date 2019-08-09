let books = [];

fetch('https://api.myjson.com/bins/zyv02')
    .then(response => {
        return response.json()
    })
    .then(data => {
        books = data.books;
        createBookCards(books);
    })
    .catch(err => {
        console.log('oh snap, summit went wrong', err);
    });

// function responseCallback() {
//   var data = JSON.parse(this.responseText);
//   books = data.books;
//
//   createBookCards(books);
// }
//
// function errorCallback(err) {
//   console.log('oh snap, summit went wrong', err);
// }
//
// var ajaxRequest = new XMLHttpRequest();
// ajaxRequest.onload = responseCallback;
// ajaxRequest.onerror = errorCallback;
// ajaxRequest.open('get', `https://api.myjson.com/bins/zyv02`, true);
// ajaxRequest.send();

function createBookCards(books) {
    var container = document.getElementById("books-container");
    for (var i = 0; i < books.length; i++) {
        var flipContainer = document.createElement("div");
        var card = document.createElement("div");
        var cardFront = document.createElement("div");
        var image = document.createElement("img");
        image.setAttribute("src", books[i].cover);

        cardFront.appendChild(image);
        card.appendChild(cardFront);
        flipContainer.appendChild(card);
        container.appendChild(flipContainer);

        var cardBack = document.createElement("div");
        var title = document.createElement("p");
        var titleText = document.createTextNode("Title: "+books[i].title);
        var description = document.createElement("p");
        var descriptionText = document.createTextNode(books[i].description);
        var button = document.createElement("button");
        var moreDetails = document.createElement("a");
        var moreDetailsText = document.createTextNode("More Info");
        moreDetails.setAttribute("href", books[i].detail)
        moreDetails.setAttribute("data-fancybox", "gallery")

        title.appendChild(titleText);
        description.appendChild(descriptionText);

        button.appendChild(moreDetails);
        moreDetails.appendChild(moreDetailsText);
        cardBack.appendChild(title);
        cardBack.appendChild(description);
        cardBack.appendChild(button);
        card.appendChild(cardBack);

        flipContainer.className = "flip-card";
        card.className = "flip-card-inner";
        title.className = "titles";
        cardFront.className = "flip-card-front";
        cardBack.className = "flip-card-back";
    }
}

function searchBooks () {
    var searchedWord = document.getElementById("search").value;
    searchedWord = searchedWord.toLowerCase();

    var books = document.getElementsByClassName("flip-card");
    for (var i = 0; i < books.length; i++) {
        if (books[i].innerHTML.toLowerCase().includes(searchedWord)) {
            books[i].style.display = "flex";
        } else {
            books[i].style.display = "none";
        }
    }
}
