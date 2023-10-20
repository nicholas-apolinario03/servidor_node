const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { MongoClient } = require('mongodb');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const mongoURL = "SUA_URL_DE_CONEXAO_DO_MONGODB_ATLAS"; // Substitua pela sua URL de conexão
const dbName = 'ola';

MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

    const db = client.db(dbName);

    // Configuração da rota para a página da web
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    // Conexão WebSocket
    io.on('connection', (socket) => {
        console.log('Cliente conectado');

        // Simulação de dados em tempo real (a cada segundo)
        setInterval(async () => {
            const collection = db.collection('slk');
            const slk = await collection.find().toArray();
            socket.emit('slk', slk);
        }, 1000);
    });
});

server.listen(3000, () => {
    console.log('Servidor em execução em http://localhost:3000');
});
