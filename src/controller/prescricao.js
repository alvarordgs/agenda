const prisma = require("../../prisma/prismaClient");

const prescricaoController = {
  criarPrescricao: async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado!" });
      }

      const { observacao, id_remedio, frequencia, dt_inicio, dt_fim } =
        req.body;

      if (!id_remedio || !frequencia || !dt_inicio) {
        return res.status(400).json({
          error:
            "Id do usuario, id do remédio, frequência e data de início são obrigatórios!",
        });
      }

      const prescricao = await prisma.prescricao.create({
        data: {
          id_usuario: parseInt(userId),
          observacao,
          id_remedio: parseInt(id_remedio),
          frequencia: parseInt(frequencia),
          dt_inicio: new Date(dt_inicio),
          dt_fim: dt_fim ? new Date(dt_fim) : null,
          status: true,
        },
      }).catch((e) => {
        console.log(e);
      });

      return res.status(201).json(prescricao);
    } catch (e) {
      console.error("Erro ao cadastrar a prescricao!");
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  buscarPrescricoes: async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado!" });
      }

      const prescricoes = await prisma.prescricao.findMany({
        where: {
          id_usuario: parseInt(userId),
        },
        include: {
          remedio: true,
        },
      });

      return res.status(200).json(prescricoes);
    } catch (e) {
      console.error("Erro ao buscar os prescricões!");
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  buscarPrescricao: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Parametro inválido!" });
      }

      const prescricao = await prisma.prescricao.findFirst({
        where: { id },
      });

      if (!prescricao) {
        return res.status(404).json({ error: "Prescrição não encontrada!" });
      }

      return res.status(200).json(prescricao);
    } catch (e) {
      console.error("Erro ao buscar prescrição!");
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  atualizarPrescricao: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        id_usuario,
        observacao,
        id_remedio,
        frequencia,
        dt_inicio,
        dt_fim,
        status,
      } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "Parâmetro inválido!" });
      }

      const prescricao = await prisma.prescricao.findFirst({
        where: { id },
      });

      if (!prescricao) {
        return res.status(404).json({ error: "Prescrição não encontrada!" });
      }

      const prescricaoAtualizada = await prisma.prescricao.update({
        data: {
          id_usuario: id_usuario ?? prescricao.id_usuario,
          observacao: observacao ?? prescricao.observacao,
          id_remedio: id_remedio ?? prescricao.id_remedio,
          frequencia: frequencia ?? prescricao.frequencia,
          dt_inicio: dt_inicio ? new Date(dt_inicio) : prescricao.dt_inicio,
          dt_fim: dt_fim ? new Date(dt_fim) : prescricao.dt_fim,
          status: status ?? prescricao.status,
        },
        where: { id },
      });

      return res.status(200).json(prescricaoAtualizada);
    } catch (e) {
      console.error("Erro ao atualizar os dados da prescrição!");
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  deletarPrescricao: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Parâmetro inválido!" });
      }

      const prescricao = await prisma.prescricao.findFirst({
        where: { id },
      });

      if (!prescricao) {
        return res.status(404).json({ error: "Prescrição não encontrada!" });
      }

      const prescricaoDeletada = await prisma.prescricao.delete({
        where: { id },
      });

      return res.status(200).json(prescricaoDeletada.id);
    } catch (e) {
      console.error("Erro ao deletar a prescrição!");
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  buscarPrescricaoPorData: async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado!" });
      }

      const dataAtual = req.query.dataAtual;

      if (!dataAtual) {
        return res.status(400).json({ error: "Data não informada!" });
      }

      const prescricoes = await prisma.prescricao.findMany({
        where: {
          id_usuario: parseInt(userId),
          status: true,
          AND: [
            { dt_inicio: { lte: new Date(dataAtual) } },
            { dt_fim: { gte: new Date(dataAtual) } },
          ],
        },
        include: {
          remedio: true,
          historicos: true,
        },
      });

      const prescricoesFormatadas = prescricoes.map((prescricao) => {
        return {
          id: prescricao.id,
          observacao: prescricao.observacao,
          frequencia: prescricao.frequencia,
          remedio: prescricao.remedio,
          historicos: prescricao.historicos,
        };
      });

      return res.status(200).json(prescricoesFormatadas);
    } catch (e) {
      console.error("Erro ao buscar prescrição por data!");
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }
};

module.exports = prescricaoController;
