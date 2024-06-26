

const http = require('http');

const server = http.createServer((req, res) =>{
    res.writeHead(200,{
        'Content-type' : 'text/plain'
    });
    res.end('Hola node js');
});

server.listen(3000,()=>console.log('puerto 3000 activo http://localhost:3000'))