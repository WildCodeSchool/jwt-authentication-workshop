# Authentification d'une API avec JSON Web Token

## Comment sécuriser son API et gérer l'authentification

#### Introduction

Les JSON Web Tokens ou JWT sont un standard pour créer des jetons d'accès (ou access token). Le serveur fournit ces tokens aux utilisateurs au moment où ils s'authentifient et il les demande à chaque fois que l'utilisateur demande une ressource protégée. On peut y ajouter différentes informations comme les permissions de l'utilisateur pour vérifier si l'utilisateur a bien le droit d'accéder à une ressource.

Tu peux voir ça comme un ticket de cinéma. Tu obtiens ton ticket (token) à la caisse (authentification) ce qui te donne accès à la séance. À chaque fois que tu souhaites rentrer dans la salle (ressource), le vigil (api) contrôle la validité du ticket (permissions).

#### Objectifs

Dans cet atelier tu vas créer une api REST qui met à disposition la liste de ses utilisateurs. Étant donné qu'il s'agit d'informations sensibles, il faut limiter l'accès à cette resssource aux utilisateurs authentifiés.

#### Initialisation du projet

- Clone le boilerplate `git@github.com:WildCodeSchool/jwt-authentication-workshop-source.git`
- Installe les dépendances npm

Tu pourras utiliser `npm start` pour lancer ton serveur une fois que tu l'auras créé dans les étapes suivantes. Ce script utilise `nodemon` pour recharger le serveur à chaque modification.

Ce boilerplate fournit un ficher `/models/User.js` qui imite le fonctionnement d'un ORM pour les besoins de l'atelier. Tu n'as pas besoin de le modifier.

#### Affichage des utilisateurs

Tu vas créer un endpoint api pour rendre accessible la liste des utilisateurs.

- Crée un serveur express dans le fichier `index.js`
- Crée un endpoint api `GET /api/v1/users`
- Envoie en réponse la liste des utilisateurs

Pour récupérer les utilisateurs, tu peux utiliser le modèle User qui est fourni :

```javascript
const User = require('./User');

// ...
const users = await User.findAll();
}
```

Pour vérifier le résultat je te conseille d'utiliser l'application **Postman**.

Lorsque tu fais une requête GET sur `http://localhost:<TON_PORT>/api/v1/users` tu dois obtenir :

```json
[
    {
        "id": 1,
        "email": "john.smith@example.com"
    }
]
```

#### Ajout de nouveaux utilisateurs

Un email et un mot de passe suffisent pour créer un utilisateur et lui permettre de se connecter par la suite pour avoir accès aux ressources privées de l'API.

- Crée un endpoint api `POST /api/v1/users`
- Récupère `{ email, password }` du `body` de la requête
- Requiers le module `./authentication` qui est vide pour le moment
- Inscris l'utilisateur 

```javascript
const user = await auth.register({ email, password });
```
- Envoie en réponse les informations non-sensibles du nouvel utilisateur

Pense bien également à ajouter les middlewares suivants avant les endpoints pour permettre à express de comprendre les requêtes au format `urlencoded` et `json`.

```javascript
app.use(express.urlencoded());
app.use(express.json());
```

Tu vas mettre le code lié à l'authentification dans le fichier `authentication.js`. Tu appliques ainsi le principe de *Separation of Concern* ce qui facilite la lecture, la compréhension et la maintenance du code.

Tu vas définir dans ce fichier la fonction asynchrone `register` que tu viens d'utiliser. Cette fonction doit stocker l'email et le mot de passe de l'utilisateur dans la base de donnée. Cependant, pour des raisons de sécurité, le mot de passe ne doit pas être stocké en clair mais doit être chiffré. Cela permet, si la base de donnée a été volée, de ne pas compromettre les comptes des utilisateurs sur d'autres services.

- Installe les dépendences **argon2** et **randombytes**

