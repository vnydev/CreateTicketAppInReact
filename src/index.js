import React from "react";
import ReactDOM from "react-dom";
import Home from "./Components/Home.jsx";
import Ticket from "./Components/Ticket.jsx";
import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/ticket/:id" component={Ticket} />
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
