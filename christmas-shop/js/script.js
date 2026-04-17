const giftsData = Array.isArray(window.GIFTS_DATA) ? window.GIFTS_DATA : [];

const normalizeName = (name) => name.trim().toLowerCase();
const giftsByName = new Map(giftsData.map((gift) => [normalizeName(gift.name), gift]));

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

if (daysElement && hoursElement && minutesElement && secondsElement) {
  const now = new Date();
  const targetDate = Date.UTC(now.getUTCFullYear() + 1, 0, 1, 0, 0, 0);

  setInterval(() => {
    const currentTime = Date.now();
    const diff = Math.max(0, targetDate - currentTime);

    daysElement.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    hoursElement.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutesElement.textContent = Math.floor((diff / (1000 * 60)) % 60);
    secondsElement.textContent = Math.floor((diff / 1000) % 60);
  }, 1000);
}

const navTabs = document.querySelectorAll(".tabs a");

const burgerBtn = document.getElementById("burger-btn");
const navMenu = document.getElementById("nav-menu");
const body = document.body;
const navLinks = document.querySelectorAll(".nav-list a");

if (burgerBtn && navMenu) {
  function closeBurger() {
    burgerBtn.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.remove("lock");
  }

  function toggleMenu() {
    burgerBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.classList.toggle("lock");
  }

  burgerBtn.addEventListener("click", toggleMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        closeBurger();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 769) {
      closeBurger();
    }
  });
}

const bestGiftGrid = document.querySelector(".gifts-container .gift-grid");
const giftsPageGrid = document.querySelector(".best-gifts-container .gift-grid");
const giftsPageRoot = document.querySelector(".hero.gifts-page");
const homeCategoryClass = {
  "for work": "best-work",
  "for health": "best-health",
  "for harmony": "best-harmony"
};
const homeCategoryImage = {
  "for work": "image/console.log_guru.png",
  "for health": "image/hydration_bot.png",
  "for harmony": "image/spontaneous_coding.png"
};
let modalHandlersBound = false;

function getCategoryImage(categoryValue) {
  return homeCategoryImage[categoryValue.toLowerCase()] || "image/console.log_guru.png";
}

function createGiftCardMarkup(gift) {
  const normalizedCategory = gift.category.toLowerCase();
  const categoryClassName = homeCategoryClass[normalizedCategory] || "best-work";
  const imageSrc = getCategoryImage(gift.category);

  return `
    <div class="gift-card">
      <img src="${imageSrc}" alt="${gift.name}">
      <div class="best-content">
        <p class="${categoryClassName}">${gift.category}</p>
        <h3>${gift.name}</h3>
      </div>
    </div>
  `;
}

