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
  root.style.setProperty('--color-fondo-textos', '#1D1E20');
  root.style.setProperty('--color-texto-primario', '#FFF');
}

function deactivarOscuro() {
  switchMode.checked = 0;
  root.style.setProperty('--color-azul-fuerte', '#162540');
  root.style.setProperty('--color-azul-claro', '#5794FF');
  root.style.setProperty('--color-azul-oscuro', '#2B4A80');
  root.style.setProperty('--color-azul-claro2', '#4170C2');
  root.style.setProperty('--color-azul-vivo', '#4E86E6');
  root.style.setProperty('--color-oscuro-transparente', '#91919191');
  root.style.setProperty('--color-fondo-textos', '#FFF');
  root.style.setProperty('--color-texto-primario', '#000');
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

// Portafolio con carrusel
const carruselContainer = document.getElementsByClassName('carrusel')[0];
const carrusel = document.getElementById('carruselId');
const elemento = document.getElementsByClassName('elemento-carrusel')[0];
const btnAtras = document.getElementsByClassName('carrusel-btn-atras')[0];
const btnAdelante = document.getElementsByClassName('carrusel-btn-adelante')[0];
let carruselPos = 0;
const tElemento = 270;
const nElementos = 5;
const marginR = 40;

function scroll_x(npos) {
  console.log(carruselPos);
  carrusel.scroll({ 
    top: 0,
    left: npos,
    behavior: 'smooth'
  });
}

btnAtras.addEventListener('click', function() {
  if (carruselPos <= 0)
  return;
  carruselPos -= tElemento;
  scroll_x(carruselPos);
});

btnAdelante.addEventListener('click', function() {
  if (carruselPos >= tElemento * nElementos - marginR - carruselContainer.clientWidth)
  return;
  carruselPos += tElemento;
  scroll_x(carruselPos);
});

/* Envio de mensaje */
let inf = {};

async function postData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
  } catch (err ) {
    throw err;
  }
}

document.getElementsByTagName('form')[0].addEventListener("click", function (event) {
  event.preventDefault();  
});

document.getElementById('send').addEventListener('click', async function(e) {
  
  e.target.disabled = true;

  inf['name'] = document.getElementById('name').value;
  inf['email'] = document.getElementById('mail').value;
  inf['message'] = document.getElementById('msg').value;
  inf['infoBrowser'] = getBrowserInfo();

  postData('/api/message', inf)
  .then(data => {
    console.log(data);
    if (data.ok == true) {
      e.target.disabled = true;
      e.target.style.setProperty('background-color', 'green');
      document.getElementById('msg-envio').innerText = 'Enviado';
      document.getElementById('icon-successful').style.setProperty('display', 'block');
    } else if (data.ok == false) {
      e.target.style.setProperty('background-color', 'red');
      document.getElementById('msg-envio').innerText = 'Error al enviar mensaje';
      document.getElementById('icon-unsuccessful').style.setProperty('display', 'block');
    }
  });
});

const getBrowserInfo = function() {
  let ua= navigator.userAgent, tem, 
  M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
  }
  if(M[1]=== 'Chrome'){
      tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
  return M.join(' ');
};
