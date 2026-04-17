  document.addEventListener('DOMContentLoaded', function() {
                const satelliteBtn = document.getElementById('satellite-toggle');
                const mapLayer2 = document.getElementById('map-layer-2');
                const zoomInBtn = document.getElementById('zoom-in-btn');
                const zoomOutBtn = document.getElementById('zoom-out-btn');
                const mapLayer1 = document.getElementById('map-layer-1');
                
                let isSatelliteMode = false;
                let currentZoom = 1;
                
                
                if (satelliteBtn && mapLayer2) {
                    satelliteBtn.addEventListener('click', function() {
                        isSatelliteMode = !isSatelliteMode;
                        if (isSatelliteMode) {
                            mapLayer2.style.opacity = '1';
                            satelliteBtn.textContent = 'Map';
                            satelliteBtn.style.backgroundColor = 'rgba(100, 200, 100, 0.75)';
                        } else {
                            mapLayer2.style.opacity = '0';
                            satelliteBtn.textContent = 'Satellite';
                            satelliteBtn.style.backgroundColor = 'rgba(228, 138, 50, 0.75)';
                        }
                        console.log('Satellite mode:', isSatelliteMode);
                    });
                }
                
                // Zoom in
                if (zoomInBtn && mapLayer1 && mapLayer2) {
                    zoomInBtn.addEventListener('click', function() {
                        if (currentZoom < 3) {
                            currentZoom += 0.2;
                            mapLayer1.style.transform = 'scale(' + currentZoom + ')';
                            mapLayer2.style.transform = 'scale(' + currentZoom + ')';
                            console.log('Zoom in:', currentZoom);
                        }
                    });
                }
                
                // Zoom out
                if (zoomOutBtn && mapLayer1 && mapLayer2) {
                    zoomOutBtn.addEventListener('click', function() {
                        if (currentZoom > 1) {
                            currentZoom -= 0.2;
                            mapLayer1.style.transform = 'scale(' + currentZoom + ')';
                            mapLayer2.style.transform = 'scale(' + currentZoom + ')';
                            console.log('Zoom out:', currentZoom);
                        }
                    });
                }
            });