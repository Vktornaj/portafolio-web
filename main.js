// Scroll animado
document.getElementsByClassName('boton-ir-abajo')[0].addEventListener('click', function () {
    window.scroll({ 
        top: 960,
        left: 0,
        behavior: 'smooth'
    });
});