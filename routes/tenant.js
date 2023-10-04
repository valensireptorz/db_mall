const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/config,');

// Mendapatkan semua data dari tabel Tenant
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Tenant', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Tenant',
                data: rows,
            });
        }
    });
});

// Menambahkan data baru ke tabel Tenant
router.post('/add', [
    // Validasi untuk input data
    body('ID_Tenant').notEmpty().withMessage('ID Tenant harus diisi'),
    body('Nama_Tenant').notEmpty().withMessage('Nama Tenant harus diisi'),
    body('Jenis_Usaha').notEmpty().withMessage('Jenis Usaha harus diisi'),
    body('ID_Mall').notEmpty().withMessage('ID Mall harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Tenant
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const data = {
        ID_Tenant: req.body.ID_Tenant,
        Nama_Tenant: req.body.Nama_Tenant,
        Jenis_Usaha: req.body.Jenis_Usaha,
        ID_Mall: req.body.ID_Mall,
    };

    connection.query('INSERT INTO Tenant SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            data.ID_Tenant = result.insertId;
            return res.status(201).json({
                status: true,
                message: 'Data Tenant berhasil ditambahkan',
                data: data,
            });
        }
    });
});

// Mendapatkan data Tenant berdasarkan ID_Tenant
router.get('/:ID_Tenant', (req, res) => {
    const ID_Tenant = req.params.ID_Tenant;
    connection.query('SELECT * FROM Tenant WHERE ID_Tenant = ?', ID_Tenant, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Tenant tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Tenant',
                data: rows[0],
            });
        }
    });
});

// Memperbarui data di tabel Tenant
router.patch('/update/:ID_Tenant', [
    // Validasi untuk input data yang akan diperbarui
    body('Nama_Tenant').notEmpty().withMessage('Nama Tenant harus diisi'),
    // Tambahkan validasi lain sesuai dengan skema Tenant
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const ID_Tenant = req.params.ID_Tenant;
    const data = {
        Nama_Tenant: req.body.Nama_Tenant,
        Jenis_Usaha: req.body.Jenis_Usaha,
        ID_Mall: req.body.ID_Mall,
    };

    connection.query('UPDATE Tenant SET ? WHERE ID_Tenant = ?', [data, ID_Tenant], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Tenant berhasil diperbarui',
            });
        }
    });
});

// Menghapus data dari tabel Tenant
router.delete('/:ID_Tenant', (req, res) => {
    const ID_Tenant = req.params.ID_Tenant;
    connection.query('DELETE FROM Tenant WHERE ID_Tenant = ?', ID_Tenant, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Tenant berhasil dihapus',
            });
        }
    });
});

module.exports = router;
