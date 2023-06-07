const bcrypt = ('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };

    //La méthode  hash()  de bcrypt crée un hash crypté 
    //des mots de passe de vos utilisateurs pour les enregistrer de manière sécurisée dans la base de données.
   //La méthode compare de bcrypt compare un string avec un hash 
   
   exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(  // la fonction sign de jsonwebtoken pour chiffrer un nouveau token
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',//RANDOM_SECRET_KEY pour crypter notre token n). Puisque cette chaîne sert de clé pour le chiffrement et le déchiffrement du token, elle doit être difficile à deviner, sinon n’importe qui pourrait générer un token en se faisant passer pour notre serveur.
                            { expiresIn: '24h' }//durée de validité du token 
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
//Les JSON web tokens sont des tokens chiffrés qui peuvent être utilisés pour l'autorisation.