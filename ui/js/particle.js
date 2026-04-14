function ensureTeamParticleHost() {
    let particleHost = document.getElementById("particles-js");

    if (particleHost) {
        return particleHost;
    }

    const section = document.querySelector(".container");
    if (!section) {
        console.warn('Team particle container root ".container" was not found.');
        return null;
    }

    section.style.position = section.style.position || "relative";
    section.style.overflow = section.style.overflow || "hidden";
    section.style.isolation = section.style.isolation || "isolate";

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "team-content";

    while (section.firstChild) {
        contentWrapper.appendChild(section.firstChild);
    }

    contentWrapper.style.position = "relative";
    contentWrapper.style.zIndex = "1";

    particleHost = document.createElement("div");
    particleHost.id = "particles-js";
    particleHost.className = "team-particles";
    particleHost.setAttribute("aria-hidden", "true");
    particleHost.style.position = "absolute";
    particleHost.style.inset = "0";
    particleHost.style.zIndex = "0";
    particleHost.style.pointerEvents = "none";

    section.appendChild(particleHost);
    section.appendChild(contentWrapper);

    return particleHost;
}

function initTeamParticles() {
    const particleHost = ensureTeamParticleHost();

    if (!particleHost) {
        return;
    }

    if (typeof particlesJS !== "function") {
        console.warn("particles.js library is not loaded.");
        return;
    }

    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: { enable: true, value_area: 800 }
            },
            color: { value: "#000000" },
            shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" }
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#000000",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTeamParticles);
} else {
    initTeamParticles();
}