argon2 te permet de chiffrer le mot de passe et randombytes de générer un *salt*. Le *salt* est une donnée aléatoire qui permet de rendre le chiffrage plus dur à cracker pour un pirate qui a récupéré la base de données.

- Utilise ces 2 librairies de manière à générer un mot de passe chiffré :

```javascript
const salt = randomBytes(32);
const hashedPassword = await argon2.hash(password, { salt });
```

- Stocke en base de donnée les données de l'utilisateur

```javascript
  const user = await User.create({
    email,
    password: hashedPassword,
  });
```

Félicitations ! Tu peux maintenant créer de nouveaux utilisateurs. 

Sur Postman, envoie une requête `POST /api/v1/users` avec un `email` et un `password` puis `GET /api/v1/users` et tu dois obtenir :

```json
[
    {
        "id": 1,
        "email": "john.smith@example.com"
    },
    {
        "id": 2,
        "email": "<TON_EMAIL>"
    }
]
```

#### Authentification d'un utilisateur

Tu vas permettre à un utilisateur de se connecter avec ses identifiants. Cela lui permettra d'avoir accès à la liste des utilisateurs lorsque tu l'auras sécurisée.

- Crée un endpoint api `POST /api/v1/login`
- Récupère `{ email, password }` du `body` de la requête
- Authentifie l'utilisateur et récupère le token d'authentification :

```javascript
const { token } = await auth.authenticate({ email, password });
```

- Envoie le `{ token }` en réponse
- Dans le cas où l'authentification échoue, réponds avec le statut `401 Unauthorized` :

```javascript
  try {
    // ...
  } catch (err) {
    res.status(401).send();
  }
```

Tu peux maintenant créer toute la logique de connexion dans le fichier `authentication.js`. 

- Définis la fonction asynchrone `authenticate`
- Exporte-la
- Récupère l'utilisateur via son email

```javascript
const user = await User.findOne({ email });
```

- Si tu ne trouves pas d'utilisateur avec cet email c'est que l'utilisateur n'existe pas. Jette une erreur pour que l'api puisse envoyer une 401.

```javascript
/*
  Le throw coupe l'execution du programme, remonte jusqu'au premier try/catch et exécute le contenu du catch.
  Dans ton cas il s'agit du catch que tu viens d'écrire dans la route `POST /api/v1/login`.
  Le message d'erreur 'User not found' n'est pas exploité dans la suite de l'atelier. Il est purement indicatif.
*/
if (!user) {
  throw new Error('User not found')
}
```

- Vérifie le mot de passe de l'utilisateur

Pour cela tu as besoin d'utiliser la fonction `argon2.verify`. Elle chiffre le mot de passe fourni et compare le résultat avec le mot de passe chiffré de la base de donnée. 

Ainsi, à aucun moment le mot de passe de la base de donnée ne peut être déchiffré. Pour retrouver le mot de passe, une personne malicieuse qui a accès à la base de donnée doit tenter de nombreuses possibilités de mot de passe avec `argon2.verify`.

```javascript
// isPasswordCorrect est un booléen comme le sous-entend son nom.
const isPasswordCorrect = await argon2.verify(user.password, password);
```

- Si le mot de passe est incorrect, jette une erreur `Incorrect password`
- Installe le package `const jwt = require('jsonwebtoken');`
- Génère le token et retourne le

Tu peux stocker un *payload* dans un JWT. Il s'agit de données de ton choix, généralement liées à l'utilisateur, comme son id. Cela permet entre autre de l'identifier lorsqu'il fait des requêtes avec ce token.

On précise également une durée de vie assez courte pour réduire le risque qu'il soit récupéré et exploité par un individu malicieux.

Enfin, le token que tu génères est chiffré avec un secret de ton choix. Ce même secret te permettra de le déchiffrer pour vérifier sa validité et récupérer les informations qu'il contient.

```javascript
// Je te suggère de mettre le secret en haut du fichier `authentication.js`
const secret = process.env.JWT_SECRET;
// ...

const payload = {
  id: user.id,
};

return {
  token: jwt.sign(payload, secret, { expiresIn: '6h' }),
}
```

