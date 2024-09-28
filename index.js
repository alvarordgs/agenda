const express = require('express');
const app = express();
app.use(express.json());
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./configs/swaggerConfig')

const usuarioRoutes = require("./src/routes/usuario")
const remedioRoutes = require("./src/routes/remedio")
const historicoRoutes = require("./src/routes/historico")
const prescricaoRoutes = require("./src/routes/prescricao")

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/usuario", usuarioRoutes);

app.use("/remedio", remedioRoutes);

app.use("/historico", historicoRoutes);

app.use("/prescricao", prescricaoRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
