import React from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import ReactShadowScroll from 'react-shadow-scroll';
import DatePicker from "react-datepicker";
import axios from 'axios';
 
import "react-datepicker/dist/react-datepicker.css";



class  App extends React.Component{
  constructor(){
    super();
    this.state = {
      lng : 0,
      lat : 0,
      anno:null,
      mes:null,
      dia:null,
      hora:null,
      minu:null,
      sec:null,
      fecha1:null,
      fecha2:null,
      startDate: null,
      endDate:null,
      polyline : []
    }
    setInterval(()=>this.consulta(), 1000);
    this.consulta();
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  

  async consulta () {
    const that = this;
    let data=null;
    await fetch('http://192.168.1.6:50188')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      if(myJson){
        if(myJson.data.length > 0){
          if(myJson.data[0].latitude !== that.state.lat){
            that.setState(prevState => {
              const polyline = [...prevState.polyline];
              polyline.push([myJson.data[0].latitude, myJson.data[0].longitude, ]);
              return {
                polyline, 
                lng : myJson.data[0].longitude, 
                lat : myJson.data[0].latitude,
                anno:myJson.data[0].anno,
                mes:myJson.data[0].mes,
                dia:myJson.data[0].dia,
                hora:myJson.data[0].hora,
                minu:myJson.data[0].minuto,
                sec:myJson.data[0].segundo,
              };
            });
            var string_dato=myJson.data[0].anno.toString()+
            '-'+myJson.data[0].mes.toString()+
            '-'+myJson.data[0].dia.toString()+
            ' '+myJson.data[0].hora.toString()+
            ':'+myJson.data[0].minuto.toString()+
            ':'+myJson.data[0].segundo.toString();
            var d2=new Date(string_dato).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            var  d = new Date(string_dato).toString();
           console.log(d);
           that.setState({
            fecha1:d,
            fecha2:d2
            }); 


           console.log(myJson.data[0]);

          }
        }        
      }
    });
    console.log(data)
  }
 

  render(){

    
    return (
     
        
     <ReactShadowScroll>
       <div className="App">
       <center>
       <p></p>
       <h1>JES CORP</h1>
       <p></p>
       <p>Ubicación de la Syrus 3G</p>
       <p></p>

       </center>
        <table>
          <tr>
            <th>Longitud</th>
            <th>Latitud</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
          {this.state.fecha1 &&
            <tr>
              <td>{this.state.lng}</td>
              <td>{this.state.lat}</td>
              <td>{this.state.fecha2.split(" ")[0]}</td>
              <td>{this.state.fecha1.split(" ")[4]}</td>
            </tr>
          }

          
        </table>

        

        {this._renderMap()}

       
        
      </div>
      
      <div>
      <center>
      
        <div className="calendarios" >
          <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name="startDate"
              showTimeSelect
              orientation="bottom"
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="yyyy-MM-d hh:mm:ss"
          /> hasta : 
          <DatePicker
              selected={ this.state.endDate }
              onChange={ this.handleChange2 }
              name="endtDate"
              showTimeSelect
              orientation="bottom"

              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="yyyy-MM-d hh:mm:ss"
          />
          <button className="btn btn-primary"
          onClick= {this.onFormSubmit}>Show Date</button>
        </div>
      

        
       </center>
      </div>
        <div>

       
      </div>
       </ReactShadowScroll>
        
        
    );
  }
  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate)
    //console.log(this.state.endDate)
    var dato=this.state.startDate.toString()
    var fechain=new Date(dato).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0].split("-").map(Number);
    var horain=dato.split(" ")[4].split(":").map(Number)
    console.log(horain)
    console.log(fechain)

    var dato2=this.state.endDate.toString()
    var fechaen=new Date(dato2).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0].split("-").map(Number);
    var horaen=dato2.split(" ")[4].split(":").map(Number)
    console.log(horaen)
    console.log(fechaen)
    var url = 'http://192.168.1.6:50188/data';
    axios.post(url, {
      horaen,
      fechaen,
      horain,
      fechain
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
   
  };
  


  handleChange(date){
    this.setState({
      startDate: date
    });
    console.log(this.state.starDate)
  };

  handleChange2(date2){
    this.setState({
      endDate: date2
    });
    console.log(this.state.starDate)
  };

  
  _renderMap = () => {
    const position = [this.state.lat, this.state.lng];
    return(
      <center>
      <Map center={position} zoom = {13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
        <Polyline color= "teal" positions={this.state.polyline} />
      </Map>
      </center>
    )
  }
}





export default App;