const amqp = require('amqplib');

async function connect() {
try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'wadahPesan';

    await channel.assertQueue(queue);
    channel.consume(queue, (message) => {
    console.log(`Received message: ${message.content.toString()}`);
    }, { noAck: true });

    console.log('Waiting for messages... Press CTRL+C to exit.');

    process.on('SIGINT', () => {
    connection.close();
    process.exit(0);
    });
} catch (error) {
    console.error(error);
    process.exit(1);
}
}

connect();
