// Mobile Navigation Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuBtn.textContent = isOpen ? "CLOSE" : "MENU";
  });

  // Close mobile nav when clicking any link
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 840) {
        nav.classList.remove("open");
        menuBtn.textContent = "MENU";
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// Clean, smooth scroll reveal observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
