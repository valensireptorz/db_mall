const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/config,');

// CRUD untuk tabel Pegawai

// Mendapatkan semua data dari tabel Pegawai
router.get('/pegawai', (req, res) => {
    connection.query('SELECT * FROM pegawai', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pegawai',
                data: rows,
            });
        }
    });
});

// Menambahkan data baru ke tabel Pegawai
router.post('/add', [
    // Validasi untuk input data
    body('ID_Pegawai').notEmpty().withMessage('ID Pegawai harus diisi'),
    body('Nama_Pegawai').notEmpty().withMessage('Nama Pegawai harus diisi'),
    body('Jabatan').notEmpty().withMessage('Jabatan harus diisi'),
    body('Gaji').notEmpty().withMessage('Gaji harus diisi').isNumeric().withMessage('Gaji harus berupa angka'),
    body('ID_Mall').notEmpty().withMessage('ID Mall harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Pegawai
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const data = {
        ID_Pegawai: req.body.ID_Pegawai,
        Nama_Pegawai: req.body.Nama_Pegawai,
        Jabatan: req.body.Jabatan,
        Gaji: req.body.Gaji,
        ID_Mall: req.body.ID_Mall,
    };

    connection.query('INSERT INTO pegawai SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            data.ID_Pegawai = result.insertId;
            return res.status(201).json({
                status: true,
                message: 'Data Pegawai berhasil ditambahkan',
                data: data,
            });
        }
    });
});

// Mendapatkan data Pegawai berdasarkan ID_Pegawai
router.get('/:ID_Pegawai', (req, res) => {
    const ID_Pegawai = req.params.ID_Pegawai;
    connection.query('SELECT * FROM pegawai WHERE ID_Pegawai = ?', ID_Pegawai, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Pegawai tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pegawai',
                data: rows[0],
            });
        }
    });
});

// Memperbarui data di tabel Pegawai
router.patch('/update/:ID_Pegawai', [
    // Validasi untuk input data yang akan diperbarui
    body('Nama_Pegawai').notEmpty().withMessage('Nama Pegawai harus diisi'),
    body('Jabatan').notEmpty().withMessage('Jabatan harus diisi'),
    body('Gaji').notEmpty().withMessage('Gaji harus diisi').isNumeric().withMessage('Gaji harus berupa angka'),
    body('ID_Mall').notEmpty().withMessage('ID Mall harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Pegawai
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const ID_Pegawai = req.params.ID_Pegawai;
    const data = {
        Nama_Pegawai: req.body.Nama_Pegawai,
        Jabatan: req.body.Jabatan,
        Gaji: req.body.Gaji,
        ID_Mall: req.body.ID_Mall,
    };

    connection.query('UPDATE pegawai SET ? WHERE ID_Pegawai = ?', [data, ID_Pegawai], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pegawai berhasil diperbarui',
            });
        }
    });
});

// Menghapus data dari tabel Pegawai
router.delete('/:ID_Pegawai', (req, res) => {
    const ID_Pegawai = req.params.ID_Pegawai;
    connection.query('DELETE FROM pegawai WHERE ID_Pegawai = ?', ID_Pegawai, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pegawai berhasil dihapus',
            });
        }
    });
});

module.exports = router;
