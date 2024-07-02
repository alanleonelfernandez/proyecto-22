const express = require('express');

const usuariosRoutes = require('./src/routes/usuariosRoutes');

const app = express();

app.use(express.json());
app.use('/usuarios', usuariosRoutes);

const port = 3000;




app.listen(port, ()=>{
    console.log(`Servidor encendido en http://localhost:${port}/`);
});
