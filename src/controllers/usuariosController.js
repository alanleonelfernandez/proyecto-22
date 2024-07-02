const db = require('../db/db');

const getAllUsuarios = (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getUsuarioById = (req, res) => {
    const { id_usuario } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id_usuario], (err, result) => {
        if (err) throw err;
        res.json({message: 'Estado actual de los resultados'});
    });
};

const createUsuario = (req, res) => {
    const {email, password, nombre, apellido} = req.body;
    const sql = 'INSERT INTO usuarios (email, password, nombre, apellido) VALUES (?, ?, ?, ?)';
    db.query(sql, [email, password, nombre, apellido], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario creado', usuario_id: result.insertId });
    });
};

const updateUsuario = (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, apellido, email} = req.body;
    const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, email = ? WHERE id_usuario = ?';
    db.query(sql, [nombre, apellido, email, id_usuario ], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario editado' });
    });
};

const deleteUsuario = (req, res) => {
    const { id_usuario } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?'; 
    db.query(sql, [id_usuario], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario removido' });
    });
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};