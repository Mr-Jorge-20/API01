const express=require("express") //Llamar a la dependencia express
const app =express() //Instanciar un API
const port=8080
app.use(express.json())

var Val1=""
var Val2=""
var Val3=""
var Val4=""
var Val5=""
var Val6=""
var Val7=""
var Val8=""
var Val9=""
var Val10=""
var Val11=""
var Val12=""
var Val13=""
var Val14=""
var Val15=0
var Val16=0


const mqtt = require('mqtt');
const brokerUrl = 'mqtts://ac7771abeee64d5dada1b1d3062f87f6.s1.eu.hivemq.cloud:8883'; // Este es un broker público para pruebas
const options = {
    clientId: 'ID02',
    username: 'User01',  // tiempo en segundos para mantener la conexión viva
    password: 'Password123',
    port: 8883,
    clean: true,
    keepalive: 120,
};
let client = mqtt.connect(brokerUrl, options);

function obtenerDatos(msg){
  let posiciones = []
  let datos=[]
  for(let i=0;i<msg.length;i++){
    if(msg[i]==','){
      posiciones.push(i)
    }
  }
  for(let j=0;j<(posiciones.length-1);j++){
    datos.push(msg.substring(posiciones[j]+1,posiciones[j+1]))
  }
  return datos
}

client.once('connect', async() => {
    console.log('Conectado a HiveMQ Broker');
    
    // Suscribirse a un tópico
    client.subscribe('Mensaje', async(err) => {
      if (!err) {
        console.log('Suscripción exitosa al Topico');
      }
      else{
        console.log("Fallo")
      }
    });
});

client.on('message', async(topic, message) => {
    console.log(`Mensaje recibido de ${topic}: ${message.toString()}`);

    let valores=obtenerDatos(message.toString());
    Val1=parseInt(valores[0]);
    Val2=parseInt(valores[1]);
    Val3=parseInt(valores[2]);
    Val4=parseInt(valores[3]);
    Val5=parseInt(valores[4]);
    Val6=parseInt(valores[5]);
    Val7=parseInt(valores[6]);
    Val8=parseInt(valores[7]);
    Val9=parseInt(valores[8]);
    Val10=parseInt(valores[9]);
    Val11=parseInt(valores[10]);
    Val12=parseInt(valores[11]);
    Val13=parseInt(valores[12]);
    Val14=valores[13];

    var mensaje=","+Val15.toString()+","+Val16.toString()+","

    client.publish('Datos',mensaje,{qos:0},async(err) => {
      if (!err) {
        console.log('Envio de datos exitosa');
      }
      else{
        console.log("Fallo")
      }
    })
});

app.get("/Datos",(req,res)=>{
    res.send({Dato1:Val1,Dato2:Val2,Dato3:Val3,Dato4:Val4,
              Dato5:Val5,Dato6:Val6,Dato7:Val7,Dato8:Val8,
              Dato9:Val9,Dato10:Val10,Dato11:Val11,Dato12:Val12,
              Dato13:Val13,Dato14:Val14,
    })
})

app.get("/Datos2",(req,res)=>{
  res.send({Dato15:Val15,Dato16:Val16})
})


app.put("/Datos2",(req,res)=>{
  //var valorActual2=parseInt(req.body.Dato10.toString());
  console.log("Cambio hecho")

  Val15=parseInt(req.body.Dato15.toString())
  Val16=parseInt(req.body.Dato16.toString())

  res.send({Dato15:Val15,Dato16:Val16})
  /*
  client.publish("Prueba2", valorActual2, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Error al publicar el mensaje' });
    }

    res.status(200).send({ success: true, message: 'Mensaje publicado correctamente' });
  });*/



  //res.send({Dato:valorActual2})
})




app.listen(port,()=>{
    console.log(`Comunicacion por el puerto ${port.toString()}`)
})
