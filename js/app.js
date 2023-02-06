const frameworkSection = document.querySelector("#frameworks");

for (let framework of frameworks) {
  console.log(framework);

  const htmlContent = `
  <article class="card">
  <div id="avds">
  <div id="titre"><h2>${framework.name}</h2>
  <div id="image">${framework.img}</div></div>
  <p class="description">${framework.description}</p>
  <p>Avantages : ${framework.pros}</p>
  <p>Désavantages : ${framework.cons}</p>
  <div id="button"><a target="_blank" id="link" href="${framework.link}"><button>Lien du framework</button></a></div></div>
  </article>
  `;

  frameworkSection.innerHTML += htmlContent;
}
