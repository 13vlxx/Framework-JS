Frameworks EMBERS.js

Guides Ember.js

Bienvenue dans les guides Ember.js ! Cette documentation vous mènera du débutant total à l'expert Ember.

Avec la pléthore de bibliothèques facilement disponibles pour le développement frontal, il peut parfois être un peu déroutant de travailler avec un framework frontal comme Ember.js, où tout ce dont vous avez besoin pour créer une application est déjà inclus. À cette fin, nous avons segmenté chaque partie des guides afin que vous puissiez vous concentrer uniquement sur la partie avec laquelle vous souhaitez travailler. Cela devrait également vous permettre de trouver plus rapidement ce dont vous avez besoin !



INTRODUCTION :

Classes JavaScript
Ember utilise des classes JavaScript pour bon nombre de ses constructions, telles que les composants, les routes, les services, etc. :

export default class PermissionController extends Controller {
  @tracked isAdmin = false;
  @tracked isManager = false;

  get canEdit() {
    return this.isAdmin || this.isManager;
  }
}

Certaines des fonctionnalités sur lesquelles s'appuie Ember, telles que les champs de classe et les décorateurs , n'ont pas encore été entièrement finalisées en JavaScript. Nous les aborderons donc ici en supposant que vous avez déjà eu l'occasion de vous familiariser avec les classes. Si ce n'est pas le cas, vous pouvez également consulter notre introduction détaillée aux classes .

Des champs
Les champs de classe vous permettent d'attribuer des propriétés à une instance de la classe lors de la construction. Vous pouvez définir un champ comme celui-ci :

class Permission {
  canEdit = false;
}

Ceci est très similaire à la définition de la Permissionclasse avec un constructeur comme celui-ci :

class Permission {
  constructor() {
    this.canEdit = false;
  }
}

Les champs de classe ressemblent un peu aux propriétés d'objet, mais ils présentent quelques différences essentielles. Ils sont créés et affectés à chaque instance de la classe, ce qui signifie que cette instance obtient une version unique du champ. Cela n'a pas d'importance si le champ est une primitive, comme une chaîne ou un nombre, mais importe s'il s'agit d'un objet ou d'un tableau :

class Permission {
  roles = [];
}

let tom = new Permission();
let yehuda = new Permission();

tom.roles === yehuda.roles;
// false, they're different arrays
Les champs peuvent également accéder à l'instance de classe en utilisant thislorsqu'ils sont assignés :

class Child {
  constructor(parent) {
    this.parent = parent;
  }
}

class Parent {
  child = new Child(this);
}

Les champs sont attribués avant l'exécution de tout code dans la constructorméthode, c'est pourquoi nous pouvons compter sur leur attribution correcte au moment de son exécution. Les champs n'existent pas sur la classe elle-même, ni sur le prototype de la classe, ils n'existent que sur l' instance de la classe. Cependant, ils peuvent être ajoutés à la classe directement à l'aide du mot- staticclé, comme les autres éléments de classe.

Décorateurs
Les décorateurs sont des modificateurs définis par l'utilisateur qui peuvent être appliqués à une classe ou à un élément de classe tel qu'un champ ou une méthode pour modifier son comportement. Par exemple, vous pouvez créer un @cachedécorateur qui met en cache la valeur de retour d'un getter la première fois qu'il est calculé :

import { cache } from 'my-cache-decorator';

class Counter {
  _count = 0;

  @cache
  get count() {
    return this._count++;
  }
}

let counter = new Counter();

console.log(counter.count); // 0
console.log(counter.count); // 0

Les décorateurs sont des fonctions JavaScript normales@ qui sont appliquées avec une syntaxe spéciale, c'est pourquoi vous les importez comme n'importe quelle autre fonction, mais vous utilisez le symbole lors de leur application. Les décorateurs sont disponibles dans une variété de saveurs, et certains peuvent également être appliqués directement aux classes :

@observable
class Permission {}

Certains décorateurs peuvent également recevoir des arguments :

class Permission {
  canEdit = false;

  @alias('canEdit') editable;
}

let current = new Permission();
console.log(current.editable); // false

Ember fournit un certain nombre de décorateurs, tels que le @trackeddécorateur, qui seront décrits plus en détail plus loin dans les guides.

