#### Utiliser la console du navigateur

Ouvre les outils de développement de ton navigateur. Sur PC, quel que soit le navigateur, cela se fait via la touche F12, sinon via Ctrl-Shift-J. Sur Mac, via Cmd-Alt-I. Rends-toi dans l'onglet **Console** et saisis ceci :

#### Afficher un message

```javascript
alert('Hello World');
```

Tu viens d'afficher un message à l'écran ! Pour cela, tu as utilisé une "fonction" fournie par JavaScript dans le navigateur.

* Chaque fonction a un nom, ici `alert`
* Une fonction est **appelée** en lui fournissant un ou plusieurs **paramètres**, entre parenthèses
* Ici, un seul paramètre est fourni, `'Hello World'`, qui est une chaîne de caractères

**Petite remarque** : sous la ligne où tu as saisi ton code, un message `undefined` apparaît. On verra plus tard ce que cela signifie.

#### Récupérer ton nom

On va voir une deuxième fonction JavaScript : `prompt`, qui signifie "inviter", dans le sens d'inviter l'utilisateur à saisir une information au clavier. Saisis ceci dans la console :

```javascript
prompt('Enter your name');
```

Une boîte de dialogue s'affiche, t'invitant à saisir ton nom. Après avoir validé, la console doit te l'afficher, entre guillements, par exemple : `"Waldo Wilder"`.

Explication : certaines fonctions "produisent" ou "renvoient" une valeur, et d'autres non.

* quand on appelle `alert`, on n'a pas besoin de récupérer une information, donc `alert` ne renvoie aucune valeur quand on l'appelle.
* quand on appelle `prompt`, on souhaite récupérer une valeur, `prompt` renvoie donc la valeur saisie.

Dans la console (et uniquement dans la console), JavaScript affiche immédiatement la valeur renvoyée par un appel de fonction : s'il n'y a pas de valeur, comme dans le cas d'`alert`, la console affiche `undefined`.

#### Dadada
