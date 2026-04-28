function initPageLoader() {
    const loader = document.querySelector(".loader");

    if (!loader) {
        return;
    }

    const startTime = (window.performance && performance.now) ? performance.now() : Date.now();
    const minVisibleMs = 700;

    const hideLoader = () => {
        loader.classList.add("is-hidden");
        window.setTimeout(() => {
            loader.remove();
        }, 350);
    };

    const handleLoaded = () => {
        const now = (window.performance && performance.now) ? performance.now() : Date.now();
        const elapsed = now - startTime;
        const delay = Math.max(0, minVisibleMs - elapsed);
        window.setTimeout(hideLoader, delay);
    };

    if (document.readyState === "complete") {
        handleLoaded();
        return;
    }

    window.addEventListener("load", handleLoaded, { once: true });
}

initPageLoader();
