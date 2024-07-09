const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.put('/:id/password', usuariosController.updatePassword);
router.delete('/:id', usuariosController.deleteUsuario);
router.post('/login', usuariosController.authenticateUsuario);

module.exports = router;