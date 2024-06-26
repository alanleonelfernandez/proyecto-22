const express = require('express')
const app = express()
const port = 5000;


app.get('/home',(req, res)=>{
    res.send("Hola")
});

//Middleware
app.use(express.static('public'));

app.get('/index',(req, res)=>{
    res.sendFile(__dirname+"./public/index.html")
});

app.listen(port, ()=>{
    console.log(`Servidor encendido en http://localhost:${port}/`);
});
