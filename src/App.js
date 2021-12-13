import { Navigate, Route, Routes } from 'react-router-dom';
import AllQuotes from './components/layout/AllQuotes';
import Layout from './components/layout/Layout';
import NewQuote from './components/layout/NewQuote';
import NotFound from './components/layout/NotFound';
import QuoteDetails from './components/layout/QuoteDetails';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="quotes" />} />
        <Route path="/quotes/" element={<AllQuotes />} exact />
        <Route path="/quotes/:quoteId/*" element={<QuoteDetails />} />
        <Route path="/new-quote" element={<NewQuote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
