const frameworks = [
  {
    id: 1,
    name: "Vue.JS",
    description:
      "Vue.js est un framework JavaScript open-source utilisé pour construire des interfaces utilisateurs et des applications monopages, le but des applications monopages est d'éviter le chargement d'une nouvelle page à chaque action demandé. Cela permet de fluidifier l'experience de l'utilisateur.",
    pros: [
      "- Le premier avantage de Vue.js est qu’il est très léger (environ 20 Ko).",
      "- Il est doté d’une grande flexibilité pour la création d’applications web.",
      "- Ce framework est aussi très performant dans son exécution.",
      "- C’est une technologie qui est considérée comme facile à apprendre pour les développeurs.",
      "- Il utilise le langage de programmation informatique JavaScript qui est très connu des développeurs alors si vous rencontrez un problème avec votre appli, vous pouvez faire appel à une communauté d’experts qui se chargera de vous aider.",
      "- La syntaxe de l’écriture de son code est d’une grande simplicité.",
      "- Il donne aussi accès à toutes les fonctionnalités que l’on peut retrouver avec un widget toolkit GUI.",
      "- Vue.js fait aussi le traçage automatique des dépendances d’un composant pendant le rendu.",
      "- Les sites existants sur Vue.js sont aussi perçus comme étant rapides et très interactifs du point de vue des utilisateurs.",
    ],
    cons: [
      "- Une stabilité hasardeuse : bien que des efforts fussent faits pour améliorer la stabilité du framework, les applications conçues avec ne sont pas toujours réputées pour leur stabilité, surtout si elles sont complexes. Il conviendra à des projets personnels simples, pour ceux plus aboutis, il faudra se tourner vers d’autres technologies comme React ;",
      "- Une évolutivité perfectible : relativement jeune et open source, Vue est également un framework indépendant qui se concentre principalement sur les applications Web simples et légères ainsi que la création d’interfaces utilisateurs. Il ne dispose pas autant d’extensions que certains frameworks ce qui le limite dans ses possibilités ;",
      "- Une communauté restreinte : conséquence directe de sa jeunesse, sa communauté s’avère assez réduite et s’avère principalement anglophone.",
    ],
    link: "https://vuejs.org/",
  },
  {
    id: 2,
    name: "React.JS",
    description:
      "React est une bibliothèque JavaScript construite par Facebook et lancée en 2013, connue pour son efficacité et son dynamisme, ainsi que pour sa rétrocompatibilité et son intégration transparente avec d’autres cadres. Il est maintenu par une large communauté d’utilisateurs et de développeurs.",
    pros: [
      "- Facile à apprendre et sa conception est simple.",
      "- Utilisation de React JSX pour créer une documentation très détaillée et créer des modèles.",
      "- React est plus rapide que Angular et Vue grâce à son implémentation de DOM virtuel.",
      "- La fonction « Create React App » permet aux développeurs de créer des applications web progressives (PWA).",
      "- Aide à mettre en œuvre les concepts de programmation fonctionnelle (FP) pour développer du code réutilisable.",
    ],
    cons: "React se détourne des composants basés sur les classes, ce qui constitue un obstacle pour les développeurs qui sont à l’aise avec la programmation orientée objet (POO).",
    link: "https://fr.reactjs.org/",
  },
  {
    id: 3,
    name: "Ember.JS",
    description:
      "Ember.js is an open-source JavaScript web framework that utilizes a component-service pattern. It allows developers to create scalable single-page web applications by incorporating common idioms, best practices, and patterns from other single-page-app ecosystem patterns into the framework.",
    pros: [
      "- Le premier avantage de Vue.js est qu’il est très léger (environ 20 Ko).",
      "- Il est doté d’une grande flexibilité pour la création d’applications web.",
      "- Ce framework est aussi très performant dans son exécution.",
      "- C’est une technologie qui est considérée comme facile à apprendre pour les développeurs.",
      "- Il utilise le langage de programmation informatique JavaScript qui est très connu des développeurs alors si vous rencontrez un problème avec votre appli, vous pouvez faire appel à une communauté d’experts qui se chargera de vous aider.",
      "- La syntaxe de l’écriture de son code est d’une grande simplicité.",
      "- Il donne aussi accès à toutes les fonctionnalités que l’on peut retrouver avec un widget toolkit GUI.",
      "- Vue.js fait aussi le traçage automatique des dépendances d’un composant pendant le rendu.",
      "- Les sites existants sur Vue.js sont aussi perçus comme étant rapides et très interactifs du point de vue des utilisateurs.",
    ],
    cons: "- Une évolutivité perfectible : relativement jeune et open source, Vue est également un framework indépendant qui se concentre principalement sur les applications Web simples et légères ainsi que la création d’interfaces utilisateurs. Il ne dispose pas autant d’extensions que certains frameworks ce qui le limite dans ses possibilités ;",
    link: "https://emberjs.com/",
  },
  {
    id: 4,
    name: "Svelt.JS",
    description:
      "Svelte n'est pas une librairie. Il permet ainsi de créer des applications web beaucoup plus performantes et plus légères en créant des composants, avec une syntaxe propre . svelte et en les compilant en JavaScript. En somme, Svelte est à la frontière entre un framework et un compilateur.",
    pros: [
      "- Le premier avantage de Vue.js est qu’il est très léger (environ 20 Ko).",
      "- Il est doté d’une grande flexibilité pour la création d’applications web.",
      "- Ce framework est aussi très performant dans son exécution.",
      "- C’est une technologie qui est considérée comme facile à apprendre pour les développeurs.",
      "- Il utilise le langage de programmation informatique JavaScript qui est très connu des développeurs alors si vous rencontrez un problème avec votre appli, vous pouvez faire appel à une communauté d’experts qui se chargera de vous aider.",
      "- La syntaxe de l’écriture de son code est d’une grande simplicité.",
      "- Il donne aussi accès à toutes les fonctionnalités que l’on peut retrouver avec un widget toolkit GUI.",
      "- Vue.js fait aussi le traçage automatique des dépendances d’un composant pendant le rendu.",
      "- Les sites existants sur Vue.js sont aussi perçus comme étant rapides et très interactifs du point de vue des utilisateurs.",
    ],
    cons: [
      "- Une stabilité hasardeuse : bien que des efforts fussent faits pour améliorer la stabilité du framework, les applications conçues avec ne sont pas toujours réputées pour leur stabilité, surtout si elles sont complexes. Il conviendra à des projets personnels simples, pour ceux plus aboutis, il faudra se tourner vers d’autres technologies comme React ;",
      "- Une évolutivité perfectible : relativement jeune et open source, Vue est également un framework indépendant qui se concentre principalement sur les applications Web simples et légères ainsi que la création d’interfaces utilisateurs. Il ne dispose pas autant d’extensions que certains frameworks ce qui le limite dans ses possibilités ;",
      "- Une communauté restreinte : conséquence directe de sa jeunesse, sa communauté s’avère assez réduite et s’avère principalement anglophone.",
    ],
    link: "https://svelte.dev/",
  },
];
