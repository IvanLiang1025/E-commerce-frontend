import React from 'react';
import Routes from "./routes";
import Menu from "./common/menu";
import {BrowserRouter} from "react-router-dom";

// import {Link, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu></Menu>
        <Routes></Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
