const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const port = 3000;

const usuariosRoutes = require('./src/routes/usuariosRoutes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/usuarios', usuariosRoutes);
app.use(express.static(path.join(__dirname,'public')));
//RUTA PRINCIPAL
app.get('/',(req,res)=> res.sendFile(path.join(__dirname,'public','index.html')))

app.get('/api',validateToken ,(req,res)=>{
    res.json({
        username: req.user,
        tuits:[
            {
                id: 0,
                text: 'Mi primer tuit',
                username: 'pepe'
            },
            {
                id: 1,
                text: 'Mejor es js',
                username: 'robocop'
            },
        ]
    })
});

app.get('/login', (req,res)=>{
    res.send(`<html>
        <head>
        <title> Login</title>
        </head>
        <body>
            <form method="POST" action="/auth">
                Nombre de usuario:<input type="text" name=text"> <br><br>  
                Contraseña: <input type="password" name="password"> <br><br><br>
                <input type="submit" value="Iniciar Sesion" /> 
            </form>
        </body>
        </html>`)
})


app.post('/auth',(req,res) =>{
    const {username , password} = req.body;

    //Consultar a la base de datos si existe el usename y el password

    const user= {username:username};

    const accessToken = generateAccessToken(user);

    res.header('authorization', accessToken).json({
        
        message: 'Usuario autentificado',
        token:accessToken
    })
})
//funcion para hacer la firma digital 
function generateAccessToken(user){

    return jwt.sign(user,process.env.SECRET,{expiresIn:'5m'})

}



function validateToken(req,res,next){
    const accessToken = req.headers['authorization'] || req.query.accessToken;
    if(!accessToken) res.send('Acceso Denegado');

    jwt.verify(accessToken, process.env.SECRET, (erro, user) =>{
        if(erro){
            res.send('Acceso denegado, el token expiro o es incorrecto')
        }else{
            req.user = user;
            next();
        }
    });
}


app.listen(port, ()=>{
    console.log(`Servidor encendido en http://localhost:${port}/`);
});
