(function () {
    "use strict";

    var INSTITUTO = { lat: 40.4168, lng: -3.7038 }; // Placeholder: centro de Madrid
    var RADIO_METROS = 200;
    var STORAGE_KEY = "atrapalos:museo";

    function distanciaMetros(lat1, lng1, lat2, lng2) {
        var R = 6371000;
        var rad = function (d) { return (d * Math.PI) / 180; };
        var dLat = rad(lat2 - lat1);
        var dLng = rad(lng2 - lng1);
        var a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function cargarMuseo() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function guardarMuseo(lista) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    }

    var form = document.getElementById("form-captura");
    if (form) {
        form.addEventListener("submit", function (evento) {
            evento.preventDefault();
            var nombre = document.getElementById("monstruo-nombre").value.trim();
            var edad = document.getElementById("monstruo-edad").value.trim();
            var color = document.getElementById("monstruo-color").value;
            var estado = document.getElementById("estado-captura");

            if (!nombre || !edad) {
                estado.textContent = "Escribe el nombre y la edad del monstruo.";
                return;
            }
            if (!("geolocation" in navigator)) {
                estado.textContent = "Tu navegador no admite geolocalización.";
                return;
            }

            estado.textContent = "Buscando tu ubicación…";

            navigator.geolocation.getCurrentPosition(
                function (pos) {
                    var d = distanciaMetros(pos.coords.latitude, pos.coords.longitude, INSTITUTO.lat, INSTITUTO.lng);
                    if (d <= RADIO_METROS) {
                        var lista = cargarMuseo();
                        lista.push({ name: nombre, age: edad, color: color, date: new Date().toISOString() });
                        guardarMuseo(lista);
                        estado.textContent = "¡Atrapado! " + nombre + " ya está en tu museo.";
                        form.reset();
                    } else {
                        estado.textContent = nombre + " ha escapado: estás a " + Math.round(d) + " m del instituto.";
                    }
                },
                function () {
                    estado.textContent = "No hemos podido obtener tu ubicación.";
                }
            );
        });
    }

    var grid = document.getElementById("museo-grid");
    if (grid) {
        var lista = cargarMuseo();
        var vacio = document.getElementById("museo-vacio");

        if (lista.length === 0) {
            vacio.style.display = "block";
        } else {
            vacio.style.display = "none";
            lista.forEach(function (m) {
                var li = document.createElement("li");
                var fecha = new Date(m.date).toLocaleDateString("es-ES");
                li.innerHTML =
                    '<div class="imagen-monstruo" style="background-color:' + m.color + '" role="img" aria-label="Monstruo de color ' + m.color + '"></div>' +
                    "<h3>" + m.name + "</h3>" +
                    "<p>Edad: " + m.age + " años</p>" +
                    "<p>Capturado: " + fecha + "</p>";
                grid.appendChild(li);
            });
        }
    }
})();
