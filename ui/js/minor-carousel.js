(function () {
    "use strict";

    function initCarousel(carousel) {
        var track = carousel.querySelector(".minor-carousel-track");
        if (!track) {
            return;
        }

        var originalItems = Array.prototype.slice.call(track.children);
        if (originalItems.length < 2) {
            return;
        }

        originalItems.forEach(function (item) {
            var clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
        });

        var speed = Number(carousel.getAttribute("data-speed")) || 22;
        var respectReducedMotion = carousel.getAttribute("data-respect-motion") === "true";
        var offset = 0;
        var loopWidth = track.scrollWidth / 2;
        var lastFrame = performance.now();
        var centerTimer = 0;
        var isPageHidden = document.hidden;
        var isDragging = false;
        var dragStartX = 0;
        var dragStartOffset = 0;
        var activePointerId = null;
        var rafId = 0;
        var reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        var reducedMotion = respectReducedMotion && reducedMotionQuery.matches;

        function clearCenterState() {
            track.querySelectorAll(".minor-carousel-item.is-center").forEach(function (item) {
                item.classList.remove("is-center");
            });
        }

        function updateCenterItem() {
            var bounds = carousel.getBoundingClientRect();
            var centerX = bounds.left + bounds.width / 2;
            var bestItem = null;
            var bestDistance = Infinity;

            Array.prototype.forEach.call(track.children, function (item) {
                var rect = item.getBoundingClientRect();
                if (rect.right < bounds.left || rect.left > bounds.right) {
                    return;
                }

                var itemCenter = rect.left + rect.width / 2;
                var distance = Math.abs(itemCenter - centerX);

                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestItem = item;
                }
            });

            clearCenterState();
            if (bestItem) {
                bestItem.classList.add("is-center");
            }
        }

        function recalcLoopWidth() {
            loopWidth = track.scrollWidth / 2;
            if (loopWidth > 0) {
                offset = ((offset % loopWidth) + loopWidth) % loopWidth;
                track.style.transform = "translate3d(" + (-offset) + "px, 0, 0)";
            }
            updateCenterItem();
        }

        function applyOffset() {
            if (loopWidth <= 0) {
                return;
            }
            offset = ((offset % loopWidth) + loopWidth) % loopWidth;
            track.style.transform = "translate3d(" + (-offset) + "px, 0, 0)";
        }

        function onPointerDown(event) {
            if (event.pointerType === "mouse" && event.button !== 0) {
                return;
            }
            if (loopWidth <= 0) {
                return;
            }

            isDragging = true;
            activePointerId = event.pointerId;
            dragStartX = event.clientX;
            dragStartOffset = offset;

            carousel.classList.add("is-dragging");
            if (carousel.setPointerCapture) {
                carousel.setPointerCapture(activePointerId);
            }
        }

        function onPointerMove(event) {
            if (!isDragging || event.pointerId !== activePointerId) {
                return;
            }

            var deltaX = event.clientX - dragStartX;
            offset = dragStartOffset - deltaX;
            applyOffset();
            updateCenterItem();
        }

        function onPointerEnd(event) {
            if (!isDragging || event.pointerId !== activePointerId) {
                return;
            }

            isDragging = false;
            carousel.classList.remove("is-dragging");
            if (carousel.releasePointerCapture && activePointerId !== null) {
                carousel.releasePointerCapture(activePointerId);
            }
            activePointerId = null;
        }

        function animate(now) {
            var deltaSeconds = (now - lastFrame) / 1000;
            lastFrame = now;

            if (!isPageHidden && !isDragging && !reducedMotion && loopWidth > 0) {
                offset += speed * deltaSeconds;
                if (offset >= loopWidth) {
                    offset -= loopWidth;
                }
                track.style.transform = "translate3d(" + (-offset) + "px, 0, 0)";
            }

            centerTimer += deltaSeconds;
            if (centerTimer >= 0.08) {
                updateCenterItem();
                centerTimer = 0;
            }

            rafId = requestAnimationFrame(animate);
        }

        document.addEventListener("visibilitychange", function () {
            isPageHidden = document.hidden;
        });

        reducedMotionQuery.addEventListener("change", function (event) {
            reducedMotion = respectReducedMotion && event.matches;
        });

        window.addEventListener("resize", recalcLoopWidth);

        carousel.addEventListener("pointerdown", onPointerDown);
        carousel.addEventListener("pointermove", onPointerMove);
        carousel.addEventListener("pointerup", onPointerEnd);
        carousel.addEventListener("pointercancel", onPointerEnd);
        carousel.addEventListener("pointerleave", onPointerEnd);

        track.querySelectorAll("img").forEach(function (image) {
            if (!image.complete) {
                image.addEventListener("load", recalcLoopWidth, { once: true });
            }
        });

        recalcLoopWidth();
        rafId = requestAnimationFrame(animate);

        window.addEventListener("beforeunload", function () {
            cancelAnimationFrame(rafId);
            carousel.removeEventListener("pointerdown", onPointerDown);
            carousel.removeEventListener("pointermove", onPointerMove);
            carousel.removeEventListener("pointerup", onPointerEnd);
            carousel.removeEventListener("pointercancel", onPointerEnd);
            carousel.removeEventListener("pointerleave", onPointerEnd);
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".minor-carousel").forEach(function (carousel) {
            initCarousel(carousel);
        });
    });
})();
