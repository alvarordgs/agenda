const express = require("express");
const createUser = require('./../controller/usuarios');
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
router.post("/", createUser);

module.exports = router;