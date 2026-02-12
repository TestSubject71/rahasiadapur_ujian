const express = require('express');
const cors = require('cors');

const app = express();

// Izin agar website/mobile bisa akses
app.use(cors());
app.use(express.json());

// Tes rute sederhana
app.get('/', (req, res) => {
  res.send('Server Rahasia Dapur sudah jalan!');
});

// Menjalankan server di port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});