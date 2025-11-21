import QuoteItem from "./QuoteItem";

function QuoteList({ quotes }) {
    return (
        <div className="quote-list-section">
            <h2>Previous Quotes</h2>
            <div className="messages">
                {quotes.length === 0 ? (
                    <p className="no-quotes">No quotes yet. Be the first to submit one!</p>
                ) : (
                    quotes.map((quote, index) => (
                        <QuoteItem 
                            key={`${quote.name}-${quote.time}-${index}`} 
                            quote={quote} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default QuoteList;
