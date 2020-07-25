const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorName = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter-button');
const newQuoteBtn = document.querySelector('#new-quote-button');
const loader = document.querySelector('#loader');

const showLoadingSpinner = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
	if (!loader.hidden) {
		loader.hidden = true;
		quoteContainer.hidden = false;
	}
}

const getQuoteFromAPI = async () => {
    showLoadingSpinner();

    // To avoid CORS issues
    const proxyUrl = 'https://agile-lowlands-13303.herokuapp.com/';

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        (data.quoteText.length > 120) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
        quoteText.innerText = data.quoteText;

        (data.quoteAuthor === '') ? authorName.innerText = 'Unknown' : authorName.innerText = data.quoteAuthor;
        
        removeLoadingSpinner();
    } catch (error) {
        getQuoteFromAPI();
    }
}

const tweetQuote = () => {
    const quoteToTweet = quoteText.innerText;
    const authorToTweet = authorName.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteToTweet} - ${authorToTweet}`;
    open(twitterUrl, '_blank');
}
twitterBtn.addEventListener('click', tweetQuote);

newQuoteBtn.addEventListener('click', getQuoteFromAPI);

getQuoteFromAPI();