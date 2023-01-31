Écrire moins de code

La métrique la plus importante à laquelle vous ne prêtez pas attention

RICHE HARRIS 20 AVRIL 2019

Tout le code est bogué. Il va donc de soi que plus vous avez de code à écrire, plus vos applications seront boguées.

Écrire plus de code prend également plus de temps, ce qui laisse moins de temps pour d'autres choses comme l'optimisation, les fonctionnalités agréables à avoir ou être à l'extérieur au lieu d'être penché sur un ordinateur portable.

En fait, il est largement reconnu que le temps de développement d'un projet et le nombre de bogues augmentent de manière quadratique , et non linéaire, avec la taille d'une base de code. Cela correspond à nos intuitions : une demande d'extraction de dix lignes obtiendra un niveau d'examen rarement appliqué à une demande de 100 lignes. Et une fois qu'un module donné devient trop gros pour tenir sur un seul écran, l'effort cognitif nécessaire pour le comprendre augmente considérablement. Nous compensons en refactorisant et en ajoutant des commentaires - des activités qui aboutissent presque toujours à plus de code. C'est un cercle vicieux.

Pourtant, alors que nous sommes obsédés - à juste titre ! — sur les performances, la taille du bundle et tout ce que nous pouvons mesurer, nous prêtons rarement attention à la quantité de code que nous écrivons.

La lisibilité est importante
Je ne prétends certainement pas que nous devrions utiliser des astuces astucieuses pour réduire notre code dans la forme la plus compacte possible au détriment de la lisibilité. Je ne prétends pas non plus que la réduction des lignes de code est nécessairement un objectif valable, car cela encourage à rendre le code lisible comme celui-ci ...

for (let i = 0; i <= 100; i += 1) {
    if (i % 2 === 0) {
        console.log(`${i} is even`);
    }
}
... en quelque chose de beaucoup plus difficile à analyser :

for (let i = 0; i <= 100; i += 1) if (i % 2 === 0) console.log(`${i} is even`);
Au lieu de cela, je prétends que nous devrions privilégier les langages et les modèles qui nous permettent d'écrire naturellement moins de code.

Oui, je parle de Svelte
Réduire la quantité de code que vous devez écrire est un objectif explicite de Svelte. Pour illustrer, regardons un composant très simple implémenté dans React, Vue et Svelte. Tout d'abord, la version Svelte :



Exemple:

<script>
	let a = 1;
	let b = 2;
</script>

<input type="number" bind:value={a}>
<input type="number" bind:value={b}>

<p>{a} + {b} = {a + b}</p>


Comment pourrions-nous construire cela dans React ? Cela ressemblerait probablement à quelque chose comme ça :

import React, { useState } from 'react';

export default () => {
    const [a, setA] = useState(1);
    const [b, setB] = useState(2);

    function handleChangeA(event) {
        setA(+event.target.value);
    }

    function handleChangeB(event) {
        setB(+event.target.value);
    }

    return (
        <div>
            <input type="number" value={a} onChange={handleChangeA}/>
            <input type="number" value={b} onChange={handleChangeB}/>

            <p>{a} + {b} = {a + b}</p>
        </div>
    );
};
Voici un composant équivalent dans Vue :

<template>
    <div>
        <input type="number" v-model.number="a">
        <input type="number" v-model.number="b">

        <p>{{a}} + {{b}} = {{a + b}}</p>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                a: 1,
                b: 2
            };
        }
    };
</script>

( Je compte en copiant le code source dans le presse-papiers et en exécutant `pbpaste | wc -c` dans mon terminal )

En d'autres termes, il faut 442 caractères dans React et 263 caractères dans Vue pour obtenir quelque chose qui prend 145 caractères dans Svelte. La version React est littéralement trois fois plus grande !

l est inhabituel que la différence soit aussi évidente - d'après mon expérience, un composant React est généralement environ 40% plus grand que son équivalent Svelte. Examinons les caractéristiques du design de Svelte qui vous permettent d'exprimer des idées de manière plus concise :

Éléments de niveau supérieur
Dans Svelte, un composant peut avoir autant d'éléments de niveau supérieur que vous le souhaitez. Dans React et Vue, un composant doit avoir un seul élément de niveau supérieur - dans le cas de React, essayer de renvoyer deux éléments de niveau supérieur à partir d'une fonction de composant entraînerait un code syntaxiquement invalide. (Vous pouvez utiliser un fragment — <>— au lieu d'un <div>, mais c'est la même idée de base, et il en résulte toujours un niveau supplémentaire d'indentation).

Dans Vue, votre balisage doit être enveloppé dans un <template>élément, ce qui, à mon avis, est redondant.

Fixations
Dans React, nous devons répondre nous-mêmes aux événements d'entrée :

function handleChangeA(event) {
    setA(+event.target.value);
}

Ce n'est pas seulement une plomberie ennuyeuse qui prend plus de place sur l'écran, c'est aussi une surface supplémentaire pour les insectes. Conceptuellement, la valeur de l'entrée est liée à la valeur de aet vice versa, mais cette relation n'est pas clairement exprimée - à la place, nous avons deux morceaux de code étroitement couplés mais physiquement séparés (le gestionnaire d'événements et le value={a}prop). Non seulement cela, mais nous devons nous rappeler de contraindre la valeur de la chaîne avec l' +opérateur, sinon 2 + 2sera égal 22au lieu de 4.

Comme Svelte, Vue a un moyen d'exprimer la liaison - l' v-modelattribut, bien que nous devions encore une fois faire attention à l'utiliser v-model.numbermême s'il s'agit d'une entrée numérique.

État
Dans Svelte, vous mettez à jour l'état des composants locaux avec un opérateur d'affectation :

let count = 0;

function increment() {
    count += 1;
}

Dans React, nous utilisons le useStatehook :

const [count, setCount] = useState(0);

function increment() {
    setCount(count + 1);
}

C'est beaucoup plus bruyant - il exprime exactement le même concept mais avec plus de 60% de caractères en plus. Pendant que vous lisez le code, vous devez faire beaucoup plus de travail pour comprendre l'intention de l'auteur.

Dans Vue, pendant ce temps, nous avons une exportation par défaut avec une datafonction qui renvoie un littéral d'objet avec des propriétés correspondant à notre état local. Des éléments tels que les fonctions d'assistance et les composants enfants ne peuvent pas simplement être importés et utilisés dans le modèle, mais doivent plutôt être "enregistrés" en les attachant à la bonne partie de l'exportation par défaut.

Mort au passe-partout :


Ce ne sont là que quelques-unes des façons dont Svelte vous aide à créer des interfaces utilisateur avec un minimum de tracas. Il y en a beaucoup d'autres - par exemple, les déclarations réactives font essentiellement le travail de React useMemo, useCallbacket useEffectsans le passe-partout (ou même la surcharge de collecte des ordures liée à la création de fonctions et de tableaux en ligne à chaque changement d'état).

Comment? En choisissant un ensemble différent de contraintes. Parce que Svelte est un compilateur , nous ne sommes pas liés aux particularités de JavaScript : nous pouvons concevoir une expérience de création de composants, plutôt que de devoir l'adapter à la sémantique du langage. Paradoxalement, cela se traduit par un code plus idiomatique - par exemple en utilisant des variables naturellement plutôt que via des proxies ou des crochets - tout en fournissant des applications nettement plus performantes.

