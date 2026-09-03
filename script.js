// ================================
// KAALDARSHAN — INTERACTIVE ENGINE
// ================================

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// ================================
// SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(
  ".card, .arch div, .step, .quote, .head, .logoCard"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});


// ================================
// NAVBAR EFFECT
// ================================

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    nav.style.background = "#080807f5";
    nav.style.boxShadow = "0 10px 40px #0008";
  } else {
    nav.style.background = "#080807cc";
    nav.style.boxShadow = "none";
  }
});


// ================================
// 3D HERO EFFECT
// ================================

const logoCard = document.querySelector(".logoCard");

if (logoCard) {
  logoCard.addEventListener("mousemove", event => {
    const rect = logoCard.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -8;

    const rotateY =
      ((x / rect.width) - 0.5) * 8;

    logoCard.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  logoCard.addEventListener("mouseleave", () => {
    logoCard.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}


// ================================
// PARALLAX HERO
// ================================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  if (!hero) return;

  const scrollPosition = window.scrollY;

  if (scrollPosition < window.innerHeight) {
    hero.style.backgroundPosition =
      `center ${scrollPosition * 0.25}px`;
  }
});


// ================================
// HERITAGE SITE DATA
// ================================

const heritageSites = {

  jallianwala: {
    title: "Jallianwala Bagh",
    location: "Amritsar, Punjab",
    period: "1919",
    description:
      "Experience a spatial interpretation of a defining moment in India's freedom struggle."
  },

  mysore: {
    title: "Mysore Palace",
    location: "Mysuru, Karnataka",
    period: "Royal Era",
    description:
      "Explore the grandeur of the Wadiyar royal court through an immersive historical layer."
  },

  hampi: {
    title: "Hampi",
    location: "Vijayanagara, Karnataka",
    period: "Vijayanagara Empire",
    description:
      "Step into the world of the Vijayanagara Empire and explore the heritage landscape."
  }

};


// ================================
// DEMO SITE SWITCHER
// ================================

function showHeritageMessage(site) {

  const data = heritageSites[site];

  if (!data) return;

  const message = document.createElement("div");

  message.className = "heritage-popup";

  message.innerHTML = `
    <div class="popup-inner">

      <button class="popup-close">&times;</button>

      <div class="eyebrow">
        KAALDARSHAN EXPERIENCE
      </div>

      <h2>${data.title}</h2>

      <p class="popup-location">
        ${data.location} · ${data.period}
      </p>

      <p>
        ${data.description}
      </p>

      <button class="btn primary start-ar">
        Enter AR Preview ✦
      </button>

    </div>
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.classList.add("active");
  }, 20);

  message
    .querySelector(".popup-close")
    .addEventListener("click", () => {
      message.classList.remove("active");

      setTimeout(() => {
        message.remove();
      }, 300);
    });

  message
    .querySelector(".start-ar")
    .addEventListener("click", () => {

      message.remove();

      startARPreview(data);

    });
}


// ================================
// ADD SITE INTERACTION
// ================================

const experienceSection =
  document.querySelector("#experience");

if (experienceSection) {

  const featureCard =
    experienceSection.querySelector(".card");

  if (featureCard) {

    featureCard.style.cursor = "pointer";

    featureCard.addEventListener("click", () => {

      showHeritageMessage("jallianwala");

    });

  }

}


// ================================
// AR CAMERA PREVIEW
// ================================

async function startARPreview(site) {

  const overlay = document.createElement("div");

  overlay.className = "ar-overlay";

  overlay.innerHTML = `

    <video
      id="arCamera"
      autoplay
      playsinline>
    </video>

    <div class="ar-interface">

      <button class="ar-close">
        ×
      </button>

      <div class="ar-header">

        <span class="record-dot"></span>

        KAALDARSHAN AR

        <span class="ar-site">
          ${site.title.toUpperCase()}
        </span>

      </div>

      <div class="ar-crosshair">
        +
      </div>

      <div class="historical-marker">

        <div class="marker-symbol">
          ✦
        </div>

        <strong>
          HISTORICAL LAYER
        </strong>

        <small>
          ${site.period}
        </small>

      </div>

      <div class="ar-bottom">

        <div>

          <small>
            SELECTED HERITAGE SITE
          </small>

          <strong>
            ${site.title}
          </strong>

        </div>

        <div class="ar-status">
          SPATIAL PREVIEW
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add("active");
  }, 20);

  const video =
    overlay.querySelector("#arCamera");

  try {

    const stream =
      await navigator.mediaDevices.getUserMedia({

        video: {
          facingMode: {
            ideal: "environment"
          }
        },

        audio: false

      });

    video.srcObject = stream;

  } catch (error) {

    console.log("Camera permission unavailable.");

    overlay.classList.add("demo-mode");

    const demoMessage =
      document.createElement("div");

    demoMessage.className =
      "camera-message";

    demoMessage.innerHTML = `
      <div>
        <div class="marker-symbol">✦</div>

        <h2>
          AR Preview Mode
        </h2>

        <p>
          Camera access was not granted.
          The KaalDarshan spatial interface
          is still available as a demonstration.
        </p>
      </div>
    `;

    overlay.appendChild(demoMessage);

  }


  // Close AR

  overlay
    .querySelector(".ar-close")
    .addEventListener("click", () => {

      if (video.srcObject) {

        video.srcObject
          .getTracks()
          .forEach(track => track.stop());

      }

      overlay.classList.remove("active");

      setTimeout(() => {
        overlay.remove();
      }, 400);

    });

}


