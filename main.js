// Scroll animado
document.getElementsByClassName('boton-ir-abajo')[0].addEventListener('click', function() {
    window.scroll({ 
        top: 960,
        left: 0,
        behavior: 'smooth'
    });
});

// Mostrar navegacion movil
const nav_movil = document.getElementsByClassName('nav-movil')[0];
let links = document.getElementsByTagName('a');
let active = true;

links = Array.from(links).map((link) => {
  link.addEventListener('click', () => {
    active = false;
    setTimeout(() => {
      active = true;
    }, 100);
  })
});
let scrollPos = 0;
let navPos = 0;
window.addEventListener('scroll', function() {
  if (!active) {
    return;
  }
  if ((document.body.getBoundingClientRect()).top > scrollPos) { 
    // ARRIBA
    navPos -= 10;
  } else {
    // ABAJO
    navPos += 10;
  } 
  if (navPos < 0) {
      navPos = 0;
  }
  if (navPos > 70) {
    navPos = 70;
  }
  nav_movil.style.bottom = "-" + navPos + "px";
  scrollPos = (document.body.getBoundingClientRect()).top;
});

// Modo oscuro 
const switchMode = document.getElementById('switch-mode');
const root = document.documentElement;

function activarOscuro() {
  switchMode.checked = 1;
  root.style.setProperty('--color-azul-fuerte', '#272729');
  root.style.setProperty('--color-azul-claro', '#1646a0');
  root.style.setProperty('--color-azul-oscuro', '#101929');
  root.style.setProperty('--color-azul-claro2', '#0c2d74');
  root.style.setProperty('--color-azul-vivo', '#0046be');
  root.style.setProperty('--color-oscuro-transparente', '#25304291');
}

function deactivarOscuro() {
  switchMode.checked = 0;
  root.style.setProperty('--color-azul-fuerte', '#162540');
  root.style.setProperty('--color-azul-claro', '#5794FF');
  root.style.setProperty('--color-azul-oscuro', '#2B4A80');
  root.style.setProperty('--color-azul-claro2', '#4170C2');
  root.style.setProperty('--color-azul-vivo', '#4E86E6');
  root.style.setProperty('--color-oscuro-transparente', '#91919191');
}

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  activarOscuro();
} else {
  deactivarOscuro();
}

switchMode.addEventListener('change', () => {
  if (switchMode.checked) {
    activarOscuro();
  } else {
    deactivarOscuro();
  }
});

window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
  const darkModeOn = e.matches;
  if (darkModeOn) {
    activarOscuro();
  } else {
    deactivarOscuro();
  }
});