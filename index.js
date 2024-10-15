const express=require("express") //Llamar a la dependencia express
const app =express() //Instanciar un API
const port=8080
app.use(express.json())

var valorActual=0

const mqtt = require('mqtt');
const brokerUrl = 'mqtts://ac7771abeee64d5dada1b1d3062f87f6.s1.eu.hivemq.cloud:8883'; // Este es un broker público para pruebas
const options = {
    clientId: 'ID',
    username: 'User01',  // tiempo en segundos para mantener la conexión viva
    password: 'Password123',
    port: 8883,
    clean: true
};
const client = mqtt.connect(brokerUrl, options);


client.on('connect', async() => {
    console.log('Conectado a HiveMQ Broker');
    
    // Suscribirse a un tópico
    client.subscribe('Prueba', async(err) => {
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
    valorActual=parseInt(message.toString());
});

app.get("/Datos",(req,res)=>{
    res.send({Dato:valorActual})
})

app.listen(port,()=>{
    console.log(`Comunicacion por el puerto ${port.toString()}`)
})