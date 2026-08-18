// ==========================
// FIREBASE CONFIG
// ==========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, runTransaction, get } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBGDyvM-V3SYTh8mLqWU9CBBjP-NxYbQOw",
    authDomain: "fcp-academy.firebaseapp.com",
    databaseURL: "https://fcp-academy-default-rtdb.firebaseio.com",
    projectId: "fcp-academy",
    storageBucket: "fcp-academy.firebasestorage.app",
    messagingSenderId: "641271454489",
    appId: "1:641271454489:web:3f150c8f7cdb07117ec388"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==========================
// АВТОРСТВО — ТІЛЬКИ ЗА ПОСИЛАННЯМ, БЕЗ ЗБЕРЕЖЕННЯ
// ==========================
// Заміни на своє власне довге поєднання літер+цифр.
// Нікому його не показуй і не публікуй.
const OWNER_KEY = "flp-academy-9k2x7q";

// Перевіряє URL поточної сторінки щоразу наново.
// Нічого нікуди не зберігається (ні localStorage, ні cookie) —
// щойно посилання без ?key=... — це вже звичайний відвідувач.
export function isOwner() {
    const params = new URLSearchParams(window.location.search);
    return params.get("key") === OWNER_KEY;
}

// ==========================
// ЛІЧИЛЬНИК ПЕРЕГЛЯДІВ КУРСУ
// ==========================
// Збільшує лічильник переглядів для курсу з вказаним id
// та повертає нове значення (Promise<number>).
// Якщо посилання містить правильний ?key=... — лічильник НЕ
// збільшується, а просто повертається поточне значення.
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
