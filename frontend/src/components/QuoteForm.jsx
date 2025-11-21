import { useState } from "react";

function QuoteForm({ onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(e.target);
        await onSubmit(formData);
        
        e.target.reset();
        setIsSubmitting(false);
    };

    return (
        <div className="quote-form-section">
            <h2>Submit a quote</h2>
            <form onSubmit={handleSubmit} className="quote-form">
                <label htmlFor="input-name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="input-name" 
                    required 
                    disabled={isSubmitting}
                    placeholder="Enter your name"
                />
                
                <label htmlFor="input-message">Quote</label>
                <input 
                    type="text" 
                    name="message" 
                    id="input-message" 
                    required 
                    disabled={isSubmitting}
                    placeholder="Enter your quote"
                />
                
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default QuoteForm;
