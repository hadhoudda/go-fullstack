const express = require('express');
const app = express();
//import mongoss
const mongoose = require('mongoose');
const Thing = require('./models/thing');

app.use(express.json());// permettre d'acceder au coeur de la requette (req.body == coeur de requette)


mongoose.connect('mongodb+srv://sajed:sajed2009@cluster0.husfnnb.mongodb.net/?retryWrites=true&w=majority',
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

////////// ajoute une objet////////////////////

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});
////////////modifier un objet //////////////////

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//////////supprime une objet /////////

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

/////recuper une seul objet id///////////////

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({_id: req.params.id})
  .then(things => res.status(200).json(things))
      .catch(error => res.status(404).json({ error }));
})
///////recuper tout les objets////////////////
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));  
});

// La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
// Le CORS définit comment les serveurs et les navigateurs interagissent,
//  en spécifiant quelles ressources peuvent être demandées de manière légitime – par défaut, les requêtes AJAX sont interdites.
// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS),
//  des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse
// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS),
//  des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse

module.exports = app;