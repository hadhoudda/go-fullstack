const express = require('express');

const app = express();
app.use(express.json());
//app.use(express.json()); // permettre d'acceder au coeur de la requette (req.body == coeur de requette)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Ces headers permettent :

// d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;

// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;

// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

app.get('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});

// La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
// Le CORS définit comment les serveurs et les navigateurs interagissent,
//  en spécifiant quelles ressources peuvent être demandées de manière légitime – par défaut, les requêtes AJAX sont interdites.

// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS),
//  des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse

// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS),
//  des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse

module.exports = app;