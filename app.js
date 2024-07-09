const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const port = 3000;

const usuariosRoutes = require('./src/routes/usuariosRoutes');
const authenticateJWT  = require('./src/middlewares/auth');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/usuarios', usuariosRoutes);
app.use(express.static(path.join(__dirname,'public')));

//RUTA PRINCIPAL
app.get('/',(req,res)=> res.sendFile(path.join(__dirname,'public','index.html')));

//Ruta 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'pages', 'page-404.html'));
});

//Rutas protegidas
app.get('/pages/miperfil.html', authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'miperfil.html'));
});
app.get('/pages/edit-perfil.html', authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'edit-perfil.html'));
});
app.get('/pages/page-loginok.html', authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'page-loginok.html'));
});

app.listen(port, ()=>{
    console.log(`Servidor encendido en http://localhost:${port}/`);
});
