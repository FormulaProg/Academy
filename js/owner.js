// ==========================
// РЕЖИМ ВЛАСНИКА
// ==========================
// Один раз відкриваєш сайт із ?key=... — цей браузер запам'ятовується
// як "власник", і твої перегляди більше не рахуються (на жодній сторінці,
// у будь-якій вкладці, навіть після закриття браузера).
// Адреса сторінки при цьому не змінюється.
//
// ?key=off — вимкнути режим власника в цьому браузері.
// Щоб змінити ключ, заміни значення нижче.
//
// Весь код в (function () { ... })(), щоб змінні не конфліктували з app.js.
(function () {
  const OWNER_KEY = "Simplylovely3";
  const OWNER_FLAG = "formulaprogOwner";

  const key = new URLSearchParams(location.search).get("key");

  try {
    if (key === OWNER_KEY) {
      localStorage.setItem(OWNER_FLAG, "1");
    } else if (key === "off") {
      localStorage.removeItem(OWNER_FLAG);
    }
  } catch (error) {
    // localStorage вимкнено в браузері — режим власника недоступний
  }
})();
