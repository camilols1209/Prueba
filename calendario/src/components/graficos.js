import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios';
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

import "react-datepicker/dist/react-datepicker.css";


export default class graficos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
            rpmm: [{x:0, y:0}],
            fecha:  [""],
            viewport: 15,
            max: "5",
            place: "0"

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.act = this.act.bind(this);
        this.set_marker = this.set_marker.bind(this);


    }
    render() {
        var cc=parseInt(this.state.place)
        var marker =[{x:0, y:0}]
        console.log(marker)
        
            marker=[{x:this.state.rpmm[cc].x ,y:this.state.rpmm[cc].y}]

        
        
        return (

            <center>
                <div className="col-md-10 ">
                    <div className="col-md-14 mb-8" >
                        <center className="card card-body">



                            <XYPlot width={1050} height={420}  >
                                <VerticalGridLines className="form-control" />
                                <HorizontalGridLines className="form-control" />
                                <XAxis className="form-control" />
                                <YAxis className="form-control" />
                                <LineSeries
                                    className="linemark-series-example"
                                    style={{
                                        strokeWidth: '3px'
                                    }}
                                    lineStyle={{ stroke: 'blue' }}
                                    markStyle={{ stroke: 'blue' }}
                                    data={this.state.rpmm}
                                />
                                <MarkSeries
                                    className="mark-series-example"
                                    color='red'
                                    strokeWidth={2}
                                    data={marker} />

                            </XYPlot>




                        </center>

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
                                    <label for="customRange2"> RPM:{" "+this.state.rpmm[this.state.place].y} {" "+"Fecha:"+this.state.fecha[this.state.place]} </label>
                                    <input type="range" className="custom-range" min="0" max={this.state.max}
                                        step="1" id="customRange2" value={this.state.place}
                                        onChange={this.act} onClickCapture={this.set_marker} />

                                </div>

                            </div>

                        </form>


                    </center>


                </div>

            </center>



        )
    }
    set_marker(event) {
        this.setState({
            place: event.target.value
        })
        console.log(this.state.place)


    }
    act(event) {
        this.setState({
            place: event.target.value
        })
        console.log(this.state.place)
    }
  
    onFormSubmit(e) {
        e.preventDefault();
        let cv = this;

        console.log(this.state.startDate)
        //console.log(this.state.endDate)
        var dato = this.state.startDate.toString()
        var fechain = new Date(dato).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0].split("-");
        var horain = dato.split(" ")[4].split(":")
        console.log(horain)
        console.log(fechain)

        var dato2 = this.state.endDate.toString()
        var fechaen = new Date(dato2).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0].split("-");
        var horaen = dato2.split(" ")[4].split(":")
        console.log(horaen)
        console.log(fechaen)
        var url = 'http://192.168.1.5:50188/obd';
        axios.post(url, {
            horaen,
            fechaen,
            horain,
            fechain
        })
            .then(function (response) {
                console.log(response)
                cv.setState({
                    fecha:response.data.fehca,
                    rpmm:response.data.rpm,
                    max:response.data.rpm.length-1
                })
                console.log(cv.state.fecha+cv.state.rpmm)
                
            



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

