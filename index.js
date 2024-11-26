const express=require("express") //Llamar a la dependencia express
const app =express() //Instanciar un API
const port=8080
app.use(express.json())

var valorActual=0
var valorActual2=0
var Val1=""
var Val2=""
var Val3=""
var Val4=""

const mqtt = require('mqtt');
const brokerUrl = 'mqtts://ac7771abeee64d5dada1b1d3062f87f6.s1.eu.hivemq.cloud:8883'; // Este es un broker público para pruebas
const options = {
    clientId: 'ID02',
    username: 'User01',  // tiempo en segundos para mantener la conexión viva
    password: 'Password123',
    port: 8883,
    clean: true
};
const client = mqtt.connect(brokerUrl, options);

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

client.on('connect', async() => {
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
    Val1=valores[0];
    Val2=valores[1];
    Val3=valores[2];
    Val4=valores[3];
});

app.get("/Datos",(req,res)=>{
    res.send({Dato1:Val1,Dato2:Val2,Dato3:Val3,Dato4:Val4})
})


app.put("/Datos2",(req,res)=>{
  var valorActual2=parseInt(req.body.Dato.toString());
  console.log(valorActual2)
  /*
  client.publish("Prueba2", valorActual2, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Error al publicar el mensaje' });
    }

    res.status(200).send({ success: true, message: 'Mensaje publicado correctamente' });
  });*/



  res.send({Dato:valorActual2})
})




app.listen(port,()=>{
    console.log(`Comunicacion por el puerto ${port.toString()}`)
})
