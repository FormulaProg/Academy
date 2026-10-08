// ==========================
// FIREBASE CONFIG
// ==========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, runTransaction, get } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuA-AaD4IDNCLJmY7xjYmi4zqXMFHw3CU",
  authDomain: "formulaprog-d64f8.firebaseapp.com",
  databaseURL: "https://formulaprog-d64f8-default-rtdb.firebaseio.com",
  projectId: "formulaprog-d64f8",
  storageBucket: "formulaprog-d64f8.firebasestorage.app",
  messagingSenderId: "661710844962",
  appId: "1:661710844962:web:0aeb83ae7ddf0a45f1067b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==========================
// АВТОРСТВО — ТІЛЬКИ ЗА ПОСИЛАННЯМ, БЕЗ ЗБЕРЕЖЕННЯ
// ==========================
// Відкриваєш сайт із ?key=... — твої перегляди не рахуються.
// Нічого нікуди не зберігається (ні localStorage, ні cookie).
const OWNER_KEY = "Simplylovely3";

export function isOwner() {
  const params = new URLSearchParams(window.location.search);
  return params.get("key") === OWNER_KEY;
}

// ==========================
// ЛІЧИЛЬНИК ПЕРЕГЛЯДІВ ТЕМИ
// ==========================
// Збільшує лічильник теми з вказаним id і повертає нове значення.
// Якщо в посиланні правильний ?key=... — лише читає поточне значення.
export async function incrementCourseViews(courseId) {
  const viewsRef = ref(db, `views/course-${courseId}`);

  if (isOwner()) {
    try {
      const snapshot = await get(viewsRef);
      return snapshot.val() || 0;
    } catch (err) {
      console.error("Помилка читання лічильника переглядів:", err);
      return null;
    }
  }

  try {
    const result = await runTransaction(viewsRef, (current) => (current || 0) + 1);
    return result.snapshot.val();
  } catch (err) {
    console.error("Помилка лічильника переглядів:", err);
    return null;
  }
}
