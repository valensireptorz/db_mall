const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const kategori_produkRouter = require('./routes/kategori_produk');
app.use('/kategori_produk', kategori_produkRouter);

const mallRouter = require('./routes/mall');
app.use('/mall', mallRouter);

const pegawaiRouter = require('./routes/pegawai');
app.use('/pegawai', pegawaiRouter);

const pengunjungRouter = require('./routes/pengunjung');
app.use('/pengunjung', pengunjungRouter);

const stok_produkRouter = require('./routes/stok_produk');
app.use('/stok_produk', stok_produkRouter);

const tenantRouter = require('./routes/tenant');
app.use('/tenant', tenantRouter);

const transaksiRouter = require('./routes/transaksi');
app.use('/transaksi', transaksiRouter);

app.listen(port, () => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
