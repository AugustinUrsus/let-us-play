/* ============================================================
   Let Us Play 🙏 — interactive behaviour
   ------------------------------------------------------------
   ▸▸▸  CONFIGURE THESE TWO VALUES  ◀◀◀
   ============================================================ */

// 1) Jeff's Amazon product page. Paste the full URL between the quotes.
//    Every "Get Your Copy" / "Get the Book" button uses this.
const AMAZON_URL = "REPLACE_WITH_AMAZON_URL";

// 2) Formspree form ID (the part after /f/ in your endpoint).
//    Sign up free at https://formspree.io, create a form, and paste
//    its ID here. Leave as-is to keep the form disabled gracefully.
const FORMSPREE_ID = "xojbgqke";

/* ============================================================
   No changes needed below this line.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Wire up all "buy" buttons to the Amazon link ---- */
  const buyButtons = document.querySelectorAll("[data-buy]");
  const amazonReady = AMAZON_URL && AMAZON_URL !== "REPLACE_WITH_AMAZON_URL";
  buyButtons.forEach((btn) => {
    if (amazonReady) {
      btn.setAttribute("href", AMAZON_URL);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
    } else {
      // Until the real link is added, buy buttons scroll to the buy section.
      btn.setAttribute("href", "#buy");
    }
  });

  /* ---- Sticky nav: solid background after scrolling past hero ---- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > window.innerHeight * 0.6);

    // Subtle hero parallax
    const bg = document.querySelector(".hero__bg");
    if (bg && window.scrollY < window.innerHeight) {
      bg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.18}px)`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Scroll reveal animations ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Free chapter: continue reading ---- */
  const continueBtn = document.getElementById("continueBtn");
  const more = document.getElementById("readerMore");
  const reader = document.querySelector(".reader");
  const fade = document.getElementById("readerFade");
  if (continueBtn && more) {
    continueBtn.addEventListener("click", () => {
      more.hidden = false;
      reader.classList.add("is-open");
      if (fade) fade.style.display = "none";
      continueBtn.remove();
      more.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  /* ---- Email form (Formspree) ---- */
  const form = document.getElementById("emailForm");
  const status = document.getElementById("formStatus");
  const formspreeReady = FORMSPREE_ID && FORMSPREE_ID !== "FORMSPREE_ID";

  if (form) {
    if (formspreeReady) {
      form.setAttribute("action", `https://formspree.io/f/${FORMSPREE_ID}`);
    }
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!formspreeReady) {
        status.textContent = "Email signup isn't connected yet — check back soon!";
        status.className = "email-form__status err";
        return;
      }
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.reset();
          status.textContent = "🙏 You're in. Check your inbox for the Introduction.";
          status.className = "email-form__status ok";
        } else {
          throw new Error("bad response");
        }
      } catch {
        status.textContent = "Something went wrong. Please try again.";
        status.className = "email-form__status err";
      }
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
