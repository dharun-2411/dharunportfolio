/**
 * Dharun J Portfolio — 3D Visual Engine & Interactive Effects
 * Features:
 * 1. High-Performance Three.js 3D Cosmic WebGL Scene with 3D Holographic Geometry & Parallax Starfield
 * 2. Real-Time 3D Parallax Card Tilt with Dynamic Specular Glare & Multi-Layer Z-Depth
 * 3. Interactive Ambient Cursor Glow & Magnetic Micro-Interactions
 * 4. Responsive Mobile Navigation & 3D Scroll Reveal
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. Mobile Navigation Menu Toggle
  // ==========================================================================
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuBtn.textContent = isOpen ? "CLOSE" : "MENU";
    });

    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 840) {
          nav.classList.remove("open");
          menuBtn.textContent = "MENU";
          menuBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // ==========================================================================
  // 2. Interactive Ambient Cursor Glow
  // ==========================================================================
  const cursorGlow = document.getElementById("cursor-glow");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursorGlow() {
    if (cursorGlow) {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursorGlow.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    }
    requestAnimationFrame(renderCursorGlow);
  }
  requestAnimationFrame(renderCursorGlow);

  // ==========================================================================
  // 3. Three.js 3D Hologram & Particle Universe Scene
  // ==========================================================================
  const canvas = document.getElementById("bg-canvas");
  if (canvas && typeof THREE !== "undefined") {
    initThreeJSScene();
  }

  function initThreeJSScene() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07060b, 0.00085);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const purplePointLight = new THREE.PointLight(0x8b5cf6, 2.5, 900);
    purplePointLight.position.set(200, 150, 200);
    scene.add(purplePointLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 2.2, 900);
    cyanPointLight.position.set(-200, -150, 150);
    scene.add(cyanPointLight);

    // -------------------------------------------------------------
    // 3D Holographic Geometric Core (Hero Visual Element)
    // -------------------------------------------------------------
    const holoGroup = new THREE.Group();

    // 1. Outer Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(110, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
      roughness: 0.2,
      metalness: 0.8,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    holoGroup.add(icoMesh);

    // 2. Inner Glowing Octahedron Core
    const octGeo = new THREE.OctahedronGeometry(58, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: false,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.9,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    holoGroup.add(octMesh);

    // 3. Inner Wireframe Octahedron Shell
    const octWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const octWireMesh = new THREE.Mesh(octGeo, octWireMat);
    octWireMesh.scale.set(1.02, 1.02, 1.02);
    holoGroup.add(octWireMesh);

    // 4. Dual Rotating Orbital Tech Rings
    const ring1Geo = new THREE.TorusGeometry(150, 1.4, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.55,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    holoGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(175, 1.2, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    holoGroup.add(ring2);

    // Position hologram elegantly in hero right space or centered responsive
    function updateHoloPosition() {
      if (window.innerWidth > 960) {
        holoGroup.position.set(220, 30, 0);
        holoGroup.scale.set(1, 1, 1);
      } else if (window.innerWidth > 640) {
        holoGroup.position.set(120, 60, -80);
        holoGroup.scale.set(0.75, 0.75, 0.75);
      } else {
        holoGroup.position.set(0, 100, -120);
        holoGroup.scale.set(0.55, 0.55, 0.55);
      }
    }
    updateHoloPosition();
    scene.add(holoGroup);

    // -------------------------------------------------------------
    // 3D Interactive Floating Starfield / Constellation
    // -------------------------------------------------------------
    const particleCount = 1100;
    const posArray = new Float32Array(particleCount * 3);
    const colArray = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xa78bfa), // Soft lavender
      new THREE.Color(0xffffff), // Bright white
    ];

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 1600;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 1400;

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colArray[i * 3] = chosenColor.r;
      colArray[i * 3 + 1] = chosenColor.g;
      colArray[i * 3 + 2] = chosenColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colArray, 3));

    // Dynamic point material
    const particlesMat = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // -------------------------------------------------------------
    // Mouse Interaction & Scroll Depth Physics
    // -------------------------------------------------------------
    let targetRotX = 0;
    let targetRotY = 0;
    let targetCamZ = 400;
    let targetCamY = 0;

    window.addEventListener("pointermove", (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = normX * 0.45;
      targetRotX = -normY * 0.45;
    });

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      // Camera travels deeper and tilts as user reads down
      targetCamZ = 400 - progress * 150;
      targetCamY = -progress * 220;
    }, { passive: true });

    // -------------------------------------------------------------
    // Animation Loop (Silky 60fps with delta time)
    // -------------------------------------------------------------
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Holographic group continuous self-rotation + mouse response
      icoMesh.rotation.x += 0.22 * delta;
      icoMesh.rotation.y += 0.32 * delta;

      octMesh.rotation.x -= 0.35 * delta;
      octMesh.rotation.z += 0.28 * delta;
      octWireMesh.rotation.x -= 0.35 * delta;
      octWireMesh.rotation.z += 0.28 * delta;

      ring1.rotation.z += 0.45 * delta;
      ring2.rotation.y += 0.38 * delta;

      // Gentle floating pulsation
      holoGroup.position.y += Math.sin(elapsedTime * 1.6) * 0.18;

      // Mouse tracking interpolation
      holoGroup.rotation.y += (targetRotY - holoGroup.rotation.y) * 0.05;
      holoGroup.rotation.x += (targetRotX - holoGroup.rotation.x) * 0.05;

      // Particle field subtle drift
      particlesMesh.rotation.y = elapsedTime * 0.02 + targetRotY * 0.2;
      particlesMesh.rotation.x = elapsedTime * 0.01 + targetRotX * 0.1;

      // Smooth camera position interpolation
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;

      renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateHoloPosition();
    });
  }

  // ==========================================================================
  // 4. True 3D Parallax Tilt Engine for Cards
  // ==========================================================================
  const tiltCardSelectors = [
    ".profile-card",
    ".skill-card",
    ".project-card-showcase",
    ".hackathon-card",
    ".pillar-card",
    ".timeline-item",
    ".edu-card",
    ".cert-card",
    ".patent-box",
    ".contact-grid a",
    ".facts div",
    ".p-metric"
  ];

  const tiltCards = document.querySelectorAll(tiltCardSelectors.join(", "));

  tiltCards.forEach((card) => {
    // Inject dynamic specular glare shine element
    let glare = card.querySelector(".card-glare");
    if (!glare) {
      glare = document.createElement("div");
      glare.className = "card-glare";
      card.appendChild(glare);
    }

    let isHovered = false;
    let bounds = null;

    card.addEventListener("mouseenter", () => {
      isHovered = true;
      bounds = card.getBoundingClientRect();
      card.style.transition = "transform 0.12s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out";
      if (glare) glare.style.opacity = "1";
    });

    card.addEventListener("mousemove", (e) => {
      if (!isHovered || !bounds) return;

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      // Calculate 3D tilt angles (max ~12 degrees for sleek realistic feel)
      const maxTilt = card.classList.contains("profile-card") ? 14 : 9;
      const rotX = ((mouseY - centerY) / centerY) * -maxTilt;
      const rotY = ((mouseX - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(10px) scale3d(1.02, 1.02, 1.02)`;

      // Update dynamic glare reflection coordinates
      const glarePercentX = (mouseX / bounds.width) * 100;
      const glarePercentY = (mouseY / bounds.height) * 100;
      if (glare) {
        glare.style.background = `radial-gradient(circle 280px at ${glarePercentX}% ${glarePercentY}%, rgba(255, 255, 255, 0.16), transparent 70%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      isHovered = false;
      card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.5s ease";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)";
      if (glare) {
        glare.style.opacity = "0";
      }
    });
  });

  // ==========================================================================
  // 5. 3D Scroll Reveal Observer
  // ==========================================================================
  const revealElements = document.querySelectorAll(
    ".reveal, .section, .project-card-showcase, .hackathon-card, .pillar-card, .timeline-item, .skill-card, .edu-card, .cert-card, .patent-box"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();
