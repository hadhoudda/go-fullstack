const express = require('express');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth , stuffCtrl.getAllStuff );

router.post('/', auth , multer , stuffCtrl.createThing );

router.get('/:id', auth , stuffCtrl.getOneThing);

router.put('/:id', auth , stuffCtrl.modifyThing );

router.delete('/:id' , auth ,stuffCtrl.deleteThing);
//La méthodeexpress.Router()  vous permet de créer 
//des routeurs séparés pour chaque route principale de votre application – vous y enregistrez ensuite les routes individuelles.


// ////////// ajoute une objet////////////////////

// router.post('/', (req, res, next) => {
//       delete req.body._id;
//       const thing = new Thing({
//         ...req.body
//       });
//       thing.save()
//         .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//         .catch(error => res.status(400).json({ error }));
//     });
//     ////////////modifier un objet //////////////////
    
//     router.put('/:id', (req, res, next) => {
//       Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//         .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//         .catch(error => res.status(400).json({ error }));
//     });
    
//     //////////supprime une objet /////////
    
//     router.delete('/:id', (req, res, next) => {
//       Thing.deleteOne({ _id: req.params.id })
//         .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//         .catch(error => res.status(400).json({ error }));
//     });
    
//     /////recuper une seul objet id///////////////
    
//     router.get('/:id', (req, res, next) => {
//       Thing.findOne({_id: req.params.id})
//       .then(things => res.status(200).json(things))
//           .catch(error => res.status(404).json({ error }));
//     })
//     ///////recuper tout les objets////////////////
//     router.get('/', (req, res, next) => {
//         Thing.find()
//           .then(things => res.status(200).json(things))
//           .catch(error => res.status(400).json({ error }));  
//     });
    
module.exports = router;