// ================================
// KEYBOARD ESCAPE
// ================================

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    const overlay =
      document.querySelector(".ar-overlay");

    if (overlay) {

      const video =
        overlay.querySelector("video");

      if (video && video.srcObject) {

        video.srcObject
          .getTracks()
          .forEach(track => track.stop());

      }

      overlay.remove();

    }

  }

});


// ================================
// ADD DYNAMIC STYLES
// ================================

const dynamicStyles = document.createElement("style");

dynamicStyles.textContent = `

.reveal {
  opacity: 0;
  transform: translateY(35px);
  transition:
    opacity .8s ease,
    transform .8s ease;
}

.revealed {
  opacity: 1;
  transform: translateY(0);
}

.logoCard {
  transition: transform .2s ease;
}

.heritage-popup {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 25px;
  background: rgba(0,0,0,.82);
  backdrop-filter: blur(12px);
  opacity: 0;
  transition: opacity .3s ease;
}

.heritage-popup.active {
  opacity: 1;
}

.popup-inner {
  position: relative;
  width: min(600px, 100%);
  padding: 45px;
  border: 1px solid #3b2d19;
  border-radius: 25px;
  background:
    radial-gradient(
      circle at 80% 10%,
      #d8ad581c,
      transparent 40%
    ),
    #11100e;
  box-shadow: 0 40px 100px #000;
}

.popup-inner h2 {
  font-size: 52px;
}

.popup-inner p {
  line-height: 1.8;
}

.popup-location {
  color: #d8ad58 !important;
  font-size: 13px !important;
  text-transform: uppercase;
  letter-spacing: .12em;
}

.popup-close {
  position: absolute;
  right: 20px;
  top: 15px;
  width: 40px;
  height: 40px;
  border: 1px solid #3b2d19;
  border-radius: 50%;
  background: transparent;
  color: #f4ead7;
  font-size: 25px;
  cursor: pointer;
}

.ar-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: #080807;
  overflow: hidden;
  opacity: 0;
  transition: opacity .4s ease;
}

.ar-overlay.active {
  opacity: 1;
}

.ar-overlay video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ar-interface {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ar-close {
  position: absolute;
  pointer-events: auto;
  right: 25px;
  top: 25px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #ffffff55;
  background: #0009;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

.ar-header {
  position: absolute;
  top: 30px;
  left: 30px;
  padding: 12px 15px;
  background: #0009;
  border: 1px solid #ffffff22;
  font: 11px monospace;
  letter-spacing: 2px;
}

.record-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: #e16e55;
}

.ar-site {
  color: #d8ad58;
  margin-left: 18px;
}

.ar-crosshair {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #ffffffaa;
  font: 30px monospace;
}

.historical-marker {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%,-50%);
  display: grid;
  text-align: center;
  padding: 20px 30px;
  border: 1px solid #d8ad58;
  background: #080807dd;
  box-shadow: 0 0 60px #d8ad5830;
}

.marker-symbol {
  color: #d8ad58;
  font-size: 28px;
}

.historical-marker strong {
  margin-top: 5px;
  font: 11px monospace;
  letter-spacing: 2px;
}

.historical-marker small {
  margin-top: 5px;
  color: #aaa;
  font: 10px monospace;
}

.ar-bottom {
  position: absolute;
  bottom: 25px;
  left: 30px;
  right: 30px;
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.ar-bottom small {
  display: block;
  color: #aaa;
  font: 9px monospace;
  letter-spacing: 2px;
}

.ar-bottom strong {
  display: block;
  margin-top: 5px;
  font: 20px Georgia;
}

.ar-status {
  padding: 10px 14px;
  border: 1px solid #ffffff33;
  background: #0008;
  color: #d8ad58;
  font: 9px monospace;
  letter-spacing: 1px;
}

.camera-message {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 30px;
  background:
    radial-gradient(
      circle,
      #302c20,
      #080807 65%
    );
}

.camera-message > div {
  max-width: 500px;
}

.camera-message h2 {
  font-size: 42px;
}

.camera-message p {
  font-size: 15px;
}

@media(max-width:600px) {

  .popup-inner {
    padding: 30px;
  }

  .popup-inner h2 {
    font-size: 38px;
  }

  .ar-header {
    left: 15px;
    top: 15px;
  }

  .ar-site {
    display: block;
    margin: 5px 0 0;
  }

  .ar-bottom {
    left: 15px;
    right: 15px;
    bottom: 15px;
  }

}

`;

document.head.appendChild(dynamicStyles);


// ================================
// CONSOLE BRANDING
// ================================

console.log(
  "%c KAALDARSHAN ",
  "background:#d8ad58;color:#080807;padding:8px;font-weight:bold"
);

console.log(
  "Past connects. History lives."
);
