// Макет зроблено під 1366x768. Рахуємо коефіцієнт масштабу,
// щоб сторінка займала рівно ширину і висоту екрана пристрою.
function fitToScreen() {
  const root = document.documentElement;
  const scale = root.clientWidth / 1366;

  root.style.setProperty("--z", scale);
  root.style.setProperty("--h", Math.max(768, root.clientHeight / scale) + "px");
}

fitToScreen();
window.addEventListener("resize", fitToScreen);
