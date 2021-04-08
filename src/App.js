import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NewsContainer from "./components/news-container";
import Header from "./components/header";
import "./App.scss";
import NewsDetails from "./components/news-details";
import NotFound from "./components/notfound";

function App() {
  return (
    <React.Fragment>
      <Router>
        <main className="main">
          <Header />
          <div className="container py-5">
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <NewsContainer {...props} />}
              />
              <Route
                path="/news-details/:id"
                render={(props) => <NewsDetails {...props} />}
              />
              <Route path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
