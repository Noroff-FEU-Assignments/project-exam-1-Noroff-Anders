const hamburgerMenu = document.querySelector(".div-hamburger-icon");
const nav = document.querySelector(".nav-button");

hamburgerMenu.addEventListener("click", () => {
  if (nav.style.display === "none") {
    nav.style.display = "flex";
  } else {
    nav.style.display = "none";
  }
});

