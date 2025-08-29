new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Segundo Swiper con botones personalizados
new Swiper('.swiper2', {
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next-2',
        prevEl: '.swiper-button-prev-2',
    },
    slidesPerView: 3,  // Muestra 3 slides a la vez
    spaceBetween: -30,

});



// MAPA LOCALES
var mapa = L.map('mapa');  // No se configura aún el centro ni zoom

// Cargar mapa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);

// Ícono azul para "Estás aquí"
var iconoUsuario = L.icon({
    iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 32]
});

// Función para obtener la ubicación actual del usuario
function obtenerUbicacion() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            // Centrar el mapa en la ubicación del usuario con zoom
            mapa.setView([lat, lng], 14);

            // Crear el marcador de la ubicación
            var marcadorUsuario = L.marker([lat, lng], { icon: iconoUsuario }).addTo(mapa)
                .bindPopup("📍 Estás aquí", { className: 'popup-pequeño' });

            // Mostrar el popup automáticamente al cargar
            marcadorUsuario.openPopup();

            // Hacer que el popup de "Estás aquí" se desvanezca después de 3 segundos
            setTimeout(function() {
                marcadorUsuario._popup._container.style.opacity = 0;
            }, 3000);

            // Evento para restablecer la opacidad del popup cuando se hace clic en el marcador
            marcadorUsuario.on('click', function() {
                marcadorUsuario.openPopup();
                setTimeout(function() {
                    marcadorUsuario._popup._container.style.opacity = 0;
                }, 3000);
            });
        }, function(error) {
            alert("No se pudo obtener la ubicación: " + error.message);
        });
    } else {
        alert("Geolocalización no soportada en este navegador.");
    }
}

// Llamar a la función para obtener la ubicación
obtenerUbicacion();

// URL para obtener los datos de los locales
const url = "https://nominatim.openstreetmap.org/search?format=json&q=Subway+Capital+Federal";
const url2 = "https://nominatim.openstreetmap.org/search?format=json&q=Subway+Buenos+Aires";
const url3 = "https://nominatim.openstreetmap.org/search?format=json&q=Subway+Argentina&limit=50";

// Obtener los datos y agregar marcadores
fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(place => {
            const marker = L.marker([place.lat, place.lon]).addTo(mapa)
                .bindPopup(`<b>${place.name || "Subway"}</b><br>${place.display_name}`);
        });
    })
    .catch(error => console.error("Error al obtener los datos:", error));

fetch(url2)
.then(response => response.json())
.then(data => {
    data.forEach(place => {
        const marker = L.marker([place.lat, place.lon]).addTo(mapa)
            .bindPopup(`<b>${place.name || "Subway"}</b><br>${place.display_name}`);
    });
})
.catch(error => console.error("Error al obtener los datos:", error));

fetch(url3)
.then(response => response.json())
.then(data => {
    data.forEach(place => {
        const marker = L.marker([place.lat, place.lon]).addTo(mapa)
            .bindPopup(`<b>${place.name || "Subway"}</b><br>${place.display_name}`);
    });
})
.catch(error => console.error("Error al obtener los datos:", error));
