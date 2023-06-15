const mqtt = require('mqtt');

// Konfigurasi broker
const brokerUrl = 'mqtt://localhost:1883'; // Sesuaikan dengan URL broker yang digunakan
const topic = 'test-topic'; // Topik yang akan di-subscribe

// Membuat koneksi ke broker
const client = mqtt.connect(brokerUrl);

// Event ketika berhasil terhubung ke broker
client.on('connect', () => {
  console.log('Terhubung ke broker Mosca');

  // Melakukan subscribe ke topik
  client.subscribe(topic, (err) => {
    if (err) {
      console.error('Gagal melakukan subscribe:', err);
    } else {
      console.log(`Berlangganan topik: ${topic}`);
    }
  });
});

// Event ketika menerima pesan dari topik yang di-subscribe
client.on('message', (topic, message) => {
  console.log(`Menerima pesan dari topik ${topic}: ${message.toString()}`);
});
