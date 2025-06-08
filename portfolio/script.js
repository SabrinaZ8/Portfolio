const container = document.querySelector('.lista-projetos');

fetch('/projects.json')
  .then(res => res.json())
  .then(projetos => {
    projetos.forEach(proj => {
      const techIcons = proj.technologies.map((tech) => `<img src="/portfolio/assets/technologies/${tech}.png" alt="${tech}" class="tech-icon">`).join('');

      const projetoDiv = document.createElement('div');
      projetoDiv.className = 'projetos-div hidden';
      projetoDiv.innerHTML = `
        <div class="div-img-p">
          ${proj.media.tipo === 'video'
            ? `<video src="${proj.media.src}" loop autoplay muted></video>`
            : `<img src="${proj.media.src}" alt="${proj.media.alt}">`
          }
          <h3>${proj.titulo}</h3>
          <p>${proj.descricao}</p>
        </div>
        <div class="tech-icons">${techIcons}</div>
        <div class="btns-projects">
          <a class="btns btns-links-projects" href="${proj.demo}" target="_blank">Demo</a>
          <a class="btns btns-links-projects" href="${proj.github}" target="_blank">GitHub</a>
        </div>
      `;
      container.appendChild(projetoDiv);
    });

    // Só observa os elementos após eles existirem no DOM
    const hiddenElements = document.querySelectorAll(".hidden");
    const myObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    hiddenElements.forEach(el => myObserver.observe(el));
  });

// Responsividade do menu
const elements = {
  body: document.querySelector("body"),
  menuEscuro: document.getElementById("modo-escuro"),
  btnMenu: document.querySelector(".icon-menu"),
  navHeader: document.querySelector("header nav"),
  navList: document.querySelector(".nav-list"),
  btnFechar: document.querySelector(".btn-fechar"),
  classes: {
    removerClasses: function () {
      elements.navHeader.classList.remove("nav-cell");
      elements.navList.classList.remove("nav-list-cell-ul");
    },
    adicionarClasses: function () {
      elements.navHeader.classList.add("nav-cell");
      elements.navList.classList.add("nav-list-cell-ul");
    }
  }
};

function verificarLargura() {
  const largura = elements.body.offsetWidth;
  if (largura + 15 <= 768) {
    elements.menuEscuro.style.display = "flex";
    elements.classes.adicionarClasses();
  } else {
    elements.menuEscuro.style.display = "none";
    elements.classes.removerClasses();
  }
}
verificarLargura();
window.addEventListener("resize", verificarLargura);

function fecharNavAut() {
  if (elements.body.offsetWidth + 15 <= 768) ativarMenu();
}

let boolean = false;
function ativarMenu() {
  if (boolean) {
    elements.navHeader.style.width = "";
    setTimeout(() => {
      elements.btnFechar.style.display = "none";
    }, 1000);
    elements.body.style.overflow = "visible";
    boolean = false;
  } else {
    elements.navHeader.style.width = "70vw";
    elements.btnFechar.style.display = "flex";
    elements.body.style.overflowY = "hidden";
    boolean = true;
  }
}

// Efeito de digitação
document.addEventListener("DOMContentLoaded", function () {
  const span = document.getElementById("efeito-span");
  const efeito = document.getElementById("efeito");
  const textSpan = "Olá, eu sou";
  const h1Nome = "Sabrina Souza Dev Front-end.";
  let index1 = 0;
  let index2 = 0;
  const breakPosition = "Sabrina Souza".length;

  function efeitoSpan() {
    if (index1 < textSpan.length) {
      span.innerHTML += textSpan.charAt(index1);
      index1++;
      setTimeout(efeitoSpan, 150);
    } else {
      efeitoH1();
    }
  }
  efeitoSpan();

  function efeitoH1() {
    if (index2 < h1Nome.length) {
      efeito.innerHTML += h1Nome.charAt(index2);
      index2++;
      if (index2 === breakPosition) {
        efeito.innerHTML += `<br>`;
      }
      setTimeout(efeitoH1, 100);
    }
  }
});
