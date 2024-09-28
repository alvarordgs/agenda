const express = require('express');
const historicoController = require('../controller/historico');
const router = express.Router();

router.post('/', historicoController.criarHistorico);

router.get('/', historicoController.buscarHistoricos);

router.get('/:id', historicoController.buscarHistorico);

router.patch('/:id', historicoController.atualizarHistorico);

router.delete('/:id', historicoController.deletarHistorico);

module.exports = router;