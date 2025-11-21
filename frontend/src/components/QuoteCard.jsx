import { useRef } from 'react';
import './QuoteCard.css';

function QuoteCard({ quote }) {
    const cardRef = useRef(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Calculate animation parameters based on quote length
    const quoteLength = quote.message.length;
    const animationDuration = Math.max(4, quoteLength * 0.15); // Scale with length

    return (
        <div className="quote-card" ref={cardRef}>
            <div className="quote-wrap">
                <div className="quote-terminal">
                    <hgroup className="quote-head">
                        <p className="quote-title">
                            <svg
                                width="16px"
                                height="16px"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                            >
                                <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            {quote.name}
                        </p>

                        <div className="quote-actions">
                            <span className="quote-timestamp">{formatDate(quote.time)}</span>
                        </div>
                    </hgroup>

                    <div className="quote-body">
                        <pre className="quote-pre">
                            <code className="quote-prompt">"</code>
                            <code
                                className="quote-cmd"
                                data-quote={quote.message}
                                style={{
                                    '--quote-length': quoteLength,
                                    '--animation-duration': `${animationDuration}s`
                                }}
                            ></code>
                            <code className="quote-end">"</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuoteCard;
