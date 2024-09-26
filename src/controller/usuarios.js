const prisma = require('../../prisma/prismaClient');

const usuarioController = {
  criarUsuario: async (req, res) => {
    try {
      const { nome, senha, dt_nascimento, status } = req.body;

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
  },
  buscarUsuarios: async (_, res) => {
    try {
      const usuarios = await prisma.usuario.findMany();

      if (!usuarios.length) {
        res.status(404).json({ error: "Ainda não há nenhum usuário cadastrado!" });
        return;
      }

      res.status(200).json(usuarios);
    } catch (e) {
      res.status(400).json({ error: "Erro ao buscar os usuários." });
    }
  },
  buscarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await prisma.usuario.findFirst({
        where: { id: parseInt(id) }
      });

      if (!usuario) {
        res.status(404).json({ error: "Usuário não encontrado!" });
        return;
      }

      res.status(200).json(usuario);
    } catch (e) {
      res.status(400).json({ error: "Erro ao buscar o usuário." });
    }
  },
  atualizarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, senha, dt_nascimento, status } = req.body;

      const usuario = await prisma.usuario.findFirst({
        where: { id: parseInt(id) }
      });

      if(!usuario) {
        res.status(404).json({error: "Usuário não encontrado!"});
        return;
      }

      const usuarioAtualiazado = await prisma.usuario.update({
        data: {
          nome: nome ?? usuario.nome,
          senha: senha ?? usuario.senha,
          dt_nascimento: new Date(dt_nascimento) ?? new Date(usuario.dt_nascimento),
          status: status ?? usuario.status
        },
        where: {
          id: parseInt(id)
        }
      });

      res.status(200).json(usuarioAtualiazado);

    } catch (e) {
      res.status(400).json({ error: "Erro ao atualizar o usuário" });
    }
  },
  deletarUsuario: async (req, res) => {
    try {
      const { id } = req.params;

      const usuarioDeletado = await prisma.usuario.delete({
        where: { id: parseInt(id) }
      });

      if (!usuarioDeletado) {
        res.status(404).json({ error: "Usuário não encontrado!" });
        return;
      }

      res.status(200).json(usuarioDeletado.id);
    } catch (e) {
      res.status(400).json({ error: "Erro ao deletar o usuário." });
    }
  },
}

module.exports = usuarioController;