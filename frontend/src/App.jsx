import { useState, useEffect } from "react";
import "./App.css";
import QuoteForm from "./components/QuoteForm";
import QuoteList from "./components/QuoteList";
import LiquidEther from "./components/LiquidEther";
import logo from "./assets/quotebook.png";

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
            {/* Background layer with DARK colors */}
            <div className="background-layer">
                <LiquidEther
                    colors={['#2D1B69', '#1A1A3E', '#4A1E7C', '#6B2D9E']}
                    mouseForce={25}
                    cursorSize={120}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.4}
                    autoIntensity={2.5}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            {/* Content wrapper */}
            <div className="content-wrapper">
                <img src={logo} alt="Quote Book Logo" className="app-logo" />
                
                <h1>Hack at UCI Tech Deliverable</h1>
                
                <QuoteForm onSubmit={handleQuoteSubmit} />
                
                <QuoteList 
                    quotes={getFilteredQuotes()} 
                    timeFilter={timeFilter}
                    onFilterChange={handleFilterChange}
                />
            </div>
        </div>
    );
}

export default App;
