const frameworkSection = document.querySelector("#frameworks");

for (let framework of frameworks) {
  console.log(framework);

  const htmlContent = `
  <article class="card">
  <div id="titre"><h2>${framework.name}</h2>
  <div id="image">${framework.img}</div></div>
  <p class="description">${framework.description}</p>
  <div id="avds"><p>Avantages : ${framework.pros}</p>
  <p>Désavantages : ${framework.cons}</p></div>
  <div id="button"><a target="_blank" id="link" href="${framework.link}"><button>Lien du framework</button></a></div>
  </article>
  `;

  frameworkSection.innerHTML += htmlContent;
}
