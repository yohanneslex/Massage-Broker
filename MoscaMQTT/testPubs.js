const mqtt = require('mqtt');
const readline = require('readline');

// Konfigurasi broker
const brokerUrl = 'mqtt://localhost:1883'; // Sesuaikan dengan URL broker yang digunakan
const topic = 'test-topic'; // Topik yang akan dipublish

// Membuat interface pembaca input dari terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Membuat koneksi ke broker
const client = mqtt.connect(brokerUrl);

// Event ketika berhasil terhubung ke broker
client.on('connect', () => {
  console.log('Terhubung ke broker Mosca');

  // Meminta pengguna untuk memasukkan pesan yang ingin dikirim
  rl.question('Masukkan pesan yang ingin dikirim: ', (message) => {
    // Melakukan publish pesan ke topik
    client.publish(topic, message, (err) => {
      if (err) {
        console.error('Gagal melakukan publish:', err);
      } else {
        console.log(`Pesan berhasil dipublish ke topik ${topic}`);
      }

      client.end(); // Menutup koneksi setelah publish selesai
      rl.close(); // Menutup interface pembaca input
    });
  });
});
