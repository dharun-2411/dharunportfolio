const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
menuBtn.addEventListener("click", () => { nav.style.display = nav.style.display === "flex" ? "none" : "flex" });
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => { if (innerWidth <= 820) nav.style.display = "none" }));

const orb = document.getElementById("orb");
window.addEventListener("pointermove", (e) => {
  if (!orb) return;
  const x = (e.clientX / innerWidth - .5) * 18;
  const y = (e.clientY / innerHeight - .5) * -18;
  orb.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible") });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".project").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    card.style.transform = `perspective(900px) rotateX(${-(e.clientY - r.top - r.height / 2) / 35}deg) rotateY(${(e.clientX - r.left - r.width / 2) / 45}deg)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});
