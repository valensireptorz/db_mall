const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/config,');

// Mendapatkan semua data dari tabel Stok_Produk
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Stok_Produk', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Stok Produk',
                data: rows,
            });
        }
    });
});

// Menambahkan data baru ke tabel Stok_Produk
router.post('/add', [
    // Validasi untuk input data
    body('ID_Tenant').notEmpty().withMessage('ID Tenant harus diisi'),
    body('Nama_Produk').notEmpty().withMessage('Nama Produk harus diisi'),
    body('Harga').notEmpty().withMessage('Harga harus diisi'),
    body('Jumlah_Tersedia').notEmpty().withMessage('Jumlah Tersedia harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Stok_Produk
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const data = {
        ID_Tenant: req.body.ID_Tenant,
        Nama_Produk: req.body.Nama_Produk,
        Harga: req.body.Harga,
        Jumlah_Tersedia: req.body.Jumlah_Tersedia,
    };

    connection.query('INSERT INTO Stok_Produk SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            data.ID_Stok = result.insertId;
            return res.status(201).json({
                status: true,
                message: 'Data Stok Produk berhasil ditambahkan',
                data: data,
            });
        }
    });
});

// Mendapatkan data Stok_Produk berdasarkan ID_Stok
router.get('/:ID_Stok', (req, res) => {
    const ID_Stok = req.params.ID_Stok;
    connection.query('SELECT * FROM Stok_Produk WHERE ID_Stok = ?', ID_Stok, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Stok Produk tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Stok Produk',
                data: rows[0],
            });
        }
    });
});

// Memperbarui data di tabel Stok_Produk
router.patch('/update/:ID_Stok', [
    // Validasi untuk input data yang akan diperbarui
    body('Nama_Produk').notEmpty().withMessage('Nama Produk harus diisi'),
    body('Harga').notEmpty().withMessage('Harga harus diisi'),
    body('Jumlah_Tersedia').notEmpty().withMessage('Jumlah Tersedia harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Stok_Produk
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const ID_Stok = req.params.ID_Stok;
    const data = {
        Nama_Produk: req.body.Nama_Produk,
        Harga: req.body.Harga,
        Jumlah_Tersedia: req.body.Jumlah_Tersedia,
    };

    connection.query('UPDATE Stok_Produk SET ? WHERE ID_Stok = ?', [data, ID_Stok], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Stok Produk berhasil diperbarui',
            });
        }
    });
});

// Menghapus data dari tabel Stok_Produk
router.delete('/:ID_Stok', (req, res) => {
    const ID_Stok = req.params.ID_Stok;
    connection.query('DELETE FROM Stok_Produk WHERE ID_Stok = ?', ID_Stok, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Stok Produk berhasil dihapus',
            });
        }
    });
});

module.exports = router;
