import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { addQuote } from '../../lib/api';
import QuoteForm from '../quotes/QuoteForm';

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest: invoke, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === 'completed') {
      navigate('/quotes');
    }
  }, [status, navigate]);

  const addQuoteHandler = (quote) => {
    invoke(quote);
  };
  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
