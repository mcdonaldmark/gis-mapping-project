const map = L.map('map').setView([40.7608, -111.8910], 12);  // Salt Lake City, Utah

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let locations = [];
let markers = [];

// Load CSV
function loadMarkersFromCSV(csvData) {
    const result = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            console.log('Parsed Results:', results); 
            locations = results.data; 
            addMarkers(locations);
            updateMarkerCount();
        }
    });
}

fetch('lds_temples.csv')
    .then(response => response.text())
    .then(data => loadMarkersFromCSV(data))
    .catch(error => console.error('Error loading CSV:', error));

// Add markers
function addMarkers(locations) {
    locations.forEach(location => {
        const { Name, Description, Category, Address, Latitude, Longitude } = location;
        const lat = parseFloat(Latitude);
        const lon = parseFloat(Longitude);

        if (isNaN(lat) || isNaN(lon)) {
            console.error(`Invalid lat/lon for location: ${Name}`);
            return;
        }

        let existingMarker = markers.find(marker =>
            marker.getLatLng().lat === lat &&
            marker.getLatLng().lng === lon
        );

        if (!existingMarker) {
            const marker = L.marker([lat, lon])
                .bindPopup(`
                    <b>${Name}</b><br>
                    ${Description}<br>
                    <i>${Category}</i><br><br>
                    <b>Address:</b> ${Address}<br>
                `)
                .addTo(map); 

            markers.push(marker);
        }
    });

    updateMarkerCount();
}

// Filter
function filterMarkers(category) {
    const filteredLocations = category === 'All'
        ? locations
        : locations.filter(loc => loc.Category === category);

    markers.forEach(marker => marker.remove());
    markers = [];

    addMarkers(filteredLocations);
}

// Dropdown listener
const filterSelect = document.getElementById('filterSelect');
filterSelect.addEventListener('change', function (e) {
    const selectedCategory = e.target.value;
    filterMarkers(selectedCategory);
});

// 🔍 Search by name
function searchMarkers(searchTerm) {
    const filteredLocations = locations.filter(loc =>
        loc.Name && loc.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    markers.forEach(marker => marker.remove());
    markers = [];

    addMarkers(filteredLocations);
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function (e) {
        searchMarkers(e.target.value);
    });
}

// 📊 Marker counter
function updateMarkerCount() {
    const counter = document.getElementById('markerCount');
    if (counter) {
        counter.textContent = `Markers on map: ${markers.length}`;
    }
}

// 📍 Click map to log coordinates
map.on('click', function (e) {
    console.log(`Lat: ${e.latlng.lat}, Lon: ${e.latlng.lng}`);
});

// 🧭 Reset view button
function resetMapView() {
    map.setView([40.7608, -111.8910], 12);
}

// 🎯 Zoom to all markers
function zoomToMarkers() {
    if (markers.length === 0) return;

    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
}

// Button listeners
const resetBtn = document.getElementById('resetMap');
if (resetBtn) {
    resetBtn.addEventListener('click', resetMapView);
}

const zoomBtn = document.getElementById('zoomMarkers');
if (zoomBtn) {
    zoomBtn.addEventListener('click', zoomToMarkers);
}