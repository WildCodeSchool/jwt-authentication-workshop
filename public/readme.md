#### Utiliser la console du navigateur

Ouvre les outils de développement de ton navigateur. Sur PC, quel que soit le navigateur, cela se fait via la touche F12, sinon via Ctrl-Shift-J. Sur Mac, via Cmd-Alt-I.

Rends-toi dans l'onglet **Console**.

#### Afficher un message

Saisis ceci dans la console :

```javascript
alert('Hello World');
```

Tu viens d'afficher un message à l'écran ! Pour cela, tu as utilisé une "fonction" fournie par JavaScript dans le navigateur.

* Chaque fonction a un nom, ici `alert`
* Une fonction est **appelée** en lui fournissant un ou plusieurs **paramètres**, entre parenthèses
* Ici, un seul paramètre est fourni, `'Hello World'`, qui est une chaîne de caractères

**Petite remarque** : sous la ligne où tu as saisi ton code, un message `undefined` apparaît. On verra plus tard ce que cela signifie.

#### Récupérer ton nom

Tu vas utiliser une deuxième fonction JavaScript : `prompt`, qui signifie "inviter", dans le sens d'inviter l'utilisateur à saisir une information au clavier. Saisis ceci dans la console :

```javascript
prompt('Enter your name');
```

Une boîte de dialogue s'affiche, t'invitant à saisir ton nom. Après avoir validé, la console doit te l'afficher, entre guillemets, par exemple : `"Waldo Wilder"`.

Explication : certaines fonctions "produisent" ou "renvoient" une valeur, et d'autres non.

* `alert` sert uniquement à afficher un message. Il n'est pas utile qu'elle renvoie une valeur : elle ne renvoie donc rien.
* `prompt` sert à récupérer une valeur, et renvoie donc la valeur saisie.

Dans la console (et uniquement dans la console), JavaScript affiche immédiatement la valeur renvoyée par un appel de fonction : s'il n'y a pas de valeur, comme dans le cas d'`alert`, la console affiche `undefined`.

#### Stocker une valeur

Saisis ceci dans la console :

```javascript
const name = prompt('Enter your name');
```

C'est une variation sur le même thème : une fois que tu as entré ton nom, il a été stocké dans une **variable** nommée `name`. Tu peux voir une variable comme une "boîte" portant une étiquette (ici `name`), et contenant quelque chose (ici la valeur que tu as saisie).

`const` est un **mot-clé** du langage JavaScript, permettant de **déclarer** une variable, c'est-à-dire d'indiquer à JavaScript qu'on a besoin d'une nouvelle "boîte" pour y stocker une valeur.

Saisis ensuite juste `name` dans la console et valide : la valeur que tu as saisie est affichée, preuve qu'elle a bien été mémorisée.

#### Écrire une fonction

Tu as pour l'instant utilisé deux fonctions de JavaScript : `alert` et `prompt`. On peut également écrire ses propres fonctions !

Une **fonction** regroupe un ensemble d'instructions destinées à accomplir une tâche précise. Voici une fonction qui permet de demander à l'utilisateur son nom, puis de le saluer. Copie-la dans la console :

```javascript
function askNameAndGreet() {
  const name = prompt('Enter your name');
  const message = 'Hello ' + name + ', how are you?';
  alert(message);
}
```

Voici le détail de ce qu'accomplit cette fonction.

1. Demander à l'utilisateur son nom, et le stocker dans la variable `name`.
2. Créer une deuxième variable `message` contenant le nom saisi, entouré d'autres éléments pour former un message.
3. Afficher le message.

Tu auras remarqué qu'après avoir saisi cette fonction, il ne s'est rien passé. C'est normal : tu n'as fait que la **déclarer**, c'est-à-dire indiquer son existence à JavaScript. Pour la voir en action, il faut l'**appeler** en saisissant :

```javascript
askNameAndGreet();
```

#### Travailler en local

Pour terminer cette initiation, tu vas travailler en local, avec des fichiers HTML et JavaScript stockés sur ton ordinateur.

Comme tu l'as appris dans une quête **Git**, tu vas d'abord devoir cloner un projet pour récupérer la structure de l'atelier.
Avec ton terminal, positionne-toi dans le dossier où tu veux travailler et clone le repository suivant :

```bash
git clone https://github.com/WildCodeSchool/initiation-javascript-template
```

La commande `git clone` a créé un dossier qui contient le projet et tu peux te rendre dans ce dossier avec la commande

```bash
cd initiation-javascript-template
```

Le dossier contient un fichier `index.html` et un fichier `tutorial.js`, que tu vas éditer.

#### Gérer un bouton

Tout ce que nous avons fait jusqu'ici s'est passé dans la console. C'est un bon début, mais on ne va pas s'arrêter là : un des usages de JavaScript reste d'ajouter de l'interactivité aux pages web.

On peut notamment ajouter un attribut `onclick` sur un bouton HTML, pour exécuter du code JavaScript. Dans le fichier `index.html`, sous la section correspondante, colle ceci :

```html
<button class="button is-primary" onclick="alert('Hello World');">
  Say Hello
</button>
```

Recharge la page (cela se fait tout seul si tu utilises l'extension *Live Server*) de Visual Studio Code.

Si tu cliques sur le bouton, tu est gratifié d'un "Hello World".

Remplace maintenant le **contenu** de l'attribut `onclick` pour utiliser la fonction écrite précedemment :

```javascript
askNameAndGreet();
```

Ouvre la console puis clique sur le bouton. Il ne se passe rien... sauf dans la console, où un message d'erreur s'affiche : `Uncaught ReferenceError: askNameAndGreet is not defined`.

Il faudra t'y habituer : l'apprentissage du code est un long chemin semé de messages d'erreur !

Mais en ce qui concerne celle-ci, la solution est simple : l'erreur se produit parce que la fonction `askNameAndGreet` est inconnue.

Il faut donc la coller dans le fichier `tutorial.js`.

#### Modifier le style d'un élément

JavaScript dans le navigateur permet de modifier le contenu et/ou le style d'un élément.

Voici le code HTML à reporter dans la section correspondante d'`index.html` :

```html
<p id="paragraph">This paragraph will change color!</p>
```

Et voici un code JavaScript qui va changer sa couleur :

```javascript
document.getElementById('paragraph').style.color = 'red';
```

Si tu recharges la page à plusieurs reprises, tu pourras constater que le paragraphe repasse en couleur par défaut (noir). Il faut en effet un peu de temps au navigateur pour charger (via la balise `<script>`) et exécuter le code JavaScript.

Essaie de changer la couleur indiquée après le signe égal.

#### Exercice (optionnel)

Si tu as bien compris les sections précédentes, tu peux essayer d'écrire une fonction `changeColor` qui va :

1. Demander à l'utilisateur une couleur
2. Modifier la couleur du paragraphe avec cette couleur

Tu peux ensuite modifier le `onclick` du bouton pour qu'il appelle cette fonction.

#### Conclusion

C'est la fin de cette initiation au JavaScript.

Tu n'as vu ici que l'aspect "front-end" : tout le code JavaScript a été exécuté par ton navigateur. Pendant très longtemps, le navigateur web était le seul endroit où on pouvait utiliser JavaScript.

Même s'il reste très utilisé pour le front-end, JavaScript est devenu plus polyvalent au fil des années, et permet maintenant de faire fonctionner :
* des applications "back-end" (serveur)
* et même des applications de bureau (Visual Studio Code et Slack en sont des exemples).
