const amqp = require('amqplib') // advance message queue librarie 

const message = {number: process.argv[2]}


const connect = async () => {
  try {
    //create connection 
    const connection = await amqp.connect("amqp://localhost:5672");
    // create channel
    const channel = await connection.createChannel();
    // create a queue
    const result = await channel.assertQueue("jobs");
    // send to a queue
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
    // 
    console.log(`jobs send with success ${message.number}`);
  } 
  catch(err){
    console.log(err)
  }
}

connect()