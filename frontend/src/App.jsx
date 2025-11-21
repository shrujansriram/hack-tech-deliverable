import { useState, useEffect } from "react";
import "./App.css";
import QuoteForm from "./components/QuoteForm";
import QuoteList from "./components/QuoteList";
import logo from "./assets/quotebook.png";  // ← UPDATED: Changed to quotebook.png

function App() {
    const [quotes, setQuotes] = useState([]);
    const [timeFilter, setTimeFilter] = useState("all");

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const response = await fetch("/api/quote");
            const data = await response.json();
            setQuotes(data);
        } catch (error) {
            console.error("Error fetching quotes:", error);
        }
    };

    const handleQuoteSubmit = async (formData) => {
        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                body: formData
            });
            
            if (response.ok) {
                await fetchQuotes();
            }
        } catch (error) {
            console.error("Error submitting quote:", error);
        }
    };

    const handleFilterChange = (filter) => {
        setTimeFilter(filter);
    };

    const getFilteredQuotes = () => {
        if (timeFilter === "all") {
            return quotes;
        }

        const now = new Date();
        let cutoffDate = new Date();

        switch (timeFilter) {
            case "oneday":
                cutoffDate.setDate(now.getDate() - 1);
                break;
            case "lastweek":
                cutoffDate.setDate(now.getDate() - 7);
                break;
            case "lastmonth":
                cutoffDate.setMonth(now.getMonth() - 1);
                break;
            case "lastyear":
                cutoffDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                return quotes;
        }

        return quotes.filter(quote => {
            const quoteDate = new Date(quote.time);
            return quoteDate >= cutoffDate;
        });
    };

    return (
        <div className="App">
            <img src={logo} alt="Quote Book Logo" className="app-logo" />
            
            <h1>Hack at UCI Tech Deliverable</h1>
            
            <QuoteForm onSubmit={handleQuoteSubmit} />
            
            <QuoteList 
                quotes={getFilteredQuotes()} 
                timeFilter={timeFilter}
                onFilterChange={handleFilterChange}
            />
        </div>
    );
}

export default App;
