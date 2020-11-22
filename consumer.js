
const amqp = require('amqplib') // advance message queue librarie 

const connect = async () => {
  try {
    //create connection 
    const connection = await amqp.connect("amqp://localhost:5672");
    // create channel
    const channel = await connection.createChannel();
    // create a queue or get queue
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", message => {
      const receive = JSON.parse(message.content.toString());
      console.log(receive);
      console.log(receive.number);
      if(receive.number == 7){
        channel.ack(message)
      }
    })
    console.log("Waiting for message")

  } 
  catch(err){
    console.log(err)
  }
}

connect()