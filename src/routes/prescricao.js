const express = require('express');
const prescricaoController = require('../controller/prescricao');
const router = express.Router();

router.post('/', prescricaoController.criarPrescricao);

router.get('/', prescricaoController.buscarPrescricoes);

router.get('/:id', prescricaoController.buscarPrescricao);

router.patch('/:id', prescricaoController.atualizarPrescricao);

router.delete('/:id', prescricaoController.deletarPrescricao);

module.exports = router;