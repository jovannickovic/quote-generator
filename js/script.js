const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorName = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter-button');
const newQuoteBtn = document.querySelector('#new-quote-button');
const loader = document.querySelector('#loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const getQuoteFromAPI = async () => {
    showLoadingSpinner();

    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();

        newQuote();
    } catch (error) {
        getQuoteFromAPI();
    }
}

const newQuote = () => {
    showLoadingSpinner();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    (quote.text.length > 120) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;
    (!quote.author) ? authorName.textContent = 'Unknown' : authorName.textContent = quote.author;

    removeLoadingSpinner();
}

const tweetQuote = () => {
    const quoteToTweet = quoteText.textContent;
    const authorToTweet = authorName.textContent;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteToTweet} - ${authorToTweet}`;
    open(twitterUrl, '_blank');
}
twitterBtn.addEventListener('click', tweetQuote);

newQuoteBtn.addEventListener('click', getQuoteFromAPI);

getQuoteFromAPI();