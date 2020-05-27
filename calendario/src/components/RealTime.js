import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'


import "react-datepicker/dist/react-datepicker.css";

export default class RealTime extends Component {
    constructor() {
        super();
        this.state = {
            lng: 0,
            lat: 0,
            lng2: 0,
            lat2: 0,
            fecha: null,
            fecha2: null,
            polyline: [],
            polyline2: [],
            rpmm: 0,
            rpmm2: 0,
            estado: "1",

            viewport: 15
        }
        setInterval(() => this.consulta(), 1000);
        this.consulta();
        this.getz = this.getz.bind(this);
        this.selc = this.selc.bind(this);


    }


    async consulta() {
        const that = this;
        let data = null;
        await fetch('http://127.0.0.1:50188/carro1')
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                if (myJson) {
                    if (myJson.data.length > 0) {
                        
                            that.setState(prevState1 => {
                                const polyline = [...prevState1.polyline];
                                polyline.push([myJson.data[0].latitude, myJson.data[0].longitude,]);
                                return {
                                    polyline,
                                    lng: myJson.data[0].longitude,
                                    lat: myJson.data[0].latitude,
                                    fecha: myJson.data[0].fecha,
                                    rpmm: myJson.data[0].rpm
                                };
                            });




                            console.log(that.state);

                        
                    }
                }
            });
        console.log(data)
        await fetch('http://127.0.0.1:50188/carro2')
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                if (myJson) {
                    if (myJson.data.length > 0) {
                        
                            that.setState(prevState2 => {
                                const polyline2 = [...prevState2.polyline2];
                                polyline2.push([myJson.data[0].latitude, myJson.data[0].longitude,]);
                                return {
                                    polyline2,
                                    lng2: myJson.data[0].longitude,
                                    lat2: myJson.data[0].latitude,
                                    fecha2: myJson.data[0].fecha,
                                    rpmm2: myJson.data[0].rpm
                                };
                            });




                            console.log(myJson.data[0]);

                        
                    }
                }
            });
    }
    selc(event) {

        this.setState({
            estado: event.target.value
        })

    }

    getz() {
        const leafletMap = this.leafletMap.leafletElement;
        console.log(leafletMap.getZoom())
        this.setState({
            viewport: leafletMap.getZoom()
        })
    }
    render() {
        
        let m1
        let m2
        let mark1 = [this.state.lat,this.state.lng]
        let mark2 = [this.state.lat2,this.state.lng2]
        let position
        let l1
        let l2
        if (this.state.estado === "2") {
            position = mark1
            m1 = <Marker position={mark1} >
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
            m2 = null;
            l1 = <Polyline color="teal" positions={this.state.polyline} />;
            l2 = null;


        } else if (this.state.estado === "3") {
            position = mark2
            m2 = <Marker position={mark2} >
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
            m1 = null;
            l2 = <Polyline color="red" positions={this.state.polyline2} />;
            l1=null;
        } else if (this.state.estado === "1") {
            position = this.state.polyline[0]
            m1 = <Marker position={mark1} >
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>;
            m2 = <Marker position={mark2} >
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>;
            l2 = <Polyline color="red" positions={this.state.polyline2} />;
            l1 = <Polyline color="teal" positions={this.state.polyline} />;

        }


        var todo = this.state.fecha
        var todo2 = this.state.fecha2
        var fecha1 = new Date(todo).toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var fecha3 = new Date(todo2).toISOString().replace(/T/, ' ').replace(/\..+/, '');

        return (



            <div className="App">
                <div className="caja">
                    <select class="form-control form-control-sm" value={this.state.estado} name="estado" onChange={this.selc} >
                        <option value="1">Car 1 and 2</option>
                        <option value="2">car 1</option>
                        <option value="3">car 2</option>
                    </select>




                </div>






                <div className="container">


                    <table>
                        <tr>
                            <th>Longitud</th>
                            <th>Latitud</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>RPM</th>
                            <th>Car</th>
                        </tr>
                        {this.state.fecha &&
                            <tr>
                                <td>{this.state.lng}</td>
                                <td>{this.state.lat}</td>
                                <td>{fecha1.split(" ")[0]}</td>
                                <td>{fecha1.split(" ")[1]}</td>
                                <td>{this.state.rpmm}</td>
                                <td>1</td>

                            </tr>
                        }
                        {this.state.fecha2 &&
                            <tr>
                                <td>{this.state.lng2}</td>
                                <td>{this.state.lat2}</td>
                                <td>{fecha3.split(" ")[0]}</td>
                                <td>{fecha3.split(" ")[1]}</td>
                                <td>{this.state.rpmm2}</td>
                                <td>2</td>
                            </tr>
                        }


                    </table>

                </div>
                <div className="container" >
                    <center>
                        <Map center={position} ref={m => { this.leafletMap = m; }}
                            zoom={this.state.viewport} onzoom={this.getz}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="Jesús López, Ena Valbuena"
                            />
                            {m1}
                            {m2}
                            {l1}
                            {l2}

                        </Map>
                    </center>

                </div>





            </div>







        );
    }



}
