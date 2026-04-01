const viewport = document.querySelector(".promo__viewport");
const track = document.querySelector(".promo__track");
const cards = track ? track.querySelectorAll(".promoCard") : [];

const leftBtn = document.querySelector(".arrowBtn:not(.arrowBtn--right)");
const rightBtn = document.querySelector(".arrowBtn.arrowBtn--right");

if (viewport && track && cards.length && (leftBtn || rightBtn)) {
  // Always start with visible left inset before first card
  viewport.scrollLeft = 0;

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 24;
  const step = cardWidth + gap;

  const scrollByStep = (dir) => {
    viewport.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  if (leftBtn) leftBtn.addEventListener("click", () => scrollByStep(-1));
  if (rightBtn) rightBtn.addEventListener("click", () => scrollByStep(1));
}

// Popup on card click
const popup = document.getElementById("cardPopup");
const popupTitleEl = document.getElementById("popupTitle");
const popupTextEl = document.getElementById("popupText");

const popupTexts = [
  "Целевая реализация замеров VOC или VOE",
  "В КПЭ не включены показатели CX",
  "Разработаны автоматизированные инструменты CX-отчетности c детальными показателями",
  "Для каналов: сотрудники руководствуются стандартами при обслуживании клиентов (для каналов). Для КП: продукты/ процессы разрабатываются с учетом мнения клиентов (проводятся предварительные СХ исследования)",
  "Сотрудники принимают участие в общебанковских активностях. Дополнительные проекты и церемонии отсутствуют",
  "На этапе подбора сотрудников в команду применяется два и более инструмента определения",
  "Обучение клиентскому опыту осуществляется по желанию"
];

const openPopup = (index) => {
  if (!popup || !popupTitleEl || !popupTextEl) return;
  const card = cards[index];
  if (!card) return;

  const titleNode = card.querySelector(".promoCard__name");
  popupTitleEl.textContent = titleNode ? titleNode.textContent.trim() : "";
  popupTextEl.textContent = popupTexts[index] || "";

  popup.classList.add("is-open");
};

const closePopup = () => {
  if (!popup) return;
  popup.classList.remove("is-open");
};

if (popup) {
  popup.addEventListener("click", (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    if (target.matches("[data-popup-close]")) {
      closePopup();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });
}

cards.forEach((card) => {
  const idx = Number(card.dataset.popupIndex ?? "-1");
  if (idx < 0) return;

  card.addEventListener("click", () => openPopup(idx));
});

