const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const secret = process.env.SECRET;

const getAllUsuarios = (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getUsuarioById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(result[0]);
    });
};

const createUsuario = (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Se encripta el password
    const sql = 'INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario creado con éxito', usuario_id: result.insertId });
    });
};

const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email } = req.body;
    const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, email = ? WHERE id_usuario = ?';
    db.query(sql, [nombre, apellido, email, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario editado' });
    });
};

const updatePassword = (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const user = results[0];
        if (!bcrypt.compareSync(oldPassword, user.password)) {
            return res.status(401).json({ message: 'Contraseña anterior incorrecta' });
        }
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
        const updateSql = 'UPDATE usuarios SET password = ? WHERE id_usuario = ?';
        db.query(updateSql, [hashedNewPassword, id], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Contraseña actualizada' });
        });
    });
};

const deleteUsuario = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario removido' });
    });
};

const authenticateUsuario = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        // Generar token JWT
        const token = jwt.sign({ userId: user.id_usuario }, secret, { expiresIn: '5m' });
        res.json({ message: 'Autenticación exitosa', token: token, userId: user.id_usuario });
    });
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    updatePassword,
    deleteUsuario,
    authenticateUsuario,
};