function QuoteItem({ quote }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour12: true
        });
    };

    return (
        <div className="quote-item">
            <div className="quote-header">
                <strong className="quote-name">{quote.name}</strong>
                <span className="quote-time">{formatDate(quote.time)}</span>
            </div>
            <p className="quote-message">{quote.message}</p>
        </div>
    );
}

export default QuoteItem;
