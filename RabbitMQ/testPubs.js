const amqp = require('amqplib');
const readline = require('readline');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'wadahPesan';
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Masukkan pesan yang akan dikirim: ', async (message) => {
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent: ${message}`);
    
    rl.close();
    connection.close();
    process.exit(0);
    });
} catch (error) {
    console.error(error);
    process.exit(1);
}
}

connect();
