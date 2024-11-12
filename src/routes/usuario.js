const express = require("express");
const userController = require('../controller/usuario');
const authController = require('../controller/auth');
const checkRole = require('../middleware/roleMiddleware');
const router = express.Router();
/** 
 * @swagger
 * /usuario:
 *  post:
 *    tags:
 *      - Usuário 
 *    summary: Cria um novo usuário
 *    description: Adiciona um novo usuário ao sistema com base nas informações fornecidas.
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *                description: Nome do novo usuário
 *              email:
 *                type: string
 *                description: E-mail do novo usuário
 *              senha:
 *                type: string
 *                description: Senha do novo usuário
 *              data_nascimento:
 *                  type: string
 *                  description: Data de nascimento do novo usuário
 *    responses:
 *      201:
 *        description: Usuário criado com sucesso
 *      400:
 *        description: Falha ao criar o usuáro
*/
router.post("/", userController.criarUsuario);


/** 
 * @swagger
 * /usuario:
 *  get:
 *    tags:
 *      - Usuário 
 *    summary: Busca todos os usuários
 *    description: Busca todos os usuários cadastrados.
 *    responses:
 *      200:
 *        description: Sucesso ao buscar os usuários
 *      404:
 *        description: Usuários não encontrados
*/
router.get("/", authController.autenticarToken, userController.buscarUsuarios);

/** 
 * @swagger
 * /usuario/{id}:
 *  get:
 *    tags:
 *      - Usuário 
 *    summary: Busca um usuário
 *    description: Busca um usuário pelo id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do usuário
 *    responses:
 *      200:
 *        description: Usuário encontrado com sucesso
 *      404:
 *        description: Usuário não encontrado
*/
router.get("/:id", authController.autenticarToken, checkRole('user'), userController.buscarUsuario);

/** 
 * @swagger
 * /usuario/{id}:
 *  patch:
 *    tags:
 *      - Usuário 
 *    summary: Atualiza os dados do usuário
 *    description: Atualiza uma ou todas as informações do usuário.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do usuário
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
 *              email:
 *                type: string
 *                description: E-mail
 *              senha:
 *                type: string
 *                description: Senha
 *              data_nascimento:
 *                  type: string
 *                  description: Data de nascimento
 *    responses:
 *      200:
 *        description: Usuário atualizado com sucesso
 *      400:
 *        description: Falha ao atualizar o usuáro
 *      404:
 *        description: Usuário não encontrado
*/
router.patch("/:id", authController.autenticarToken, userController.atualizarUsuario);

/** 
 * @swagger
 * /usuario/{id}:
 *  delete:
 *    tags:
 *      - Usuário 
 *    summary: Deleta um usuário
 *    description: Deleta um usuário a partir de um id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id do usuário
 *    responses:
 *      200:
 *        description: Usuário deletado com sucesso
 *      404:
 *        description: Usuário não encontrado
*/
router.delete("/:id", authController.autenticarToken, userController.deletarUsuario);

/** 
 * @swagger
 * /usuario/me:
 *  get:
 *    tags:
 *      - Usuário 
 *    summary: Busca o usuário logado
 *    description: Busca o usuário logado na aplicação.
 *    responses:
 *      200:
 *        description: Usuário encontrado com sucesso
 *      401:
 *        description: Usuário não autenticado
*/
router.get("/me/data", authController.autenticarToken, userController.me);

module.exports = router;