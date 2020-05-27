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


app.get('/carro1', (req,res) =>{
    var con = dbConnections();
    con.query('SELECT * FROM location2 where carro = "carro_1" order by ID desc limit 1', function (err, results) {
        console.log(results)
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

app.get('/carro2', (req,res) =>{
    var con = dbConnections();
    con.query('SELECT * FROM location2 where carro = "carro_2" order by ID desc limit 1', function (err, results) {
        console.log(results)
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
    var sql = "INSERT INTO `location2` (`latitude`,`longitude`,`fecha`,`carro`) VALUES ?;";
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
        values = [latitud,longitud,todo,"carro_1"]

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
   var sql1='select `latitude`,`longitude`,`rpm`,`fecha`from `location2`'  
   var sql2 =' where fecha between '
   var sql5='AND `carro`= "carro_1"'


   var sql3=req.body.fechain[0]+'-'+req.body.fechain[1]+'-'+req.body.fechain[2]+' '+req.body.horain[0]+':'+req.body.horain[1]+':'+req.body.horain[2]
   var sql4=req.body.fechaen[0]+'-'+req.body.fechaen[1]+'-'+req.body.fechaen[2]+' '+req.body.horaen[0]+':'+req.body.horaen[1]+':'+req.body.horaen[2]
   var sql=sql1+sql2+'"'+sql3+'"'+' AND '+'"'+sql4+'"'+  sql5
   console.log(sql)
   con.query(sql, (err, result)=>{
    if(err) throw err;
    var v = [];
    var lat = result.map(function(obj) {return obj.latitude;});
    var lon = result.map(function(obj) {return obj.longitude;});
    var rpm=result.map(function(obj) {return obj.rpm;});
    var fecha=result.map(function(obj) {return obj.fecha;});
    for (var c =0 ; c<=lat.length -1;c++){
        v[c]=[lat[c],lon[c]]
        rpm[c] ={y:rpm[c],x:c}
        fecha[c]=fecha[c].toISOString().replace(/T/, ' ').replace(/\..+/, '') 

    }
     
   
   var  respu={coor1:v,
               rpm1:rpm, fech1 : fecha  }

            console.log(respu);

           res.send(respu);
           con.end();
    });
   

});
app.post('/data-time', function(req, res){
    var con = dbConnections();
	console.log(req.body); 
   var sql1='select `latitude`,`longitude`,`rpm`,`fecha`from `location2`'  
   var sql2 =' where fecha between '
   var sql5='AND `carro`= "carro_2"'


   var sql3=req.body.fechain[0]+'-'+req.body.fechain[1]+'-'+req.body.fechain[2]+' '+req.body.horain[0]+':'+req.body.horain[1]+':'+req.body.horain[2]
   var sql4=req.body.fechaen[0]+'-'+req.body.fechaen[1]+'-'+req.body.fechaen[2]+' '+req.body.horaen[0]+':'+req.body.horaen[1]+':'+req.body.horaen[2]
   var sql=sql1+sql2+'"'+sql3+'"'+' AND '+'"'+sql4+'"'+  sql5
   console.log(sql)
   con.query(sql, (err, result)=>{
    if(err) throw err;
    var v = [];
    var lat = result.map(function(obj) {return obj.latitude;});
    var lon = result.map(function(obj) {return obj.longitude;});
    var rpm=result.map(function(obj) {return obj.rpm;});
    var fecha=result.map(function(obj) {return obj.fecha;});
    for (var c =0 ; c<=lat.length -1;c++){
        v[c]=[lat[c],lon[c]]
        rpm[c] ={y:rpm[c],x:c}
        fecha[c]=fecha[c].toISOString().replace(/T/, ' ').replace(/\..+/, '') 

    }
     
   
   var  respu={coor2:v,
               rpm2:rpm, fech2 : fecha  }

            console.log(respu);

           res.send(respu);
           con.end();
    });
   

});
app.post('/obd', function(req, res){
    var con = dbConnections();
	console.log(req.body); 
   var sql1='select * from `RPM`'  
   var sql2 =' where `fecha` between '

   var sql3=req.body.fechain[0]+'-'+req.body.fechain[1]+'-'+req.body.fechain[2]+' '+req.body.horain[0]+':'+req.body.horain[1]+':'+req.body.horain[2]
   var sql4=req.body.fechaen[0]+'-'+req.body.fechaen[1]+'-'+req.body.fechaen[2]+' '+req.body.horaen[0]+':'+req.body.horaen[1]+':'+req.body.horaen[2]
   var sql=sql1+sql2+'"'+sql3+'"'+' AND  '+'"'+sql4+'"'
   console.log(sql)
   con.query(sql, (err, result)=>{
    var fecha = result.map(function(obj) {return obj.fecha;});
    var rpm  = result.map(function(obj) {return obj.rpm;});

    for (var c =0 ; c<=fecha.length -1;c++){
        fecha[c]=fecha[c].toISOString().replace(/T/, ' ').replace(/\..+/, '') 
        rpm[c] ={y:rpm[c],x:c}

    }
    var dato ={fehca: fecha,
                rpm : rpm }

    console.log(dato);
    res.send(dato)
    
    con.end(); 
    

});
});

app.post('/datarpm', function(req, res){
    var con = dbConnections();
    var sql = "INSERT INTO `location2` (`latitude`,`longitude`,`fecha`,`rpm`,`carro`) VALUES ?;";
    
    console.log(req.body); 
    var data=[req.body.lati,req.body.longi,req.body.dates,req.body.rpms,req.body.car_]
    data=[data];
    con.query(sql, [data],function (err, result) {
    if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    }); 
    res.send('ok')
    con.end(); 

});
server.bind(50001);
