const express = require('express');
const app = express();
app.use(express.json());
const usuarioRoutes = require("./src/routes/usuarios")
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./configs/swaggerConfig')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/usuario", usuarioRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
