// Показує лічильник переглядів на сторінці теми (topic.html)
import { incrementCourseViews, isOwner } from "./firebase-config.js?v=4";

const params = new URLSearchParams(location.search);
const lang = courses[params.get("lang")] ? params.get("lang") : "python";
const topic = courses[lang][(parseInt(params.get("id")) || 1) - 1];

if (topic && topic.viewsId) {
  const owner = isOwner();
  const views = await incrementCourseViews(topic.viewsId);

  if (views !== null) {
    // У режимі власника біля числа з'являється позначка — так видно, що ключ спрацював
    document.querySelector("#views").textContent = `Перегляди: ${views}${owner ? " · власник" : ""}`;
  }
}
