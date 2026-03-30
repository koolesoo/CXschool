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

