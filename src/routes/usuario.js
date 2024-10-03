const express = require("express");
const userController = require('../controller/usuario');
const authController = require('../controller/auth')
const router = express.Router();
/** 
 * @swagger
 * /usuario:
 *  post: 
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
 *                  type: date
 *                  description: Data de nascimento do novo usuário
 *    responses:
 *      201:
 *        description: Usuário criado com sucesso
 *      400:
 *        description: Falha ao criar o usuáro
*/
router.post("/", userController.criarUsuario);

router.get("/", userController.buscarUsuarios);

router.get("/:id", authController.autenticarToken, userController.buscarUsuario);

router.patch("/:id", userController.atualizarUsuario);

router.delete("/:id", userController.deletarUsuario);

module.exports = router;