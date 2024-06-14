let numero = 0;
let arrayImagenes = ['imagen1', 'imagen2', 'imagen3', 'imagen4', 'imagen5']; // ID de las imágenes
let intervaloCambio;

function handlerEvents() {
    let atras = document.getElementById('atras');
    let delante = document.getElementById('delante');
    delante.addEventListener('click', imagenDelante);
    atras.addEventListener('click', imagenAtras);
    
    // Ocultar todas las imágenes excepto la primera al cargar la página
    ocultarTodasLasImagenesExcepto(0);
    
    // Iniciar el carrusel después de un breve retraso (1 segundo)
    setTimeout(function() {
        intervaloCambio = setInterval(imagenSiguiente, 8000); // Cambiar imagen cada 8 segundos
    }, 1000);

    // Agregar eventos táctiles para dispositivos móviles
    let carrusel = document.querySelector('.carrusel');
    let touchstartX = 0;
    let touchendX = 0;

    carrusel.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    });

    carrusel.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchendX < touchstartX) {
            imagenSiguiente(); // Deslizar hacia la izquierda
        }
        if (touchendX > touchstartX) {
            imagenAtras(); // Deslizar hacia la derecha
        }
    }
}

function ocultarTodasLasImagenesExcepto(indice) {
    let imagenes = document.querySelectorAll('.diapositiva img');
    imagenes.forEach((img, index) => {
        if (index === indice) {
            img.style.display = "block"; // Mostrar la imagen seleccionada
        } else {
            img.style.display = "none"; // Ocultar las demás imágenes
        }
    });
}

function imagenDelante() {
    numero++;
    if (numero == arrayImagenes.length) {
        numero = 0;
    }
    mostrarImagen(numero);
}

function imagenAtras() {
    numero--;
    if (numero < 0) {
        numero = arrayImagenes.length - 1;
    }
    mostrarImagen(numero);
}

function imagenSiguiente() {
    numero++;
    if (numero == arrayImagenes.length) {
        numero = 0;
    }
    mostrarImagen(numero);
}

function mostrarImagen(numero) {
    ocultarTodasLasImagenesExcepto(numero);
}




window.onload = handlerEvents;
