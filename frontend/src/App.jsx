import { useState, useEffect } from "react";
import "./App.css";
import QuoteForm from "./components/QuoteForm";
import QuoteList from "./components/QuoteList";

function App() {
    const [quotes, setQuotes] = useState([]);

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

    return (
        <div className="App">
            {/* TODO: include an icon for the quote book */}
            <h1>Hack at UCI Tech Deliverable</h1>
            
            <QuoteForm onSubmit={handleQuoteSubmit} />
            
            <QuoteList quotes={quotes} />
        </div>
    );
}

export default App;
