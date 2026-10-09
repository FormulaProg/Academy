// Якщо сайт відкрито з ?key=..., запам'ятовуємо ключ лише на час роботи
// у цій вкладці (sessionStorage), щоб він не губився при переході між
// сторінками. Закрив вкладку — ключ зникає. Сам ключ перевіряється
// тільки в js/firebase-config.js.
try {
  const key = new URLSearchParams(location.search).get("key");

  if (key) {
    sessionStorage.setItem("ownerKey", key);
  }
} catch (error) {
  // sessionStorage може бути вимкнений у браузері — тоді ключ діє лише на одній сторінці
}
