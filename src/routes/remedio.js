const express = require('express');
const remedioController = require('../controller/remedio');
const authController = require('../controller/auth');
const router = express.Router();

/** 
 * @swagger
 * /remedio:
 *  post:
 *    tags:
 *      - Remédio 
 *    summary: Cria um novo remédio
 *    description: Adiciona um novo remédio ao sistema com base nas informações fornecidas.
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome do novo remédio
 *              funcao:
 *                type: string
 *                description: Função do novo remédio
 *              dosagem:
 *                type: number
 *                description: Dosagem do novo remédio
 *    responses:
 *      201:
 *        description: Remédio criado com sucesso
 *      400:
 *        description: Falha ao criar o usuáro
*/
router.post('/', authController.autenticarToken, remedioController.criarRemedio);

/** 
 * @swagger
 * /remedio:
 *  get:
 *    tags:
 *      - Remédio 
 *    summary: Busca todos os remédios
 *    description: Busca todos os remédios cadastrados.
 *    responses:
 *      200:
 *        description: Sucesso ao buscar os remédios
 *      404:
 *        description: Remédios não encontrados
*/
router.get('/', authController.autenticarToken, remedioController.buscarRemedios);

/** 
 * @swagger
 * /remedio/{id}:
 *  get:
 *    tags:
 *      - Remédio 
 *    summary: Busca um remédio
 *    description: Busca um remédio pelo id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do remédio
 *    responses:
 *      200:
 *        description: Remédio encontrado com sucesso
 *      404:
 *        description: Usuário não encontrado
*/
router.get('/:id', authController.autenticarToken, remedioController.buscarRemedio);

/** 
 * @swagger
 * /remedio/{id}:
 *  patch:
 *    tags:
 *      - Remédio 
 *    summary: Atualiza os dados do remédio
 *    description: Atualiza uma ou todas as informações do remédio.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do remédio
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome
 *              funcao:
 *                type: string
 *                description: Função do remédio
 *              dosagem:
 *                type: string
 *                description: Dosagem do remédio
 *    responses:
 *      200:
 *        description: Remédio atualizado com sucesso
 *      400:
 *        description: Falha ao atualizar o usuáro
 *      404:
 *        description: Remédio não encontrado
*/
router.patch('/:id', authController.autenticarToken, remedioController.atualizarRemedio);

/** 
 * @swagger
 * /remedio/{id}:
 *  delete:
 *    tags:
 *      - Remédio 
 *    summary: Deleta um remédio
 *    description: Deleta um remédio a partir de um id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do remédio
 *    responses:
 *      200:
 *        description: Remédio deletado com sucesso
 *      404:
 *        description: Remédio não encontrado
*/
router.delete('/:id', authController.autenticarToken, remedioController.deletarRemedio);

module.exports = router;