`process.env.JWT_SECRET` n'est défini nulle part. Il s'agit de ce que l'on appelle une variable d'environnement. Cela permet d'avoir des données différentes selon l'environnement (development, test, production…) mais c'est aussi très pratique pour utiliser des secrets, clés ou mots de passe qui ne doivent pas être versionnés dans Git. Ainsi, un attaquant qui a eu accès au code versionné ne peut pas contrefaire des tokens d'accès puisqu'il n'a pas obtenu le secret.

- Crée un fichier `.env` à la racine du projet
- Ajoute le au fichier `.gitignore`
- [[Génère un secret](https://cloud.google.com/vpn/docs/how-to/generating-pre-shared-key#using_openssl_to_generate_a_shared_secret)]
- Ajoute ton secret au fichier `.env` de cette manière : `JWT_SECRET=<TON_SECRET>`
- Installe le package `dotenv`
- Appelle `require('dotenv').config();` à la première ligne du fichier `index.js`. 

Cette librairie récupère le contenu du fichier `.env` et expose chaque variable sur `process.env.<VARIABLE>`.

Félicitations ! Tes utilisateurs peuvent maintenant se connecter. 

Sur Postman, envoie une requête `POST /api/v1/login` avec un `email` et un `password`. Tu dois recevoir en réponse :

```json
// 200 Ok
{
  "token": "<LONG_TOKEN_CHIFFRÉ>"
}

// Ou si les identifiants sont incorrects :
// 401 Unauthorized
```

#### Securisation des ressources privées

Tu peux désormais restreindre l'accès de à la liste des utilisateurs aux utilisateurs authentifiés.

- Ajoute un middleware `auth.isAuthenticated` à la route `GET /api/v1/users`

```javascript
app.get('/api/v1/users', auth.isAuthenticated, async (req, res) => {
  // ...
}
```

Un middleware, comme son nom l'indique est une fonction qui est exécutée entre la réception de la requête par le serveur et le traitement de la requête par notre fonction. Un middleware peut accéder et modifier les objets `req` et `res` et même mettre fin à une requête en envoyant une réponse.

- Installe la librairie `express-jwt`, cela t'évite d'écrire le middleware à la main
- Requiers `expressJWT` de `express-jwt`
- Déclare `auth.isAuthenticated`

```javascript
const isAuthenticated = expressJWT({ secret });
```

La variable `secret` est la même que celle utilisée par `jwt.sign`. `express-jwt` lit le contenu du header HTTP `Authorization` et s'attend à y trouver la valeur `Bearer <TON_TOKEN>`. Si le header, le type `Bearer` ou le token sont incorrects alors le middleware met fin à la requête avec une réponse 401. `expressJWT` est une fonction qui génère un middleware.

Sur Postman, crée un compte utilisateur sur ton API, connecte-toi, copie le token et tente une requête `GET /api/v1/users` en précisant désormais le header `Authorization: Bearer <TOKEN_COPIÉ>`. Tu dois recevoir

```json
[
    {
        "id": 1,
        "email": "john.smith@example.com"
    },
    {
        "id": 2,
        "email": "<TON_EMAIL>"
    }
]

// Ou si le header Authorization est incorrect :
// 401 Unauthorized
```

#### Conclusion

Mille bravos, tu as fini avec succès cet atelier. Tu peux être fier de toi !

![Victoire](https://media.giphy.com/media/5KrdjruwmSP6g/giphy.gif)

Tu trouveras le code d'exemple de ce projet [ici]()

#### Note importante

Pour avoir un système d'authentification idéal, il te faut également :

- Vérifier si l'utilisateur n'existe pas déjà lorsqu'il est créé
- Vérifier les données envoyées par l'utilisateur soit à la main soit avec une librairie comme **joi**
- Attribuer des permissions à l'utilisateur pour qu'il n'ait accès qu'aux données qui le concerne
