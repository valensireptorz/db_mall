const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/config,');

// Mendapatkan semua data dari tabel mall
router.get('/', (req, res) => {
    connection.query('SELECT * FROM mall', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Mall',
                data: rows,
            });
        }
    });
});

// Menambahkan data baru ke tabel mall
router.post('/add', [
    // Validasi untuk input data
    body('ID_Mall').notEmpty().withMessage('ID Mall harus diisi'),
    body('Nama_Mall').notEmpty().withMessage('Nama Mall harus diisi'),
    body('Alamat_Mall').notEmpty().withMessage('Alamat Mall harus diisi'),
    body('Nomor_Telepon').notEmpty().withMessage('Nomor Telepon harus diisi'),
    body('Kapasitas_Parkir').notEmpty().withMessage('Kapasitas Parkir harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Mall
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const data = {
        ID_Mall: req.body.ID_Mall,
        Nama_Mall: req.body.Nama_Mall,
        Alamat_Mall: req.body.Alamat_Mall,
        Nomor_Telepon: req.body.Nomor_Telepon,
        Kapasitas_Parkir: req.body.Kapasitas_Parkir,
    };

    connection.query('INSERT INTO mall SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            data.ID_Mall = result.insertId;
            return res.status(201).json({
                status: true,
                message: 'Data Mall berhasil ditambahkan',
                data: data,
            });
        }
    });
});

// Mendapatkan data Mall berdasarkan ID_Mall
router.get('/:ID_Mall', (req, res) => {
    const ID_Mall = req.params.ID_Mall;
    connection.query('SELECT * FROM mall WHERE ID_Mall = ?', ID_Mall, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Mall tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Mall',
                data: rows[0],
            });
        }
    });
});

// Memperbarui data di tabel mall
router.patch('/update/:ID_Mall', [
    // Validasi untuk input data yang akan diperbarui
    body('Nama_Mall').notEmpty().withMessage('Nama Mall harus diisi'),
    body('Alamat_Mall').notEmpty().withMessage('Alamat Mall harus diisi'),
    body('Nomor_Telepon').notEmpty().withMessage('Nomor Telepon harus diisi'),
    body('Kapasitas_Parkir').notEmpty().withMessage('Kapasitas Parkir harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Mall
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const ID_Mall = req.params.ID_Mall;
    const data = {
        Nama_Mall: req.body.Nama_Mall,
        Alamat_Mall: req.body.Alamat_Mall,
        Nomor_Telepon: req.body.Nomor_Telepon,
        Kapasitas_Parkir: req.body.Kapasitas_Parkir,
    };

    connection.query('UPDATE mall SET ? WHERE ID_Mall = ?', [data, ID_Mall], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Mall berhasil diperbarui',
            });
        }
    });
});

// Menghapus data dari tabel mall
router.delete('/:ID_Mall', (req, res) => {
    const ID_Mall = req.params.ID_Mall;
    connection.query('DELETE FROM mall WHERE ID_Mall = ?', ID_Mall, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Mall berhasil dihapus',
            });
        }
    });
});

module.exports = router;
