let num1
let num2
let resultado

function calcular() {
    num1 = parseFloat(document.getElementById('num1').value);
    num2 = parseFloat(document.getElementById('num2').value);

    if (document.querySelector('#opciones').value === "+") {
        comprobarNaN(num1, num2)
        resultado = num1 + num2
    }
    if (document.querySelector('#opciones').value === "-") {
        comprobarNaN(num1, num2)
        resultado = num1 - num2
    }
    if (document.querySelector('#opciones').value === "x") {
        comprobarNaN(num1, num2)
        resultado = num1 * num2
    }
    if (document.querySelector('#opciones').value === "/") {
        comprobarNaN(num1, num2)
        if (num2 === 0) {
            alert("¡ERROR! No puedes dividir entre 0.")
            resultado = ""
        } else {
            resultado = num1 / num2
        }
    }
    document.getElementById("resultado").value = resultado
}

function comprobarNaN(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        alert("Hay un/os campo/s en blanco.");
        resultado = ""
    }
}