import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

import "react-datepicker/dist/react-datepicker.css";


export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 0,
      lat: 0,
      anno: null,
      mes: null,
      dia: null,
      hora: null,
      minu: null,
      sec: null,
      fecha1: null,
      fecha2: null,
      polyline:[],
      line:null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);


  }
  render() {
    return (
      
      <center>
              <div className="col-md-10 ">
        <div >
        {this._renderMap()}
      </div>
        <center className="card card-body">
          <form className="form-inline" >
            <div className="form-group mb-2">
              <label className="form-control form-control-primary">Start</label>
              <DatePicker
                className="form-control"
                selected={this.state.startDate}
                onChange={this.handleChange}
                name="startDate"
                showTimeSelec
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="yyyy-MM-d hh:mm:ss"
              />

            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label className="form-control form-control-primary">End</label>
              <DatePicker
                className="form-control"
                selected={this.state.endDate}
                onChange={this.handleChange2}
                name="endtDate"
                showTimeSelect
                orientation="bottom"
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="yyyy-MM-d hh:mm:ss"
              />

            </div>
            <div className="form-group mb-2">
              <button type="submit" className="btn btn-primary mb-2" onClick={this.onFormSubmit}>Search</button>

            </div>

          </form>

        </center>


      </div>
        
      </center>



    )
  }


  _renderMap = () => {

    const position = this.state.polyline[0];
    return (
      <center>
        <Map center={position} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
          <Polyline color="teal" positions={this.state.polyline} />
        </Map>
      </center>
    )
  }







  onFormSubmit(e) {
    e.preventDefault();
    let cv =this;

    console.log(this.state.startDate)
    //console.log(this.state.endDate)
    var dato = this.state.startDate.toString()
    var fechain = new Date(dato).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0].split("-").map(Number);
    var horain = dato.split(" ")[4].split(":").map(Number)
    console.log(horain)
    console.log(fechain)

    var dato2 = this.state.endDate.toString()
    var fechaen = new Date(dato2).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0].split("-").map(Number);
    var horaen = dato2.split(" ")[4].split(":").map(Number)
    console.log(horaen)
    console.log(fechaen)
    var url = 'http://192.168.1.11:50188/data';
    axios.post(url, {
      horaen,
      fechaen,
      horain,
      fechain
    })
      .then(function (response) {
       cv.setState({
         polyline: response.data
       })

        console.log(cv.state.line);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(this.state.polyline)

  };



  handleChange(date) {
    this.setState({
      startDate: date
    });
    console.log(this.state.starDate)
  };

  handleChange2(date2) {
    this.setState({
      endDate: date2
    });
    console.log(this.state.starDate)
  };
}
