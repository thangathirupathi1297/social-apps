import "./App.css";

import React from "react";


import Routing from './Components/routing'

import {
  BrowserRouter as Router,
} from "react-router-dom";


import Reducer from "./reducers/reducer"

import Navbar from "../src/Components/Navbar";

function App() {
  
  return (

    <Reducer>
      <Router>
        <Navbar />
           <Routing />
      </Router>
      </Reducer>
   
  );
}

export default App;

