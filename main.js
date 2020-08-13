'use strict';

const quoteContainer =  document.querySelector('.quote-container');
const quoteText =  document.getElementById('quote');
const authorText =  document.getElementById('author');
const twitterBtn =  document.querySelector('.btn-twitter');
const newQuoteBtn =  document.querySelector('.new-quote');
const loader = document.querySelector('.loader');

// Loading Spinner Show
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Code from API
async function getQuote() {
    showLoadingSpinner();
    
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        console.log(data)
        data.quoteAuthor === '' ? authorText.innerText = 'Unknow' : authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;

        // Stop loader and show Quote
        removeLoadingSpinner();

    } catch (error) {
        getQuote();
    }
}

// Twitter Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
