const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", () => {
    mensaje.textContent = "¡Gracias por hacer clic! 🎉";
});

const formulario = document.getElementById("formulario");
const respuesta = document.getElementById("respuesta");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;

    respuesta.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido recibido. ✅`;

    formulario.reset();
});
