import { Redirect, Route, Switch } from 'react-router-dom';
import AllQuotes from './components/layout/AllQuotes';
import Layout from './components/layout/Layout';
import NewQuote from './components/layout/NewQuote';
import NotFound from './components/layout/NotFound';
import QuoteDetails from './components/layout/QuoteDetails';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetails />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
