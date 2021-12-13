import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const isSortingDirAsc = queryParam.get('sort') === 'asc';

  const sort = (quotes, ascending) => {
    return quotes.sort((a, b) => {
      if (ascending) {
        return a.id > b.id ? 1 : -1;
      } else {
        return a.id < b.id ? 1 : -1;
      }
    });
  };
  const sortedQuotes = sort(props.quotes, isSortingDirAsc);
  const sortingHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isSortingDirAsc ? 'desc' : 'asc'}`,
    });
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>{`Sort ${
          isSortingDirAsc ? 'Descending' : 'Ascending'
        }`}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
