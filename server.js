const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

//require commande pour importe les package
//Un serveur Node basique est démarré avec la méthode  createServer

// const server = http.createServer((req, res) => {
//     res.end('Voilà la réponse du serveur !');
// });

//createServer c'et un methode prend comme un attribut une fonction qui sera applique à chaque  appele reçu par la serveur

//server.listen(process.env.PORT || 3000);

// listen pour ecout le serveur et on mettre le port que nous l'ecoute
//  la méthode end de la réponse pour renvoyer une réponse de type string à l'appelant.