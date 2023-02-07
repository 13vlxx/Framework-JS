const frameworkSection = document.querySelector("#frameworks");

for (let framework of frameworks) {
  console.log(framework);

  // on capte le nom et on supprime la substring qui commence au .*

  const htmlContent = `
  <article id="${framework.id}" class="card">
  <div id="avds">
  <div id="titre"><h2>${framework.name}</h2>
  <div id="image">${framework.img}</div></div>
  <p class="description">${framework.description}</p>
  <p>Avantages : ${framework.pros.join("")}</p>
  <p>Désavantages : ${framework.cons}</p>
  <div id="button"><a target="_blank" id="link" href="${
    framework.link
  }"><button>Lien du framework</button></a></div></div>
  </article>
  `;

  frameworkSection.innerHTML += htmlContent;
}
