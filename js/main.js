// Función para mostrar y actualizar la fecha y hora en el encabezado
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

// Ejecutar la función inmediatamente al cargar el documento
actualizarFecha();

// Actualizar cada segundo (1000 ms)
setInterval(actualizarFecha, 1000);