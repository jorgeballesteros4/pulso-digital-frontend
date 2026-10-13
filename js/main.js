// ========================================================
// 1. FECHA Y HORA EN TIEMPO REAL
// ========================================================
function actualizarFecha() {
  const contenedorFecha = document.getElementById("fecha-actual");
  if (!contenedorFecha) return;

  const ahora = new Date();
  
  // Opciones para formatear la fecha en español
  const opciones = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  // Asignar el texto formateado al contenedor HTML
  contenedorFecha.textContent = ahora.toLocaleDateString("es-CO", opciones);
}

// ========================================================
// 2. GESTIÓN DE FAVORITOS (localStorage)
// ========================================================
const STORAGE_FAVORITOS = "pulso_digital_favoritos";

function obtenerFavoritos() {
  const favoritos = localStorage.getItem(STORAGE_FAVORITOS);
  return favoritos ? JSON.parse(favoritos) : [];
}

function toggleFavorito(idNoticia) {
  let favoritos = obtenerFavoritos();

  if (favoritos.includes(idNoticia)) {
    favoritos = favoritos.filter(id => id !== idNoticia);
    alert("Noticia eliminada de tus favoritos.");
  } else {
    favoritos.push(idNoticia);
    alert("¡Noticia guardada en favoritos!");
  }

  localStorage.setItem(STORAGE_FAVORITOS, JSON.stringify(favoritos));
  actualizarEstadoBotonesFavoritos();
}

function actualizarEstadoBotonesFavoritos() {
  const favoritos = obtenerFavoritos();
  const botones = document.querySelectorAll(".btn-favorito");

  botones.forEach(boton => {
    const onclickAttr = boton.getAttribute("onclick");
    if (!onclickAttr) return;

    const match = onclickAttr.match(/'([^']+)'/);
    if (match && match[1]) {
      const idNoticia = match[1];
      if (favoritos.includes(idNoticia)) {
        boton.textContent = "★ En Favoritos";
        boton.style.background = "#ffc107";
        boton.style.color = "#000";
      } else {
        boton.textContent = "☆ Favoritos";
        boton.style.background = "";
        boton.style.color = "";
      }
    }
  });
}

// ========================================================
// 3. VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ========================================================
function inicializarFormularioContacto() {
  const form = document.getElementById("formContacto");
  if (!form) return; // Si no existe el formulario en la vista actual, termina

  const nombreInput = document.getElementById("nombre");
  const correoInput = document.getElementById("correo");
  const mensajeInput = document.getElementById("mensaje");

  const errorNombre = document.getElementById("errorNombre");
  const errorCorreo = document.getElementById("errorCorreo");
  const errorMensaje = document.getElementById("errorMensaje");
  const mensajeExito = document.getElementById("mensajeExito");

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let esValido = true;

    if (errorNombre) errorNombre.textContent = "";
    if (errorCorreo) errorCorreo.textContent = "";
    if (errorMensaje) errorMensaje.textContent = "";
    if (mensajeExito) mensajeExito.style.display = "none";

    // 1. Validar Nombre
    if (!nombreInput.value.trim()) {
      if (errorNombre) errorNombre.textContent = "El nombre completo es obligatorio.";
      esValido = false;
    }

    // 2. Validar Correo
    if (!correoInput.value.trim()) {
      if (errorCorreo) errorCorreo.textContent = "El correo electrónico es obligatorio.";
      esValido = false;
    } else if (!regexCorreo.test(correoInput.value.trim())) {
      if (errorCorreo) errorCorreo.textContent = "Ingresa un correo electrónico válido (ejemplo@correo.com).";
      esValido = false;
    }

    // 3. Validar Mensaje
    if (!mensajeInput.value.trim()) {
      if (errorMensaje) errorMensaje.textContent = "El mensaje no puede estar vacío.";
      esValido = false;
    }

    // Si todo es válido
    if (esValido) {
      if (mensajeExito) {
        mensajeExito.innerHTML = `
          ✅ ¡Gracias por comunicarte con Pulso Digital! Tu mensaje ha sido enviado correctamente.<br>
          <small style="display:block; margin-top: 8px; color: #a3d9a5;">
            Redirigiendo a la página principal en 3 segundos... 
            <a href="index.html" style="color: #ffffff; text-decoration: underline; font-weight: bold;">Volver ya</a>
          </small>
        `;
        mensajeExito.style.display = "block";
      }

      form.reset();

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }
  });
}

// ========================================================
// INICIALIZACIÓN GENERAL AL CARGAR EL DOM
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Iniciar y mantener el reloj actualizado cada segundo
  actualizarFecha();
  setInterval(actualizarFecha, 1000);

  // Iniciar validaciones de formulario
  inicializarFormularioContacto();

  // Actualizar botones de favoritos
  actualizarEstadoBotonesFavoritos();
});