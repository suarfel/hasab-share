import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_QUOTES = [
//     {id :'q1',author : "Abebe" ,text : "Learning more about the react router"},
//     {id :'q2',author : "Chala" ,text : "Learning more about the nested react router"}
// ]
const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  console.log(loadedQuotes);
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
  if (status === "completed" && (!loadedQuotes || loadedQuotes.lenght === 0)) {
    return <NoQuotesFound />;
  }
  return (
    <React.Fragment>
      <QuoteList quotes={loadedQuotes} />
    </React.Fragment>
  );
};

export default AllQuotes;