Remarque : Les décorateurs sont toujours activement développés en JavaScript, ce qui signifie qu'il peut y avoir de petits changements à l'avenir. Les décorateurs fournis par Ember devraient rester stables grâce à ces changements, mais il est recommandé de faire preuve de prudence si vous utilisez des bibliothèques de décorateurs externes qui peuvent ne pas avoir les mêmes garanties de stabilité.

Cours classiques
Les classes classiques sont obsolètes, mais il est toujours utile de pouvoir les reconnaître lorsque l'on regarde du code plus ancien ou des articles de blog. Ember utilisait sa propre syntaxe de classe personnalisée avant que les classes JavaScript natives n'existent, qui ressemble à ceci :

export default Controller.extend({
  isAdmin: tracked({ value: false }),
  isManager: tracked({ value: false }),

  canEdit: descriptor({
    get() {
      return this.isAdmin || this.isManager;
    },
  }),
});

Cette syntaxe est connue sous le nom de syntaxe de classe classique . Vous pouvez consulter les guides pré-Octane sur les classes classiques pour plus d'informations sur la façon de convertir une classe classique en Ember moderne.

Prise en charge de plusieurs navigateurs
Tout comme le langage JavaScript change avec le temps, les navigateurs Web changent aussi ! Ember vous aide à écrire du code qui peut fonctionner sur de nombreux navigateurs différents et leurs versions. Dans les coulisses, Ember utilise Babel pour compiler le JavaScript moderne en quelque chose qui peut fonctionner sur tous les navigateurs. Sans cette étape, vous pourriez accidentellement envoyer du code qui fonctionne pour votre version de Chrome mais qui casse pour quelqu'un qui utilise Edge. Ember vous a couvert!

Heureusement, Ember propose une solution prête à l'emploi pour cela. Les applications Ember utilisent Babel pour compiler le JavaScript moderne en quelque chose qui peut fonctionner sur tous les navigateurs. Cela signifie que vous pouvez écrire du JavaScript moderne et utiliser les dernières fonctionnalités sans configuration supplémentaire !

Remarque : certaines fonctionnalités nécessitent que vous activiez le polyfill Babel . Cela ajoute un peu de poids supplémentaire à votre application, mais garantit que vous serez compatible avec toutes les nouvelles fonctionnalités ajoutées à JavaScript.



Avant de commencer à écrire du code Ember, c'est une bonne idée d'avoir un aperçu du fonctionnement d'une application Ember.

concepts de base de la braise

Routeur et gestionnaires de routage
Imaginez que nous écrivions une application Web pour un site qui permet aux utilisateurs de répertorier leurs propriétés à louer. À tout moment, nous devrions être en mesure de répondre à des questions sur l'état actuel, telles que Quelle location envisagent-ils ? et le modifient-ils ? Dans Ember, la réponse à ces questions est déterminée par l'URL. L'URL peut être définie de plusieurs manières :

L'utilisateur charge l'application pour la première fois.
L'utilisateur modifie l'URL manuellement, par exemple en cliquant sur le bouton de retour ou en modifiant la barre d'adresse.
L'utilisateur clique sur un lien dans l'application.
Un autre événement dans l'application entraîne la modification de l'URL.
Quelle que soit la manière dont l'URL est définie, la première chose qui se produit est que le routeur Ember mappe l'URL à un gestionnaire de route.

Le gestionnaire de route fait alors généralement deux choses :

Il charge un modèle.
Il rend un modèle, qui a accès au modèle.
Des modèles
Les modèles représentent un état persistant.

Par exemple, une application de location de propriétés souhaiterait enregistrer les détails d'une location lorsqu'un utilisateur la publie, et ainsi une location aurait un modèle définissant ses détails, peut-être appelé le modèle de location . Vous pouvez également avoir besoin d'un modèle d' utilisateur pour savoir qui est actuellement connecté.

Un modèle conserve généralement les informations sur un serveur Web, bien que les modèles puissent être configurés pour être enregistrés n'importe où ailleurs, comme le stockage local du navigateur.

Par défaut, les nouvelles applications Ember incluent Ember Data , qui est une bibliothèque de données distincte qui s'intègre à Ember et fournit une couche de modèle solide et conventionnelle. Nous verrons Ember Data en action dans le didacticiel de la section suivante.

