const prisma = require('../../prisma/prismaClient');

const createUser = async (req, res) => {
  const { nome, senha, dt_nascimento, status } = req.body;

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        senha,
        dt_nascimento: new Date(dt_nascimento),
        status
      }
    });

    res.status(201).json(novoUsuario);

  } catch (e) {
    res.status(400).json({ error: "Erro ao criar usuário." })
  }
}

module.exports = createUser;