const frameworkSection = document.querySelector("#frameworks");

for (let framework of frameworks) {
  console.log(framework);

  const htmlContent = `
  <article class="card">
  <h2>${framework.name}</h2>
  <p class="description">${framework.description}</p>
  <ul><li>Avantages : ${framework.pros}</li></ul>
  <p>Désavantages : ${framework.cons}</p>
  <div id="button"><a target="_blank" id="link" href="${framework.link}"><button>Lien du framework</button></a></div>
  </article>
  `;

  frameworkSection.innerHTML += htmlContent;
}
