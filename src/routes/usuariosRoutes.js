const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.put('/:id/password', usuariosController.updatePassword);
router.delete('/:id', usuariosController.deleteUsuario);
router.post('/login', usuariosController.authenticateUsuario);
router.post('/op', authenticateJWT, usuariosController.realizarOperacion);

module.exports = router;