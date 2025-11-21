import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        // Fetch quotes when component loads
        fetch("/api/quote")
            .then(response => response.json())
            .then(data => setQuotes(data))
            .catch(error => console.error("Error fetching quotes:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                body: formData
            });
            
            if (response.ok) {
                // Refresh quotes after successful submission
                const updatedQuotes = await fetch("/api/quote").then(res => res.json());
                setQuotes(updatedQuotes);
                e.target.reset(); // Clear the form
            }
        } catch (error) {
            console.error("Error submitting quote:", error);
        }
    };

    return (
        <div className="App">
            {/* TODO: include an icon for the quote book */}
            <h1>Hack at UCI Tech Deliverable</h1>

            <h2>Submit a quote</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-name">Name</label>
                <input type="text" name="name" id="input-name" required />
                <label htmlFor="input-message">Quote</label>
                <input type="text" name="message" id="input-message" required />
                <button type="submit">Submit</button>
            </form>

            <h2>Previous Quotes</h2>
            <div className="messages">
                {quotes.map((quote, index) => (
                    <div key={index}>
                        <p><strong>{quote.name}</strong></p>
                        <p>{quote.message}</p>
                        <p><em>{new Date(quote.time).toLocaleString()}</em></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
