const http = require('http');

//require commande pour importe les package
//Un serveur Node basique est démarré avec la méthode  createServer

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});

//createServer c'et un methode prend comme un attribut une fonction qui sera applique à chaque  appele reçu par la serveur

server.listen(process.env.PORT || 3000);

// listen pour ecout le serveur et on mettre le port que nous l'ecoute
//  la méthode end de la réponse pour renvoyer une réponse de type string à l'appelant.