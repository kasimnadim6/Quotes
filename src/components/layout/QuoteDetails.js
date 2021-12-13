import React, { useEffect } from 'react';
import { Route, Routes, useParams, Link } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getSingleQuote } from '../../lib/api';
import Comments from '../comments/Comments';
import HighlightedQuote from '../quotes/HighlightedQuote';
import NoQuotesFound from '../quotes/NoQuotesFound';
import LoadingSpinner from '../UI/LoadingSpinner';

const QuoteDetails = () => {
  const { quoteId } = useParams();
  const {
    sendRequest: invoke,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    invoke(quoteId);
  }, [invoke]);
  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (status === 'completed' && !quote) {
    return <NoQuotesFound />;
  }
  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="centered">
              <Link className="btn--flat" to="comments">
                Load comments
              </Link>
            </div>
          }
        />
        <Route path="comments" element={<Comments quoteId={quoteId} />} />
      </Routes>
    </>
  );
};

export default QuoteDetails;
