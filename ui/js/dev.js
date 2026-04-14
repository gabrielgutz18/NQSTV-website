function initDeveloperParticles() {
    const particleHost = document.getElementById("particles-js");

    if (!particleHost) {
        console.warn('Particle container "#particles-js" was not found.');
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
    document.addEventListener("DOMContentLoaded", initDeveloperParticles);
} else {
    initDeveloperParticles();
}
