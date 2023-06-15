const mosca = require('mosca');

// Konfigurasi broker
const settings = {
  port: 1883, // Port MQTT
};

// Inisialisasi server MQTT
const server = new mosca.Server(settings);

// Event ketika broker berhasil terhubung
server.on('ready', () => {
  console.log('Broker Mosca telah terhubung');
});

// Event ketika broker menerima pesan dari client
server.on('published', (packet, client) => {
  console.log(`Menerima pesan: ${packet.payload.toString()}`);
});
