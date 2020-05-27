import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class NavBarJesCorp extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="container">
                    <Link className="navbar-brand" to="/">Jescorp-Location</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item ">
                                <Link className="nav-link" to="/"> Real time </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/history" onClick={alert('Follow the next steps for History\n'+
'1. Select from the menu in the left corner which car you would like to see, ex: car 1 \n'+
'2. Select date on the calendar, ex: Dec 1 2019 \n'+
'3. Move the navigation bar in the bottom to see the marker with the corresppnding RPM value')}>History</Link>
                            </li>
                        

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
