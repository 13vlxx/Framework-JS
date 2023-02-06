//& créer un élément HTML de type paragraphe
//* const para = document.createElement("p");

//& ajouter le contenu
//* para.innerHTML = "content"

//& ajouter le paragraphe au DOM
//* document.body.append(para);

//& ajouter du contenu dynamique à la section lib
const divLib = document.createElement("p");

//& récup la ref de la section.lib
const sectionLib = document.querySelector("#lib");

//& créer mon article mon article
const article = document.createElement("article");

//& créer mon h2
const titleArticle = document.createElement("h2");

//& créer mon p
const paraArticle = document.createElement("p");

//& article content
titleArticle.innerText = "Le titre de alex !";
paraArticle.innerText = "Le paragraphe de alex !";

//& ajouter les éléments
article.append(titleArticle, paraArticle);

//& ajouter l'article à ma section lib
sectionLib.append(article);
