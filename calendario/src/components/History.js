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
      polyline: [],
      line: null,
      viewport: 15,
      max:"5",
      place:"0"

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.act = this.act.bind(this);
    this.getz = this.getz.bind(this);
    this.set_marker = this.set_marker.bind(this);


  }
  render() {
    return (

      <center>
        <div className="col-md-10 ">
          <div className="col-md-14 mb-8" >
            {this._renderMap()}
          </div>
          <center className="card card-body">
            <form className="needs-validation" novalidate>
              <div className="form-row">

                <div className="col-md-4 mb-3">
                  <label for="validationTooltip01"> Start :</label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    name="startDate"
                    showTimeSelect
                    orientation="bottom"
                    timeFormat="HH:mm"
                    timeCaption="time"
                    timeIntervals={30}
                    dateFormat="yyyy-MM-d hh:mm:ss"
                  />
                  <div className="valid-tooltip">
                    Looks good!
                  </div>

                </div>
                <div className="col-md-4 mb-3">
                  <label for="validationTooltip02">End :</label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.endDate}
                    onChange={this.handleChange2}
                    name="endtDate"
                    showTimeSelect
                    orientation="bottom"
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="time"
                    dateFormat="yyyy-MM-d hh:mm:ss"
                  />
                  <div className="valid-tooltip">
                    Looks good!
                  </div>


                </div>
                <div className="col-md-4 mb-3">
                  <button type="submit" className="btn btn-primary mb-2" onClick={this.onFormSubmit}>Search</button>
                </div>

              </div>
              <div className="form-row">
                <div className="col-md-12 mb-2">
                  <label for="customRange2">Example range</label>
                  <input type="range" className="custom-range" min="0" max={this.state.max}
                  step="1"id="customRange2" value={this.state.place}
                   onChange={this.act} onClickCapture={this.set_marker}/>

                </div>

              </div>

            </form>


          </center>


        </div>

      </center>



    )
  }
  set_marker(event){
    this.setState({
      place : event.target.value
    })
    console.log(this.state.place)
    

  }
  act(event){
    this.setState({
      place : event.target.value
    })
    console.log(this.state.place)
  }
  getz() {
    const leafletMap = this.leafletMap.leafletElement;
    console.log(leafletMap.getZoom())
    this.setState({
      viewport: leafletMap.getZoom()
    })
    console.log(this.state.place)
  }


  _renderMap = () => {

    const look =parseInt(this.state.place) 
    const position = this.state.polyline[look];
    return (
      <center>
        <Map
          center={position}
          zoom={this.state.viewport}
          onzoom={this.getz}
          ref={m => { this.leafletMap = m; }}>
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
    let cv = this;

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
    var url = 'http://192.168.1.4:50188/data';
    axios.post(url, {
      horaen,
      fechaen,
      horain,
      fechain
    })
      .then(function (response) {
        cv.setState({
          polyline: response.data,
          max :response.data.length-1
        })
        console.log(cv.state.max)

        

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
