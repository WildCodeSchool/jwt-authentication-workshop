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

Tu auras remarqué qu'après avoir saisi cette fonction, il ne s'est rien passé. C'est normal : tu n'as fait que la **déclarer**, c'est-à-dire indiquer son existence à JavaScript. Pour la voir en action, il faut l'**appeler** en saisissant :

```javascript
askNameAndGreet()
```