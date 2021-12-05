import React, { useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { getAllQuotes } from '../../lib/api';
import QuoteList from '../quotes/QuoteList';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoQuotesFound from '../quotes/NoQuotesFound';

const AllQuotes = () => {
  const {
    sendRequest: invoke,
    status,
    data: quotes,
    error,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
    invoke();
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
  if (status === 'completed' && (!quotes || quotes.length === 0)) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={quotes} />;
};

export default AllQuotes;
