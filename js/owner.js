// ==========================
// РЕЖИМ ВЛАСНИКА
// ==========================
// Один раз відкриваєш сайт із ?key=... — цей браузер запам'ятовується
// як "власник", і твої перегляди більше не рахуються (на жодній сторінці,
// у будь-якій вкладці, навіть після закриття браузера).
//
// ?key=off — вимкнути режим власника в цьому браузері.
// Щоб змінити ключ, заміни значення нижче.
const OWNER_KEY = "Simplylovely3";
const OWNER_FLAG = "formulaprogOwner";

const params = new URLSearchParams(location.search);
const key = params.get("key");

if (key) {
  try {
    if (key === OWNER_KEY) {
      localStorage.setItem(OWNER_FLAG, "1");
    } else if (key === "off") {
      localStorage.removeItem(OWNER_FLAG);
    }
  } catch (error) {
    // localStorage вимкнено в браузері — режим власника недоступний
  }

  // Ховаємо ключ з адресного рядка
  params.delete("key");
  const rest = params.toString();
  history.replaceState(null, "", location.pathname + (rest ? "?" + rest : "") + location.hash);
}
