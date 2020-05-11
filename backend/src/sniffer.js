const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dgram = require('dgram');
var server = dgram.createSocket('udp4');
const bodyParser = require('body-parser');
var dbConnections = require(path.join(__dirname,'config/db.Connections'));
app.use(cors());

app.use(bodyParser.json());


app.get('/', (req,res) =>{
    var con = dbConnections();
    con.query('SELECT * FROM location order by ID desc limit 1', function (err, results) {
        if (err){
            return res.send(err)
        }else{
            return res.send({
                data: results
            })
        }
    });
    con.end();
});


app.listen(50188, () =>{
    console.log('On');
});


server.on('message', (msg,rinfo) =>{
    var mes = msg.toString();
    console.log(msg.toString())
   var con = dbConnections();
    var sql = "INSERT INTO `location` (`latitude`,`longitude`,`anno`,`mes`,`dia`,`hora`,`minuto`,`segundo`) VALUES ?;";
    console.log(mes.substring(1,4));
    if (mes.substring(1, 4) == "REV") {
        semanas = mes.substring(6, 10);
        semana = parseInt(semanas);
        dia = mes.substring(10, 11);
        dian = parseInt(dia);
        hora = mes.substring(11, 16);
        horan = parseInt(hora);
        semanan = (semana * 604800 + horan + 315964800 + dian * 86400 - 18000)*1000;
        todo =new Date(semanan).toISOString().replace(/T/, ' ').replace(/\..+/, '') ;
        latitud = mes.substring(17, 19) +  "." + mes.substring(19, 24);
        longitud = mes.substring(24, 25) + mes.substring(26, 28) + "." + mes.substring(28, 33);
        
    }
        esto=todo.split(" ")
        date=esto[0].split('-')
        time=esto[1].split(':')

        values = [latitud,longitud].concat(date,time);
        values[0]=parseFloat(values[0]);
        values[1]=parseFloat(values[1]);
        values[2]=parseInt(values[2]);
        values[3]=parseInt(values[3]);
        values[4]=parseInt(values[4]);
        values[5]=parseInt(values[5]);
        values[6]=parseInt(values[6]);
        values[7]=parseInt(values[7]);

        datt=[values];
        console.log(datt)
        con.query(sql, [datt],function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    }); 
   con.end(); 
});
app.post('/data', function(req, res){
    var con = dbConnections();
	console.log(req.body); 
   var sql1='select `latitude`,`longitude` from `location`'  
   var sql2 =' where concat(`anno`,"-",`mes`,"-",`dia`," ",`hora`,":",`minuto`,":",`segundo`) between '

   var sql3=req.body.fechain[0]+'-'+req.body.fechain[1]+'-'+req.body.fechain[2]+' '+req.body.horain[0]+':'+req.body.horain[1]+':'+req.body.horain[2]
   var sql4=req.body.fechaen[0]+'-'+req.body.fechaen[1]+'-'+req.body.fechaen[2]+' '+req.body.horaen[0]+':'+req.body.horaen[1]+':'+req.body.horaen[2]
   var sql=sql1+sql2+'"'+sql3+'"'+' AND '+'"'+sql4+'"'
   console.log(sql)
   con.query(sql, (err, result)=>{
    if(err) throw err;
    var v = [];
    var lat = result.map(function(obj) {return obj.latitude;});
    var lon = result.map(function(obj) {return obj.longitude;});
    for (var c =0 ; c<=lat.length -1;c++){
        v[c]=[lat[c],lon[c]]

    }

    
    console.log(result);
    console.log(lat);
    console.log(lon);
    console.log(v);
    
    
    res.send(v);
    con.end(); 
    

});
});
app.post('/data-time', function(req, res){
    var con = dbConnections();
	console.log(req.body); 
    var sql1='select concat(`anno`,"-",`mes`,"-",`dia`," ",`hora`,":",`minuto`,":",`segundo`)as cv from `location`'  
   var sql2 =' where concat(`anno`,"-",`mes`,"-",`dia`," ",`hora`,":",`minuto`,":",`segundo`) between '

   var sql3=req.body.fechain[0]+'-'+req.body.fechain[1]+'-'+req.body.fechain[2]+' '+req.body.horain[0]+':'+req.body.horain[1]+':'+req.body.horain[2]
   var sql4=req.body.fechaen[0]+'-'+req.body.fechaen[1]+'-'+req.body.fechaen[2]+' '+req.body.horaen[0]+':'+req.body.horaen[1]+':'+req.body.horaen[2]
   var sql=sql1+sql2+'"'+sql3+'"'+' AND '+'"'+sql4+'"'
   console.log(sql)
   con.query(sql, (err, result)=>{

    var lat = result.map(function(obj) {return obj.cv;});

    
    console.log(lat)
    res.send(lat)
    
    
    con.end(); 
    

});
});
app.post('/obd', function(req, res){
    var con = dbConnections();
	console.log(req.body); 
   var sql1='select * from `RPMCV`'  
   var sql2 =' where `fecha` >= '

   var sql3=req.body.fechain[0]+'-'+req.body.fechain[1]+'-'+req.body.fechain[2]+' '+req.body.horain[0]+':'+req.body.horain[1]+':'+req.body.horain[2]
   var sql4=req.body.fechaen[0]+'-'+req.body.fechaen[1]+'-'+req.body.fechaen[2]+' '+req.body.horaen[0]+':'+req.body.horaen[1]+':'+req.body.horaen[2]
   var sql=sql1+sql2+'"'+sql3+'"'+' AND `fecha` <=  '+'"'+sql4+'"'
   console.log(sql)
   con.query(sql, (err, result)=>{
    
    
    console.log(result);
    
    con.end(); 
    

});
});


server.bind(50001);
