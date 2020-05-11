import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NarBarJesCorp from './components/NavBarJesCorp'
import History from './components/History'
import RealTime from './components/RealTime'
import Graficos from './components/graficos'
// Main


class  App extends Component {
  render(){
    return (
      <Router>
        < NarBarJesCorp/>
        <Route path='/' exact component={RealTime} />
        <Route path='/history' component={History} />
        <Route path='/OBDii' component={Graficos} />
      </Router>
       
    )
  }
}
export default App;