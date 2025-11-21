import QuoteCard from "./QuoteCard";

function QuoteList({ quotes, timeFilter, onFilterChange }) {
    return (
        <div className="quote-list-section">
            <div className="quote-list-header">
                <h2>Previous Quotes</h2>
                <select 
                    value={timeFilter} 
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="time-filter-dropdown"
                >
                    <option value="oneday">One Day</option>
                    <option value="lastweek">Last Week</option>
                    <option value="lastmonth">Last Month</option>
                    <option value="lastyear">Last Year</option>
                    <option value="all">All Quotes</option>
                </select>
            </div>
            <div className="messages">
                {quotes.length === 0 ? (
                    <p className="no-quotes">No quotes found for the selected time period.</p>
                ) : (
                    quotes.map((quote, index) => (
                        <QuoteCard 
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
