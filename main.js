'use strict';

const quoteContainer =  document.getElementById('quote-container');
const quoteText =  document.getElementById('quote');
const authorText =  document.getElementById('author');
const twitterBtn =  document.getElementById('twitter');
const newQuoteBtn =  document.getElementById('new-quote');

// Get Code from API
async function getQuote() {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();

        data.quoteAuthor === '' ? authorText.innerText = 'Unknow' : authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
    } catch (error) {
        getQuote();
        console.log('LOL, no quote', error)
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
