const express = require('express');
const app = express();
app.use(express.json());
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./configs/swaggerConfig')

const usuarioRoutes = require("./src/routes/usuario")
const remedioRoutes = require("./src/routes/remedio")

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/usuario", usuarioRoutes);

app.use("/remedio", remedioRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
