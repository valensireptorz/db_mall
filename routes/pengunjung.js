const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/config,');

// CRUD untuk tabel Pengunjung

// Mendapatkan semua data dari tabel Pengunjung
router.get('/', (req, res) => {
    connection.query('SELECT * FROM pengunjung', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pengunjung',
                data: rows,
            });
        }
    });
});

// Menambahkan data baru ke tabel Pengunjung
router.post('/add', [
    // Validasi untuk input data
    body('ID_Pengunjung').notEmpty().withMessage('ID Pengunjung harus diisi'),
    body('Nama_Pengunjung').notEmpty().withMessage('Nama Pengunjung harus diisi'),
    body('Alamat_Pengunjung').notEmpty().withMessage('Alamat Pengunjung harus diisi'),
    body('Nomor_Telepon_Pengunjung').notEmpty().withMessage('Nomor Telepon Pengunjung harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Pengunjung
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const data = {
        ID_Pengunjung: req.body.ID_Pengunjung,
        Nama_Pengunjung: req.body.Nama_Pengunjung,
        Alamat_Pengunjung: req.body.Alamat_Pengunjung,
        Nomor_Telepon_Pengunjung: req.body.Nomor_Telepon_Pengunjung,
        // Tambahkan atribut lain sesuai dengan skema Pengunjung
    };

    connection.query('INSERT INTO pengunjung SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            data.ID_Pengunjung = result.insertId;
            return res.status(201).json({
                status: true,
                message: 'Data Pengunjung berhasil ditambahkan',
                data: data,
            });
        }
    });
});

// Mendapatkan data Pengunjung berdasarkan ID_Pengunjung
router.get('/:ID_Pengunjung', (req, res) => {
    const ID_Pengunjung = req.params.ID_Pengunjung;
    connection.query('SELECT * FROM pengunjung WHERE ID_Pengunjung = ?', ID_Pengunjung, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Pengunjung tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pengunjung',
                data: rows[0], // Mengambil data pertama karena ID_Pengunjung harus unik
            });
        }
    });
});

// Memperbarui data di tabel Pengunjung
router.patch('/update/:ID_Pengunjung', [
    // Validasi untuk input data yang akan diperbarui
    body('Nama_Pengunjung').notEmpty().withMessage('Nama Pengunjung harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Pengunjung
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const ID_Pengunjung = req.params.ID_Pengunjung;
    const data = {
        Nama_Pengunjung: req.body.Nama_Pengunjung,
        Alamat_Pengunjung: req.body.Alamat_Pengunjung,
        Nomor_Telepon_Pengunjung: req.body.Nomor_Telepon_Pengunjung,
        // Tambahkan atribut lain sesuai dengan skema Pengunjung
    };

    connection.query('UPDATE pengunjung SET ? WHERE ID_Pengunjung = ?', [data, ID_Pengunjung], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pengunjung berhasil diperbarui',
            });
        }
    });
});

// Menghapus data dari tabel Pengunjung
router.delete('/:ID_Pengunjung', (req, res) => {
    const ID_Pengunjung = req.params.ID_Pengunjung;
    connection.query('DELETE FROM pengunjung WHERE ID_Pengunjung = ?', ID_Pengunjung, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pengunjung berhasil dihapus',
            });
        }
    });
});

module.exports = router;
