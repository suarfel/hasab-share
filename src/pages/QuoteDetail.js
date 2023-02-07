import React, { useState ,useEffect} from "react";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
// const DUMMY_QUOTES = [
//   { id: "q1", author: "Abebe", text: "Learning more about the react router" },
//   {
//     id: "q2",
//     author: "Chala",
//     text: "Learning more about the nested react router",
//   },
// ];
const QuoteDetail = () => {
  console.log(true);
  const params = useParams();
  const [isVisible, setIsVisible] = useState(true);
  const visiblityHandler = () => {
    setIsVisible(false);
  };

  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error
  } = useHttp(getAllQuotes, true);
  
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="centered focused">{error}</div>;
  }
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

 
  const quote = loadedQuotes.find((quote) => params.quoteId === quote.id);
  if (!quote) {
    return  <NoQuotesFound />;
  }
 
  return (
    <React.Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      {isVisible && (
        <div className="centered">
          <Link
            className="btn--flat"
            onClick={visiblityHandler}
            to={`/quotes/${params.quoteId}/comments`}
          >
            VIEW COMMENTs
          </Link>
        </div>
      )}
      <Outlet />
    </React.Fragment>
  );
};

export default QuoteDetail;
