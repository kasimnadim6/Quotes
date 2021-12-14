import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  const AllQuotes = React.lazy(() => import('./components/layout/AllQuotes'));
  const NewQuote = React.lazy(() => import('./components/layout/NewQuote'));
  const QuoteDetails = React.lazy(() =>
    import('./components/layout/QuoteDetails')
  );
  const NotFound = React.lazy(() => import('./components/layout/NotFound'));

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="quotes" />} />
          <Route path="/quotes/" element={<AllQuotes />} exact />
          <Route path="/quotes/:quoteId/*" element={<QuoteDetails />} />
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
