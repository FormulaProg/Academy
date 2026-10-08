// Показує лічильник переглядів на сторінці теми (topic.html)
import { incrementCourseViews } from "./firebase-config.js";

const params = new URLSearchParams(location.search);
const lang = courses[params.get("lang")] ? params.get("lang") : "python";
const topic = courses[lang][(parseInt(params.get("id")) || 1) - 1];

if (topic && topic.viewsId) {
  const views = await incrementCourseViews(topic.viewsId);

  if (views !== null) {
    document.querySelector("#views").textContent = `Перегляди: ${views}`;
  }
}
