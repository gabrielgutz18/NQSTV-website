document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.querySelector('.map-container');
    const mapLayer1 = document.getElementById('map-layer-1');
    const mapLayer2 = document.getElementById('map-layer-2');
    const satelliteBtn = document.getElementById('satellite-toggle');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');

    if (!mapContainer || !mapLayer1 || !mapLayer2 || !satelliteBtn || !zoomInBtn || !zoomOutBtn) {
        return;
    }

    const layers = [mapLayer1, mapLayer2];
    const state = {
        isSatelliteMode: false,
        zoom: 1,
        minZoom: 1,
        maxZoom: 3,
        zoomStep: 0.25,
        panX: 0,
        panY: 0,
        isDragging: false,
        pointerId: null,
        startX: 0,
        startY: 0,
        startPanX: 0,
        startPanY: 0
    };

    layers.forEach(function (layer) {
        layer.draggable = false;
    });

    function clampPan() {
        if (state.zoom <= state.minZoom) {
            state.panX = 0;
            state.panY = 0;
            return;
        }

        const maxPanX = ((state.zoom - 1) * mapContainer.clientWidth) / 2;
        const maxPanY = ((state.zoom - 1) * mapContainer.clientHeight) / 2;

        state.panX = Math.min(maxPanX, Math.max(-maxPanX, state.panX));
        state.panY = Math.min(maxPanY, Math.max(-maxPanY, state.panY));
    }

    function applyView() {
        clampPan();

        const transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;

        layers.forEach(function (layer) {
            layer.style.transform = transform;
        });

        mapLayer2.style.opacity = state.isSatelliteMode ? '1' : '0';
        satelliteBtn.textContent = state.isSatelliteMode ? 'Map' : 'Satellite';
        satelliteBtn.style.backgroundColor = state.isSatelliteMode
            ? 'rgba(100, 200, 100, 0.78)'
            : 'rgba(228, 138, 50, 0.78)';
        satelliteBtn.setAttribute('aria-pressed', String(state.isSatelliteMode));

        const canPan = state.zoom > state.minZoom;
        mapContainer.classList.toggle('is-zoomed', canPan);
        mapContainer.classList.toggle('is-dragging', state.isDragging && canPan);

        zoomInBtn.disabled = state.zoom >= state.maxZoom;
        zoomOutBtn.disabled = state.zoom <= state.minZoom;
    }

    function setZoom(nextZoom) {
        const clampedZoom = Math.min(state.maxZoom, Math.max(state.minZoom, nextZoom));

        if (clampedZoom === state.zoom) {
            applyView();
            return;
        }

        const zoomRatio = clampedZoom / state.zoom;
        state.panX *= zoomRatio;
        state.panY *= zoomRatio;
        state.zoom = clampedZoom;

        applyView();
    }

    function stopDragging(event) {
        if (!state.isDragging) {
            return;
        }

        if (event && state.pointerId !== null && event.pointerId !== state.pointerId) {
            return;
        }

        if (
            state.pointerId !== null &&
            mapContainer.hasPointerCapture &&
            mapContainer.hasPointerCapture(state.pointerId)
        ) {
            mapContainer.releasePointerCapture(state.pointerId);
        }

        state.isDragging = false;
        state.pointerId = null;
        applyView();
    }

    satelliteBtn.addEventListener('click', function () {
        state.isSatelliteMode = !state.isSatelliteMode;
        applyView();
    });

    zoomInBtn.addEventListener('click', function () {
        setZoom(state.zoom + state.zoomStep);
    });

    zoomOutBtn.addEventListener('click', function () {
        setZoom(state.zoom - state.zoomStep);
    });

    mapContainer.addEventListener('pointerdown', function (event) {
        if (state.zoom <= state.minZoom || event.button > 0 || event.target.closest('button')) {
            return;
        }

        event.preventDefault();
        state.isDragging = true;
        state.pointerId = event.pointerId;
        state.startX = event.clientX;
        state.startY = event.clientY;
        state.startPanX = state.panX;
        state.startPanY = state.panY;

        if (mapContainer.setPointerCapture) {
            mapContainer.setPointerCapture(event.pointerId);
        }

        applyView();
    });

    mapContainer.addEventListener('pointermove', function (event) {
        if (!state.isDragging || event.pointerId !== state.pointerId) {
            return;
        }

        event.preventDefault();
        state.panX = state.startPanX + (event.clientX - state.startX);
        state.panY = state.startPanY + (event.clientY - state.startY);
        applyView();
    });

    mapContainer.addEventListener('pointerup', stopDragging);
    mapContainer.addEventListener('pointercancel', stopDragging);
    mapContainer.addEventListener('lostpointercapture', stopDragging);
    window.addEventListener('resize', applyView);

    applyView();
});
