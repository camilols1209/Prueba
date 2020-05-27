import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

import "react-datepicker/dist/react-datepicker.css";
import 'react-vis/dist/style.css';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  MarkSeries
} from 'react-vis';


export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha1: [""],
      fecha2: [""],
      rpmm1: [{ x: 0, y: 0 }],
      rpmm2: [{ x: 0, y: 0 }],
      polyline2: [],
      fecha: [""],
      estado: "1",

      polyline: [],
      viewport: 15,
      max1: "5",
      max2: "5",
      place2: "0",
      place: "0"

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.act = this.act.bind(this);
    this.act2 = this.act2.bind(this);
    this.getz = this.getz.bind(this);
    this.set_marker = this.set_marker.bind(this);
    this.set_marker2 = this.set_marker2.bind(this);
    this.date_time = this.date_time.bind(this);
    this.selc = this.selc.bind(this);


  }
  render() {
    let  cc1=parseInt(this.state.place)
    let  cc2=parseInt(this.state.place2)
    let g1
    let l1=null;
    let barra1
    let mark1
    let mar1=[{x:this.state.rpmm1[cc1].x ,y:this.state.rpmm1[cc1].y}];
    let mar2=[{x:this.state.rpmm2[cc2].x ,y:this.state.rpmm2[cc2].y}];
    let rp1
    let f1
    let tx1
    let txr1
 
    if((this.state.estado === "1") || (this.state.estado === "2")){
      rp1=<p>{this.state.rpmm1[cc1].y}</p>
      txr1=<p>RPM 1</p>
      f1=<p>{this.state.fecha1[cc1]}</p>
      tx1=<p>Date 1</p>

     

      g1=<LineSeries
                      className="linemark-series-example"
                      style={{
                        strokeWidth: '3px'
                      }}
                      lineStyle={{ stroke: 'blue' }}
                      markStyle={{ stroke: 'blue' }}
                      data={this.state.rpmm1}
                    />;

      l1=<Polyline color="teal" positions={this.state.polyline} />;
      barra1= <input type="range" className="custom-range" min="0" max={this.state.max1}
      step="1" id="customRange2" value={this.state.place}
      onChange={this.act} onClickCapture={this.set_marker} />;

      mark1=<MarkSeries
      className="mark-series-example"
      color='red'
      strokeWidth={2}
      data={mar1} />;

    }else{
      g1=null;
      l1=null;
      barra1=null;
      mark1=null;

    }
    let l2 =null;
    let g2
    let barra2
    let mark2
    let rp2
    let f2
    let tx2
    let txr2
    if((this.state.estado === "1") || (this.state.estado === "3")){
      rp2=<p>{this.state.rpmm2[cc2].y}</p>
      txr2=<p>RPM 2</p>
      f2=<p>{this.state.fecha2[cc2]}</p>
      tx2=<p>Date 2</p>

      g2=<LineSeries
      className="linemark-series-example"
      color='red'
      style={{
        strokeWidth: '3px'
      }}
      lineStyle={{ stroke: 'blue' }}
      markStyle={{ stroke: 'blue' }}
      data={this.state.rpmm2}


    />;
    l2=<Polyline color="red" positions={this.state.polyline2} />;

    barra2=<input type="range" className="custom-range" min="0" max={this.state.max2}
    step="1" id="customRange2" value={this.state.place2}
    onChange={this.act2} onClickCapture={this.set_marker2} />;
    mark2=<MarkSeries
    className="mark-series-example"
    color='green'
    strokeWidth={2}
    data={mar2} />;

    }else{
      g2=null;
      l2=null;
      barra2=null;
    }


    return (


      <div>
        <div className="caja">
          <select class="form-control form-control-sm" value={this.state.estado} name="estado" onChange={this.selc} >
            <option value="1">Car 1 and 2</option>
            <option value="2">car 1</option>
            <option value="3">car 2</option>
          </select>

        
          {tx1}
          {f1}
          {txr1}
          {rp1}
          {tx2}
          {f2}
          {txr2}
          {rp2}


        </div>
       
        <div>
          <center>
            <div className="col-md-10 ">
              <div className="col-md-14 mb-3" >
                {this._renderMap(l1,l2)}
              </div>
              <center className="card card-body">

                <XYPlot width={950} height={160}  >
                  <VerticalGridLines className="form-control" />
                  <HorizontalGridLines className="form-control" />
                  <XAxis className="form-control" />
                  <YAxis className="form-control" />
                  
                    {g1}
                    {g2}
                  {mark1}
                  {mark2}
                  

                </XYPlot>




              </center>

              <center className="card card-body-sm">
                <form className="needs-validation" novalidate>
                  <div className="form-row">

                    <div className="col-md-4 mb-2">
                      <label for="validationTooltip01"> Start  :</label>
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
                    <div className="col-md-4 mb-2">
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
                     {barra1}

                    </div>

                  </div>

                  <div className="form-row">
                    <div className="col-md-12 mb-2">
                      
                      {barra2}
                    </div>

                  </div>

                </form>


              </center>
            </div>




          </center>
        </div>
      </div>



    )
  }
  selc(event) {

    this.setState({
      estado: event.target.value
    })

  }
  set_marker(event) {
    this.setState({
      place: event.target.value
    })
    console.log(this.state.place)


  }
  set_marker2(event) {
    this.setState({
      place2: event.target.value
    })
    console.log(this.state.place2)


  }
  act(event) {
    this.setState({
      place: event.target.value
    })
    console.log(this.state.place)
  }
  act2(event) {
    this.setState({
      place2: event.target.value
    })
    console.log(this.state.place2)
  }
  getz() {
    const leafletMap = this.leafletMap.leafletElement;
    console.log(leafletMap.getZoom())
    this.setState({
      viewport: leafletMap.getZoom()
    })
    console.log(this.state.place)
  }


  _renderMap = (l1,l2) => {

    let look = parseInt(this.state.place)
    let look2=parseInt(this.state.place2)
    let position 
    let mark1=this.state.polyline[look];
    let mark2=this.state.polyline2[look2];
    let m1
    let m2
  
   
    if(this.state.estado === "2") {
      position=mark1
     m1= <Marker position={mark1} >
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
       m2=null;
      

    }else if (this.state.estado ==="3"){
      position=mark2
      m2= <Marker position={mark2} >
             <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
           </Marker>
      m1=null;
    }else if(this.state.estado ==="1"){
      position=this.state.polyline[0]
      m1= <Marker position={mark1} >
             <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
           </Marker>;
      m2= <Marker position={mark2} >
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
      </Marker>;

    }
    
    
    
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
          {m1}
          {m2}

          {l1}
          {l2}
        </Map>
      </center>
    )
  }



  date_time(horain, horaen, fechain, fechaen) {
    const h = this
    var url = 'http://127.0.0.1:50188/data-time';
    axios.post(url, {
      horaen,
      fechaen,
      horain,
      fechain
    })
      .then(function (response) {

        console.log(response.data.rpm2)
        h.setState({
          rpmm2: response.data.rpm2,
          fecha2: response.data.fech2,
          polyline2: response.data.coor2,
          max2: response.data.coor2.length - 1

        })



      })
      .catch(function (error) {
        console.log(error);
      });


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
    this.date_time(horain, horaen, fechain, fechaen)
    var url = 'http://127.0.0.1:50188/data';
    axios.post(url, {
      horaen,
      fechaen,
      horain,
      fechain
    })
      .then(function (response) {
        cv.setState({
          rpmm1: response.data.rpm1,
          fecha1: response.data.fech1,
          polyline: response.data.coor1,
          max1: response.data.coor1.length - 1
        })
        console.log(response)



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
