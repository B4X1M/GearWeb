let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let container = document.querySelector(".container");
let items = container.querySelectorAll(".list .item");
let indicator = document.querySelector(".indicators");
let dots = indicator.querySelectorAll("ul li");
let currentIndex = 0;

// Atualiza o item ativo, os indicadores e o número
function updateNavigation() {
  items.forEach((item, index) => {
    item.classList.remove("active");
    dots[index].classList.remove("active");
  });

  items[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");

  indicator.querySelector(".number").textContent = `0${currentIndex + 1}`;
}

// Botões "Saiba Mais": o evento é adicionado UMA vez só
// (antes era adicionado a cada troca de slide e os alertas se acumulavam)
items.forEach((item) => {
  item.querySelector(".information").addEventListener("click", () => {
    alert("Mais informações sobre o carro: " + item.querySelector("h2").textContent.trim());
  });
});

nextButton.onclick = () => {
  currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
  updateNavigation();
};

prevButton.onclick = () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
  updateNavigation();
};

// Deslizar com o dedo no celular
let touchStartX = 0;
container.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

container.addEventListener("touchend", (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) {
    (diff < 0 ? nextButton : prevButton).click();
  }
}, { passive: true });

// Menu hambúrguer (mobile)
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

menu.querySelectorAll("li").forEach((li) =>
  li.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", false);
  })
);

updateNavigation();
