Ceci est un webservice nodejs pour l'application test de bweez

Avant de lancer le projet, il faut au préalable installer toutes les dépendances du projet:
### `npm i`

Le serveur démarre par défaut sur le port 5000 (si celui-ci n'est pas utilisée par une autre ressource)
La commande de démarrage est la suivante:
### `npm run start`

En cas de modification du numéro de port, il ne faudrait pas oublié de le changer aussi au niveau de l'application cliente (`bweez`).

Les tests peuvent être exécutés via la commande:
### `npm run test`
Et toute la batterie de tests disponibles seront exécutés

Ce webservice expose quatre (04) ressources:
- `/images` accessible via la méthode GET, qui permet de lister toutes les images disponibles dans la base de données
- `/images` accessible via la méthode POST, qui permet d'enregistrer une image sur le serveur
- `/images/:imageName` accessible via la méthode GET, qui permet de retourner l'image associée au paramètre d'url `imageName`
- `/images/qrcode` accessible via la méthode POST, qui permet de récupérer dans la base de données l'url de l'image qui lui est associée
