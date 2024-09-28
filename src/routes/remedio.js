const express = require('express');
const remedioController = require('../controller/remedio');
const router = express.Router();

router.post('/', remedioController.criarRemedio);

router.get('/', remedioController.buscarRemedios);

router.get('/:id', remedioController.buscarRemedio);

router.patch('/:id', remedioController.atualizarRemedio);

router.delete('/:id', remedioController.deletarRemedio);

module.exports = router;