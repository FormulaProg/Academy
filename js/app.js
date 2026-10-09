const $ = (selector) => document.querySelector(selector);

const params = new URLSearchParams(location.search);
const page = document.body.dataset.page;
const topicId = parseInt(params.get("id")) || 1; // нумерація тем з 1
const EOLYMP_URL = "https://www.eolymp.com/uk/problems/";

let lang = courses[params.get("lang")] ? params.get("lang") : "python";

// Захист від HTML-символів у текстах
function esc(value) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(value).replace(/[&<>"]/g, (char) => map[char]);
}

// **слово** у тексті виділяється кольором
function formatText(value) {
  return esc(value).replace(/\*\*(.+?)\*\*/g, '<span class="accent">$1</span>');
}

// Перетворює один блок матеріалу (див. js/data.js) на HTML
function renderBlock(block) {
  switch (block.type) {
    case "code":
      return `<pre>${esc(block.text)}</pre>`;

    case "heading":
      return `<h3>${formatText(block.text)}</h3>`;

    case "details":
      return `<details><summary>${esc(block.summary)}</summary>${block.blocks.map(renderBlock).join("")}</details>`;

    default:
      return `<p>${formatText(block.text)}</p>`;
  }
}

// Додає порожні рядки, щоб таблиця мала таку ж висоту, як у макеті
function withEmptyRows(rows, minCount) {
  const empty = '<div class="row"></div>'.repeat(Math.max(0, minCount - rows.length));
  return rows.join("") + empty;
}

/* ---------- Сторінки "Матеріали" і "Задачі" ---------- */

if (page === "materials" || page === "tasks") {
  const isTasks = page === "tasks";
  const targetPage = isTasks ? "topic-tasks.html" : "topic.html";

  function drawList() {
    $("#tabs").innerHTML = Object.keys(courses)
      .map((key) => {
        const active = key === lang ? "active" : "";
        return `<button class="${active}" data-lang="${key}">${langNames[key]}</button>`;
      })
      .join("");

    const rows = courses[lang].map((topic, index) => {
      const level = isTasks ? `<small>Рівень: ${esc(topic.level)}</small>` : "";

      return `
        <a class="row" href="${targetPage}?lang=${lang}&id=${index + 1}">
          <span>№${index + 1}: ${esc(topic.title)}</span>
          ${level}
        </a>`;
    });

    $("#list").innerHTML = withEmptyRows(rows, 7);
    // оновлюємо тільки lang, решту параметрів адреси (наприклад key) не чіпаємо
    const url = new URLSearchParams(location.search);
    url.set("lang", lang);
    history.replaceState(null, "", "?" + url.toString());
  }

  $("#tabs").addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (button) {
      lang = button.dataset.lang;
      drawList();
    }
  });

  drawList();
}

/* ---------- Сторінка теми (матеріал або таблиця задач) ---------- */

if (page === "topic" || page === "topic-tasks") {
  const isTasks = page === "topic-tasks";
  const topic = courses[lang][topicId - 1];

  $("#back").href = (isTasks ? "tasks" : "materials") + ".html?lang=" + lang;

  if (topic) {
    const heading = `№${topicId}: ${topic.title}`;
    document.title = heading;
    $("#h").textContent = heading;

    if (isTasks) {
      const rows = topic.tasks.map((task) => {
        const href = task.id ? EOLYMP_URL + encodeURIComponent(task.id) : "#";

        return `
          <a class="row" href="${href}" target="_blank" rel="noopener">
            <span>${esc(task.title)}</span>
            <span>${esc(task.difficulty)}</span>
          </a>`;
      });

      $("#body").innerHTML = `<div class="list">${withEmptyRows(rows, 11)}</div>`;
    } else {
      $("#body").innerHTML = topic.material.map(renderBlock).join("\n");
    }
  }
}
