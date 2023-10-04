const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/config,');

// CRUD for "kategori_produk" table
// Get all data from the "kategori_produk" table
router.get('/kategori_produk', (req, res) => {
    connection.query('SELECT * FROM kategori_produk', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Kategori Produk',
                data: rows,
            });
        }
    });
});

// Add new data to the "kategori_produk" table
router.post('/add', [
    // Validation for input data
    body('ID_Kategori').notEmpty().withMessage('ID Kategori harus diisi'),
    body('Nama_Kategori').notEmpty().withMessage('Nama Kategori harus diisi'),
    body('Deskripsi_Kategori').notEmpty().withMessage('Deskripsi Kategori harus diisi'),
    // Add other validations as per the "kategori_produk" schema
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const data = {
        ID_Kategori: req.body.ID_Kategori,
        Nama_Kategori: req.body.Nama_Kategori,
        Deskripsi_Kategori: req.body.Deskripsi_Kategori,
    };

    connection.query('INSERT INTO kategori_produk SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            data.ID_Kategori = result.insertId;
            return res.status(201).json({
                status: true,
                message: 'Data Kategori Produk berhasil ditambahkan',
                data: data,
            });
        }
    });
});

// Get "kategori_produk" data by ID_Kategori
router.get('/:ID_Kategori', (req, res) => {
    const ID_Kategori = req.params.ID_Kategori;
    connection.query('SELECT * FROM kategori_produk WHERE ID_Kategori = ?', ID_Kategori, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Kategori Produk tidak ditemukan',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Kategori Produk',
                data: rows[0],
            });
        }
    });
});

// Update data in the "kategori_produk" table
router.patch('/update/:ID_Kategori', [
    // Validation for input data to be updated
    body('Nama_Kategori').notEmpty().withMessage('Nama Kategori harus diisi'),
    body('Deskripsi_Kategori').notEmpty().withMessage('Deskripsi Kategori harus diisi'),
    // Add other validations as per the "kategori_produk" schema
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const ID_Kategori = req.params.ID_Kategori;
    const data = {
        Nama_Kategori: req.body.Nama_Kategori,
        Deskripsi_Kategori: req.body.Deskripsi_Kategori,
    };

    connection.query('UPDATE kategori_produk SET ? WHERE ID_Kategori = ?', [data, ID_Kategori], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Kategori Produk berhasil diperbarui',
            });
        }
    });
});

// Delete data from the "kategori_produk" table
router.delete('/:ID_Kategori', (req, res) => {
    const ID_Kategori = req.params.ID_Kategori;
    connection.query('DELETE FROM kategori_produk WHERE ID_Kategori = ?', ID_Kategori, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Kategori Produk berhasil dihapus',
            });
        }
    });
});

module.exports = router;
