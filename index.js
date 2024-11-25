const express=require("express") //Llamar a la dependencia express
const app =express() //Instanciar un API
const port=8080
app.use(express.json())

var valorActual=0
var valorActual2=0
var Val1=0
var Val2=""

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


client.on('connect', async() => {
    console.log('Conectado a HiveMQ Broker');
    
    // Suscribirse a un tópico
    client.subscribe('#', async(err) => {
      if (!err) {
        console.log('Suscripción exitosa a Prueba');
      }
      else{
        console.log("Fallo")
      }
    });
});

client.on('message', async(topic, message) => {
    console.log(`Mensaje recibido de ${topic}: ${message.toString()}`);
    //console.log(`${message.toString()}`)
    //valorActual=0
    if (topic=="DatoInt"){
      Val1=parseInt(message.toString())
    }
    if (topic=="DatoBool"){
      Val2=message.toString()
    }
    //valorActual=parseInt(message.toString());
});

app.get("/Datos",(req,res)=>{
    res.send({Dato1:Val1,Dato2:Val2})
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
