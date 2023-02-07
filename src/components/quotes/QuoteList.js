import { Fragment } from "react";
import { useNavigate,useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes,Ascending) =>{
  return quotes.sort((quoteA,quoteB) => {
    if(Ascending){
      return quoteA.id > quoteB.id ? 1 : -1;
    }else{
      return quoteA.id < quoteB.id ? 1 : -1
    }
  });
}
const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSorting = queryParams.get('sort') === 'asc';
  const changeSortHandler = () => {
    navigate('/quotes?sort=' + (isSorting ? 'desc' : 'asc'));
    sortQuotes(props.quotes,isSorting);
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>Sort {isSorting ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
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
