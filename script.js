const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const AuthorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// show new quote
function newQuote() {
   // pick a random quote from apiQuotes array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; 
   //Check if author field is blank and replace it with 'Unknown'
   if (!quote.author){
       AuthorText.textContent = 'Unknown';
   } else {
    AuthorText.textContent = quote.author;
   }
   //Check quote length to determine styling
   if (quote.text.length > 120){
       quoteText.classList.add('long-quote');
   } else {
    quoteText.classList.remove('long-quote');
   }
   quoteText.textContent = quote.text;
}

// get quotes from api
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch error
    }
}

//Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${AuthorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Even Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();