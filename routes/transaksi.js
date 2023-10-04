const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/config,');

// Mendapatkan semua data dari tabel Transaksi
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Transaksi', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Transaksi',
                data: rows,
            });
        }
    });
});

// Menambahkan data baru ke tabel Transaksi
router.post('/add', [
    // Validasi untuk input data
    body('ID_Pengunjung').notEmpty().withMessage('ID Pengunjung harus diisi'),
    body('ID_Tenant').notEmpty().withMessage('ID Tenant harus diisi'),
    body('Tanggal_Transaksi').notEmpty().withMessage('Tanggal Transaksi harus diisi'),
    body('Jumlah_Total').notEmpty().withMessage('Jumlah Total harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Transaksi
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const data = {
        ID_Pengunjung: req.body.ID_Pengunjung,
        ID_Tenant: req.body.ID_Tenant,
        Tanggal_Transaksi: req.body.Tanggal_Transaksi,
        Jumlah_Total: req.body.Jumlah_Total,
    };

    connection.query('INSERT INTO Transaksi SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            data.ID_Transaksi = result.insertId;
            return res.status(201).json({
                status: true,
                message: 'Data Transaksi berhasil ditambahkan',
                data: data,
            });
        }
    });
});

// Mendapatkan data Transaksi berdasarkan ID_Transaksi
router.get('/:ID_Transaksi', (req, res) => {
    const ID_Transaksi = req.params.ID_Transaksi;
    connection.query('SELECT * FROM Transaksi WHERE ID_Transaksi = ?', ID_Transaksi, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Transaksi tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Transaksi',
                data: rows[0],
            });
        }
    });
});

// Memperbarui data di tabel Transaksi
router.patch('/update/:ID_Transaksi', [
    // Validasi untuk input data yang akan diperbarui
    body('ID_Pengunjung').notEmpty().withMessage('ID Pengunjung harus diisi'),
    body('ID_Tenant').notEmpty().withMessage('ID Tenant harus diisi'),
    body('Tanggal_Transaksi').notEmpty().withMessage('Tanggal Transaksi harus diisi'),
    body('Jumlah_Total').notEmpty().withMessage('Jumlah Total harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Transaksi
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const ID_Transaksi = req.params.ID_Transaksi;
    const data = {
        ID_Pengunjung: req.body.ID_Pengunjung,
        ID_Tenant: req.body.ID_Tenant,
        Tanggal_Transaksi: req.body.Tanggal_Transaksi,
        Jumlah_Total: req.body.Jumlah_Total,
    };

    connection.query('UPDATE Transaksi SET ? WHERE ID_Transaksi = ?', [data, ID_Transaksi], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Transaksi berhasil diperbarui',
            });
        }
    });
});

// Menghapus data dari tabel Transaksi
router.delete('/:ID_Transaksi', (req, res) => {
    const ID_Transaksi = req.params.ID_Transaksi;
    connection.query('DELETE FROM Transaksi WHERE ID_Transaksi = ?', ID_Transaksi, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Transaksi berhasil dihapus',
            });
        }
    });
});

module.exports = router;