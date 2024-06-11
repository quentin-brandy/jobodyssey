const express = require('express');
const routes = require('./routes/index');
const log = require('./controllers/log');
const chat = require('./controllers/chat');
const routesoffre = require('./routes/offre');
const routesuser = require('./routes/user');
const routecompany = require('./routes/company');
const routeoffreuser = require('./routes/offreuser');
const routechat = require('./routes/chat');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io'); 
const { createServer } = require('node:http');
const server = createServer(app);

const io = new Server(server, {
  cors: {
      origin: ['http://localhost:5173', 'http://localhost:80', 'https://localhost:443' 
      , 'http://localhost:3000' , 'http://localhost:3306' , 
      'https://jobodyssey.quentinbrandy.fr' , 'http://jobodyssey.quentinbrandy.fr'],
      methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
const app = express();


const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:80', 'https://localhost:443' , 'http://localhost:3000' , 'http://localhost:3306' , 'https://jobodyssey.quentinbrandy.fr' , 'http://jobodyssey.quentinbrandy.fr'],
 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())
app.use('/api', routes , routesoffre , routesuser , routecompany , routeoffreuser , routechat);
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));




io.on('connection', async (socket) => {
  try {
    let user = await log.authenticateJWTSocket(socket.handshake.auth.token);
    console.log(user); 

    const roomName = `${socket.handshake.query.offreId}_${socket.handshake.query.companyId}_${socket.handshake.query.userId}`;
    console.log(roomName);  
    socket.join(roomName);
   

    socket.on('SendMessage', async (newmessage)  => {
     
      if(newmessage) {
        let allmessages = await chat.getChatSocket( socket.handshake.query.offreId ,  
          socket.handshake.query.userId ,  socket.handshake.query.companyId  );
     
        socket.to(roomName).emit('GetMessage', allmessages);
      }
     else{
      socket.to(roomName).emit('GetMessage', "problème dans l'update");
     }
    });

    socket.on('typingActive',  (typing)  => {
      if(typing === "typing") {
        socket.to(roomName).emit('GettypingActive', "typing");
    }});
  } catch (error) {
    console.log(error);
    socket.disconnect(); // Déconnectez le socket en cas d'erreur d'authentification
  }
});


