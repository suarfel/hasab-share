import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
// import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";


const NewQuote = React.lazy(() => import('./pages/NewQuote'));

function App() {
  return (
    <React.Fragment>
      <Router>
        <Layout>
          <Suspense fallback={<div className="centered"><LoadingSpinner /></div>}>
            <Routes>
              <Route path="/" element={<Navigate replace to="quotes" />} />
              <Route path="quotes" element={<AllQuotes />} />
              <Route path="quotes/:quoteId" element={<QuoteDetail />}>
                <Route path="comments" element={<Comments />} />
              </Route>
              <Route path="new-quote" element={<NewQuote />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </React.Fragment>
  );
}

export default App;