Vous pouvez également fournir votre propre couche de modèle à l'aide d'autres bibliothèques de données telles que Redux ou Apollo , ou créer votre propre couche de modèle à l'aide des outils fournis par Ember pour l'état, tels que le suivi automatique . Nous en apprendrons plus sur ces outils tout au long des guides.

Modèles
Ember utilise des modèles pour créer l'interface utilisateur dans une application.

Si vous avez déjà écrit du HTML, vous savez déjà comment écrire un modèle Ember de base. Par example:

app/templates/welcome.hbs
<div>Hi, this is a valid Ember template!</div>
En plus du contenu HTML statique, Ember utilise la syntaxe de Handlebars pour décrire les éléments dynamiques de l'interface utilisateur.

Par exemple, comme mentionné précédemment, le gestionnaire de route rend le modèle disponible pour son modèle :

app/templates/welcome.hbs
{{!-- The model for this route is the current user --}}

<div>
  Hi <img src="{{@model.profileImage}}" alt="{{@model.name}}'s profile picture"> {{@model.name}},
  this is a valid Ember template!
</div>

{{#if @model.isAdmin}}
  <div>Remember, with great power comes great responsibility!</div>
{{/if}}

Cet exemple combine plusieurs fonctionnalités de Handlebars pour créer une expérience personnalisée pour l'utilisateur, ce que nous ne pourrions pas faire avec du HTML statique seul. Nous avons utilisé la syntaxe de commentaire ( {{!-- ... --}}) pour laisser une note aux futurs développeurs, la syntaxe des accolades doubles ( {{...}}) pour inclure des valeurs dynamiques, ainsi que l'utilisation de la {{#if}}...{{/if}}syntaxe pour rendre conditionnellement du contenu supplémentaire.

Nous entrerons plus en détail sur chacune de ces fonctionnalités de modèle plus loin dans ce guide.

Composants
Les composants vous permettent de décomposer vos modèles et de les organiser en petits morceaux autonomes et réutilisables.

Dans sa forme la plus élémentaire, un composant n'est qu'un morceau de modèle auquel on peut faire référence par son nom. Semblables aux fonctions des langages de programmation, elles peuvent également prendre des arguments , ce qui leur permet d'être personnalisées en fonction du contexte spécifique dans lequel elles sont rendues.

Par exemple, l'exemple de la section précédente devient un peu long. Nous pouvons extraire l'extrait pour afficher le nom et l'image de profil de l'utilisateur dans son propre composant :

app/components/user-profile.hbs
<img src="{{@user.profileImage}}" alt="{{@user.name}}'s profile picture"> {{@user.name}}
Cela nous permet de simplifier le modèle d'origine comme suit :

app/templates/welcome.hbs
{{!-- The model for this route is the current user --}}

<div>
  Hi <UserProfile @user={{@model}} /> this is a valid Ember template!
</div>

{{#if @model.isAdmin}}
  <div>Remember, with great power comes great responsibility!</div>
{{/if}}

Non seulement nous avons nettoyé le modèle d'origine pour qu'il soit plus lisible, mais nous avons maintenant un <UserProfile>composant que nous pouvons réutiliser chaque fois que nous avons besoin de restituer des informations sur un utilisateur donné.

Vous pouvez considérer les composants comme le moyen d'Ember de vous permettre de créer vos propres balises HTML. Outre le rendu du contenu, les composants peuvent également être associés à du code JavaScript, ce qui vous permet d'ajouter un comportement , comme répondre à un utilisateur qui clique sur votre composant.

Nous aborderons ces fonctionnalités avancées des composants dans un chapitre ultérieur. Pour l'instant, voyons ces concepts de base en action en créant une application de location de propriété dans la prochaine leçon.


Démarrage rapide
Un modèle est une classe qui définit les propriétés et le comportement des données que vous présentez à l'utilisateur. Tout ce que l'utilisateur s'attend à voir s'il quitte votre application et y revient plus tard (ou s'il actualise la page) doit être représenté par un modèle.

Lorsque vous voulez un nouveau modèle pour votre application, vous devez créer un nouveau fichier dans le dossier des modèles et étendre à partir de Model. Cela se fait plus facilement en utilisant l'une des commandes de générateur d'Ember CLI. Par exemple, créons un personmodèle :

ember generate model person
Cela va générer le fichier suivant :

import Model from '@ember-data/model';

export default class PersonModel extends Model {
}
Après avoir défini une classe de modèle, vous pouvez commencer à rechercher et à utiliser des enregistrements de ce type.

Zoey dit...
Les modèles Ember Data sont normalement configurés en utilisant la forme singulière (c'est pourquoi nous utilisons ici "personne" au lieu de "personnes")

Définir les attributs
Le personmodèle que nous avons généré précédemment n'avait aucun attribut. Ajoutons le prénom et le nom, ainsi que la date de naissance, en utilisant attr:

import Model, { attr } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr title;
  @attr name;
  @attr birthday;
}
Les attributs sont utilisés lors de la transformation de la charge utile JSON renvoyée par votre serveur en un enregistrement et lors de la sérialisation d'un enregistrement à sauvegarder sur le serveur après sa modification.

Vous pouvez utiliser des attributs comme n'importe quelle autre propriété, y compris depuis les fonctions getter .

import Model, { attr } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr title;
  @attr name;

  get fullName() {
    return `${this.title} ${this.name}`;
  }
}
Se transforme
Il se peut que le type d'un attribut renvoyé par le serveur ne corresponde pas au type que vous souhaitez utiliser dans votre code JavaScript. Ember Data vous permet de définir des méthodes simples de sérialisation et de désérialisation pour les types d'attributs appelés transformations. Vous pouvez spécifier que vous souhaitez qu'une transformation s'exécute pour un attribut en fournissant le nom de la transformation comme premier argument de la attrméthode. Ember Data prend en charge les types d'attributs string, number, booleanet date, qui contraignent la valeur au type JavaScript qui correspond à son nom.

import Model, { attr } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') name;
  @attr('number') age;
  @attr('boolean') admin;
  @attr('date') birthday;
}
La datetransformation transformera une chaîne ISO 8601 en un objet de date JavaScript.

La booleantransformation peut gérer des valeurs autres que trueou false. Les chaînes "true"ou "t"dans n'importe quelle casse, "1", et le nombre 1seront tous contraints à true, et falseautrement.

Les transformations ne sont pas nécessaires. Si vous ne spécifiez pas de nom de transformation, Ember Data n'effectuera aucun traitement supplémentaire de la valeur.

Transformations personnalisées
transformVous pouvez également créer des transformations personnalisées avec le générateur d'Ember CLI :

ember generate transform dollars
Voici une transformation simple qui convertit les valeurs entre les cents et les dollars américains.

import Transform from '@ember-data/serializer/transform';

export default class DollarsTransform extends Transform {
  deserialize(serialized) {
    return serialized / 100; // returns dollars
  }

  serialize(deserialized) {
    return deserialized * 100; // returns cents
  }
}

Une transformation a deux fonctions : serializeet deserialize. La désérialisation convertit une valeur dans un format attendu par le client. La sérialisation fait l'inverse et convertit une valeur au format attendu par la couche de persistance.

Vous utiliseriez la dollarstransformation personnalisée comme ceci :

import Model, { attr } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('dollars') spent;
}

Choix
attrpeut également prendre un hachage d'options comme deuxième paramètre. Pour le moment, la seule option disponible est defaultValue, qui peut utiliser une valeur ou une fonction pour définir la valeur par défaut de l'attribut si aucune n'est fournie.

Dans l'exemple suivant, nous définissons qui verifieda une valeur par défaut de falseet par createdAtdéfaut la date actuelle au moment de la création du modèle :

import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') email;
  @attr('boolean', { defaultValue: false }) verified;
  @attr('date', {
    defaultValue() { return new Date(); }
  }) createdAt;
}

Attributs en lecture seule
Lorsque l'API renvoie un objet ou un tableau profondément imbriqué en lecture seule, il n'est pas nécessaire de créer plusieurs modèles avec des relations attr('hasMany')ou attr('belongsTo') . Cela pourrait entraîner une quantité potentiellement importante de code inutile. Vous pouvez accéder à ces objets dans le modèle sans les transformer. Cela peut être fait en utilisant @attrsans spécifier de transformation :

import Model, { attr } from '@ember-data/model';

export default class PlaceModel extends Model {
  @attr location; // a read-only object
  @attr tags; // a read-only array
}
{{@model.location.latitude}}
