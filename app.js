const express = require('express');
const app = express();
//import routes
const stuffRoutes = require('./routes/stuff')
//impoete les rourtes d'authentfication
const userRoutes = require('./routes/user')
//import mongoss
const mongoose = require('mongoose')
require("dotenv").config(); //process.env.DBLINK
app.use(express.json());// permettre d'acceder au coeur de la requette (req.body == coeur de requette)


mongoose.connect(process.env.DBLINK, //process c'est un  methode de conf
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//////////////
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


//app.use(bodyParser.json()) ancienne ecriture pour accede au coeur de requette


// La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
// Le CORS définit comment les serveurs et les navigateurs interagissent,
//  en spécifiant quelles ressources peuvent être demandées de manière légitime – par défaut, les requêtes AJAX sont interdites.
// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS),
//  des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse
// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS),
//  des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse

app.use('/api/stuff', stuffRoutes);
//enregistre les rourtes d'authentfication
app.use('/api/auth', userRoutes);

module.exports = app;