function shuffleArray(items) {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

if (bestGiftGrid && giftsData.length >= 4) {
  const randomGifts = shuffleArray(giftsData).slice(0, 4);

  bestGiftGrid.innerHTML = randomGifts.map((gift) => createGiftCardMarkup(gift)).join("");
}

const modalBackdrop = document.getElementById("gift-modal-backdrop");
const modalClose = document.getElementById("gift-modal-close");
const modalImage = document.getElementById("gift-modal-image");
const modalCategory = document.getElementById("gift-modal-category");
const modalTitle = document.getElementById("gift-modal-title");
const modalDescription = document.getElementById("gift-modal-description");
const modalPowers = document.getElementById("gift-modal-powers");
function bindGiftCardInteractions(cards) {
  cards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${card.querySelector("h3")?.textContent?.trim() || "gift"} details`);

    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card);
      }
    });
  });
}

function bindModalGlobalHandlers() {
  if (modalHandlersBound || !modalBackdrop) {
    return;
  }

  modalClose?.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  modalHandlersBound = true;
}

const categoryClass = {
  "for work": "best-work",
  "for health": "best-health",
  "for harmony": "best-harmony"
};

function getStarsCount(value) {
  const numeric = Number(String(value).replace("+", ""));
  return Math.max(1, Math.min(5, Math.round(numeric / 100)));
}

function closeModal() {
  if (!modalBackdrop) {
    return;
  }
  modalBackdrop.classList.remove("is-open");
  modalBackdrop.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}

function renderPowers(superpowers) {
  if (!modalPowers) {
    return;
  }

  modalPowers.innerHTML = "";
  Object.entries(superpowers).forEach(([key, value]) => {
    const starsCount = getStarsCount(value);
    const row = document.createElement("div");
    row.className = "gift-modal-power-row";

    const label = document.createElement("span");
    label.className = "gift-modal-power-label";
    label.textContent = key;

    const valueEl = document.createElement("span");
    valueEl.className = "gift-modal-power-value";
    valueEl.textContent = value;

    const stars = document.createElement("div");
    stars.className = "gift-modal-stars";

    for (let i = 1; i <= 5; i += 1) {
      const icon = document.createElement("img");
      icon.src = "icons/snowflake.svg";
      icon.alt = "";
      if (i <= starsCount) {
        icon.classList.add("is-active");
      }
      stars.append(icon);
    }

    row.append(label, valueEl, stars);
    modalPowers.append(row);
  });
}

function openModal(card) {
  if (!modalBackdrop || !modalImage || !modalCategory || !modalTitle || !modalDescription) {
    return;
  }

  const cardName = card.querySelector("h3")?.textContent?.trim() || "";
  const cardCategory = card.querySelector("p")?.textContent?.trim() || "";
  const cardImage = card.querySelector("img");
  const gift = giftsByName.get(normalizeName(cardName));

  const giftData = gift || {
    name: cardName,
    description: "No description yet.",
    category: cardCategory || "For Work",
    superpowers: { live: "+100", create: "+100", love: "+100", dream: "+100" }
  };

  modalImage.src = cardImage?.getAttribute("src") || "";
  modalImage.alt = cardImage?.getAttribute("alt") || giftData.name;
  modalTitle.textContent = giftData.name;
  modalDescription.textContent = giftData.description;
  modalCategory.textContent = giftData.category;

  modalCategory.classList.remove("best-work", "best-health", "best-harmony");
  const currentCategoryClass = categoryClass[giftData.category.toLowerCase()];
  if (currentCategoryClass) {
    modalCategory.classList.add(currentCategoryClass);
  }

  renderPowers(giftData.superpowers);

  modalBackdrop.classList.add("is-open");
  modalBackdrop.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

if (modalBackdrop) {
  bindGiftCardInteractions(document.querySelectorAll(".gift-card"));
  bindModalGlobalHandlers();
}

function renderGiftsPageCards(filterValue = "all") {
  if (!giftsPageGrid) {
    return;
  }

  const filteredGifts = filterValue === "all"
    ? shuffleArray(giftsData)
    : giftsData.filter((gift) => gift.category.toLowerCase() === filterValue);

  giftsPageGrid.innerHTML = filteredGifts.map((gift) => createGiftCardMarkup(gift)).join("");

  if (modalBackdrop) {
    bindGiftCardInteractions(giftsPageGrid.querySelectorAll(".gift-card"));
    bindModalGlobalHandlers();
  }
}

if (giftsPageGrid && giftsPageRoot) {
  renderGiftsPageCards("all");

  navTabs.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      navTabs.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");

      const tabLabel = link.textContent.trim().toLowerCase();
      const filterValue = tabLabel === "all" ? "all" : tabLabel;
      renderGiftsPageCards(filterValue);
    });
  });
} else {
  navTabs.forEach((link) => {
    link.addEventListener("click", function () {
      navTabs.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

const scrollTopBtn = document.getElementById("scroll-top-btn");

if (scrollTopBtn) {
  function updateScrollTopButton() {
    const isMobileOrTablet = window.innerWidth <= 768;
    const isScrolledDown = window.scrollY > 300;

    scrollTopBtn.classList.toggle("is-visible", isMobileOrTablet && isScrolledDown);
  }

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateScrollTopButton);
  window.addEventListener("resize", updateScrollTopButton);
  updateScrollTopButton();
}

document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector(".lcld-card");
  const sliderWindow = document.querySelector(".lcld-slider-window");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (!sliderTrack || !sliderWindow || !prevBtn || !nextBtn) {
    return;
  }

  let currentStep = 0;
  let totalSteps = 0;
  let maxOffset = 0;
  let stepOffset = 0;

  function getStepsForWidth() {
    return window.innerWidth >= 769 ? 3 : 6;
  }

  function applyOffset() {
    const offset = Math.min(stepOffset * currentStep, maxOffset);
    sliderTrack.style.transform = `translateX(-${offset}px)`;
    prevBtn.disabled = currentStep <= 0;
    nextBtn.disabled = currentStep >= totalSteps || maxOffset <= 0;
  }

  function updateSliderMetrics(resetPosition = false) {
    totalSteps = getStepsForWidth();
    maxOffset = Math.max(0, sliderTrack.scrollWidth - sliderWindow.clientWidth);
    stepOffset = totalSteps > 0 ? maxOffset / totalSteps : 0;

    if (resetPosition) {
      currentStep = 0;
    } else {
      currentStep = Math.min(currentStep, totalSteps);
    }

    applyOffset();
  }

  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) {
      currentStep += 1;
      applyOffset();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep -= 1;
      applyOffset();
    }
  });

  window.addEventListener("resize", () => updateSliderMetrics(true));
  updateSliderMetrics(true);
});