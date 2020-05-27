import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NarBarJesCorp from './components/NavBarJesCorp'
import History from './components/History'
import RealTime from './components/RealTime'
// Main


class  App extends Component {
  render(){
    return (
      <Router>
        < NarBarJesCorp/>
        <Route path='/' exact component={RealTime} />
        <Route path='/history' component={History} />
      </Router>
       
    )
  }
}
export default App;