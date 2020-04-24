import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'


import "react-datepicker/dist/react-datepicker.css";

export default class RealTime extends Component {
    constructor() {
        super();
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
            polyline: []
        }
        setInterval(() => this.consulta(), 1000);
        this.consulta();

    }


    async consulta() {
        const that = this;
        let data = null;
        await fetch('http://192.168.1.11:50188')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson) {
                    if (myJson.data.length > 0) {
                        if (myJson.data[0].latitude !== that.state.lat) {
                            that.setState(prevState => {
                                const polyline = [...prevState.polyline];
                                polyline.push([myJson.data[0].latitude, myJson.data[0].longitude,]);
                                return {
                                    polyline,
                                    lng: myJson.data[0].longitude,
                                    lat: myJson.data[0].latitude,
                                    anno: myJson.data[0].anno,
                                    mes: myJson.data[0].mes,
                                    dia: myJson.data[0].dia,
                                    hora: myJson.data[0].hora,
                                    minu: myJson.data[0].minuto,
                                    sec: myJson.data[0].segundo,
                                };
                            });
                            var string_dato = myJson.data[0].anno.toString() +
                                '-' + myJson.data[0].mes.toString() +
                                '-' + myJson.data[0].dia.toString() +
                                ' ' + myJson.data[0].hora.toString() +
                                ':' + myJson.data[0].minuto.toString() +
                                ':' + myJson.data[0].segundo.toString();
                            var d2 = new Date(string_dato).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                            var d = new Date(string_dato).toString();
                            console.log(d);
                            that.setState({
                                fecha1: d,
                                fecha2: d2
                            });


                            console.log(myJson.data[0]);

                        }
                    }
                }
            });
        console.log(data)
    }


    render() {


        return (


            <div className="App">




                <div className="container">
                    
                    
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

                </div>
                <div className="container" >
                    {this._renderMap()}
                </div>





            </div>







        );
    }


    _renderMap = () => {
        const position = [this.state.lat, this.state.lng];
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

}
