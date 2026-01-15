







// Botones
const btnIniciar = document.getElementById('btn-iniciar'); 
const btnRegistrar = document.getElementById('btn-registrar'); 
const btnOlvidaste = document.getElementById('btn-olvidaste'); 
let archivosExamenBase64 = [];

let fotoBase64 = "";





function mostrarFoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    fotoBase64 = e.target.result; // ✅ GUARDADA PARA BD
    document.getElementById("previewFoto").src = fotoBase64;
  };
  reader.readAsDataURL(file);
}

const correoActivo = sessionStorage.getItem("usuarioActivoCorreo");


function obtenerPacienteActivo() {
  return window.pacienteActivo || null;
}



function mostrarMensajeRecordatorio(texto) { 
const mensaje = document.getElementById("mensajeRecordatorio"); 
const textoMsg = document.getElementById("textoMensaje"); 


textoMsg.textContent = texto; 
mensaje.style.display = "block"; 


setTimeout(() => { mensaje.style.display = "none"; 
}, 3500); 
} 

function confirmarRecordatorio() { 
mostrarMensajeRecordatorio("Recordatorio confirmado, se enviará al propietario por WhatsApp"); 
} 

function cancelarRecordatorio() { 
mostrarMensajeRecordatorio("Recordatorio cancelado"); 
} 

function agregarRecordatorio() { 
mostrarMensajeRecordatorio("Recordatorio guardado con éxito"); 
} 



document.addEventListener("DOMContentLoaded", () => { 
const btnGuardar = document.getElementById("btnGuardar"); 
if (btnGuardar) { 
btnGuardar.addEventListener("click", () => { 
mostrarBurbuja("Recordatorio guardado con éxito 💗"); 
}); 
} 

// Aquí puedes agregar más listeners 
}); 


// 🌸 FUNCIONALIDAD: Pantalla de Tratamiento 
document.addEventListener('DOMContentLoaded', () => { 
const btnVerTratamiento = document.getElementById('btn-ver-tratamiento'); // el botón del menú principal 
const btnGuardar = document.getElementById('btn-guardar-tratamiento'); 
const btnCancelar = document.getElementById('btn-cancelar-tratamiento'); 
const btnVolver = document.getElementById('btn-volver-tratamiento'); 
const burbuja = document.getElementById('burbuja-tratamiento'); 



// Guardar tratamiento → mostrar burbuja 
if (btnGuardar) { 
btnGuardar.addEventListener('click', () => { 
burbuja.style.display = 'block'; 
setTimeout(() => {
burbuja.style.display = 'none'; 
}, 3000); 
}); 
} 

// Cancelar → limpiar los campos 
if (btnCancelar) { 
btnCancelar.addEventListener('click', () => { 
document.querySelectorAll('#pantalla-tratamiento input, #pantalla-tratamiento textarea').forEach(campo => { campo.value = ''; 
}); 
}); 
} 

// Volver → regresar al menú principal 
if (btnVolver) { 
btnVolver.addEventListener('click', (e) => { 
e.preventDefault(); 
mostrarPantalla('pantalla-menu'); 
}); 
} 
}); 





// ✅ Función limpiar campos 
function limpiarCamposTratamiento() { 
document.getElementById("descripcionTratamiento").value = ""; 
document.getElementById("medicamento").value = ""; 
document.getElementById("dosis").value = ""; 
document.getElementById("duracion").value = ""; 
} 

// ✅ Mostrar burbuja al guardar 
document.addEventListener("DOMContentLoaded", () => { 
const btnGuardarTratamiento = 
document.getElementById("btnGuardarTratamiento"); 
const burbuja = document.getElementById("burbujaTratamiento"); 

if (btnGuardarTratamiento && burbuja) { 
btnGuardarTratamiento.addEventListener("click", () => { 
burbuja.style.display = "block"; 
setTimeout(() => burbuja.style.display = "none", 3000); 
}); 
} 
}); 

function mostrarBurbuja(mensaje) { 
const burbuja = document.createElement('div'); 
burbuja.textContent = mensaje; 
burbuja.style.position = 'fixed'; 
burbuja.style.top = '20px'; 
burbuja.style.right = '20px'; 
burbuja.style.background = '#ff66c4'; 
burbuja.style.color = 'white'; 
burbuja.style.padding = '10px 20px'; 
burbuja.style.borderRadius = '10px'; 
burbuja.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)'; 
burbuja.style.zIndex = '1000'; 
document.body.appendChild(burbuja); 

setTimeout(() => { 
burbuja.remove(); 
}, 2500); 
} 

function redirigirReporte(select) { 
const pantalla = select.value; 
if (pantalla) mostrarPantalla(pantalla); 
} 






// app.js — Conexión frontend ⇄ backend (registro y login) 
const API_BASE = "https://petstherapy-backend.onrender.com/api/usuarios"; 

// Cambia si tu backend corre en otra URL/puerto 


const API_PACIENTES = "https://petstherapy-backend.onrender.com/api/pacientes";



/********** Registro **********/ 
const formRegistro = document.getElementById("formRegistro"); 
if (formRegistro) { 
formRegistro.addEventListener("submit", async (e) => { e.preventDefault(); 
  
const nombre = document.getElementById("nombre").value.trim(); 
const cedula = document.getElementById("cedula").value.trim(); 
const correo = document.getElementById("correo").value.trim(); 
const telefono = document.getElementById("telefono").value.trim(); 
const contrasena = document.getElementById("contrasena").value; 
const confirmar = document.getElementById("confirmar").value; 

// Validaciones cliente 
if (!nombre || !cedula || !correo || !contrasena || !confirmar) { 
return mostrarBurbuja("Por favor completa todos los campos obligatorios.", "error"); 
} 
if (contrasena !== confirmar) { 
return mostrarBurbuja("Las contraseñas no coinciden.", "error"); 
} 
if (contrasena.length < 8) { 
return mostrarBurbuja("La contraseña debe tener al menos 8 caracteres.", "error");
} 

/// Preparar payload 
const payload = { nombre, cedula, correo, telefono, contrasena };

try {
const res = await fetch(`${API_BASE}/registro`, {
      method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

const data = await res.json(); 

if (!res.ok) { 
// muestra mensaje de error desde backend si existe 
return mostrarBurbuja(data.message || "ingresa datos validos 💔", 
"error"); 
} 

mostrarBurbuja(data.message || "Registro exitoso", "exito"); 

// Limpiar formulario y redirigir a login/menú 
formRegistro.reset(); 
// ejemplo: mostrarPantalla('pantalla-login') — usa tu función de navegación 
if (typeof mostrarPantalla === "function") 
mostrarPantalla("pantalla-login"); 
} 
catch (err) { 
console.error("Error fetch registro:", err); 
mostrarBurbuja("Error de red. Intenta de nuevo.", "error"); 
} 
}); 
} 




/********** Login **********/ 
const formLogin = document.getElementById("formLogin"); 

if (formLogin) { formLogin.addEventListener("submit", async (e) => { 
e.preventDefault(); 
const correo = document.getElementById("loginCorreo").value.trim(); 
const contrasena = document.getElementById("loginContrasena").value; 
if (!correo || !contrasena) { 
return mostrarBurbuja("Por favor ingresa correo y contraseña", "error"); 
}

try {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });


const data = await res.json(); 

if (!res.ok) { 
return mostrarBurbuja( 
data.message || "Correo o contraseña incorrectos 💔", 
"error" ); 
} 

// 💖 Inicio de sesión exitoso 
mostrarBurbuja(data.message || "Inicio de sesión exitoso 💖", "exito"); 

// después de login exitoso
sessionStorage.setItem("token", data.token);
sessionStorage.setItem("usuarioActivoCorreo", correo); // correo del login
console.log("🔐 Sesión iniciada como:", correo);



// Redirigir al menú principal 
if (typeof mostrarPantalla === "function") { 
mostrarPantalla("menú-principal"); 
} 

} catch (err) { 
console.error("Error fetch login:", err); 
mostrarBurbuja("Error de red. Intenta de nuevo.", "error"); 
} 
}); 
} 






// 🌸 Bandera global para evitar volver al inicio cuando se ve un examen
window._viendoExamen = false;

const backend_url = `https://petstherapy-backend.onrender.com`


// ✅ MANTENER SESIÓN CON BACKEND — NO ROMPE OTRAS PANTALLAS

window.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");

if (window._noRedirigirPorExamen === true) return;

// Si estamos viendo un examen, no mover pantalla
const pantallaActiva = document.querySelector(".pantalla.activa");
if (pantallaActiva && pantallaActiva.id === "pantallaVerExamen") {
  console.log("🔒 Ya estamos en pantallaVerExamen. No redirigir.");
  return;
}

// Redirección normal
if (token) {
  mostrarPantalla("menú-principal");
} else {
  mostrarPantalla("pantalla-inicio");
}

});

// 🌸 Restaurar navegación normal cuando se salga de ver examen
function salirDeExamen() {
  window._viendoExamen = false;
  mostrarPantalla("pantallaExamenes");
}



// 🌸 CERRAR SESIÓN (versión final)
function cerrarSesion() {
  // Elimina todos los datos de sesión guardados
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("usuarioActivoCorreo");

  // Mostrar burbuja
  mostrarBurbuja("Sesión cerrada correctamente 💖", "info");

  // Redirigir a pantalla de inicio
  mostrarPantalla("pantalla-inicio");
}





/********** Restablecer contraseña **********/ 
const formReset = document.getElementById("formReset"); 
if (formReset) { formReset.addEventListener("submit", async (e) => { 
e.preventDefault(); 

const nuevaContrasena = document.getElementById("nuevaContrasena").value.trim(); 
const confirmarContrasena = document.getElementById("confirmarContrasena").value.trim();


// Validar contraseñas 
if (!nuevaContrasena || !confirmarContrasena) { 
return mostrarBurbuja("Por favor completa todos los campos 💬", "error"); 
} 

if (nuevaContrasena !== confirmarContrasena) { 
return mostrarBurbuja("Las contraseñas no coinciden 💔", "error"); 
} 

// Obtener token guardado 
const token = sessionStorage.getItem("resetToken");
if (!token) { 
return mostrarBurbuja("Token no encontrado o inválido ❌", "error"); 
} 

try {
  const res = await fetch(`https://petstherapy-backend.onrender.com/api/password/reset/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nuevaContrasena }),
  });


const data = await res.json(); 

if (!res.ok) { 
  return mostrarBurbuja(data.message || "Error al actualizar la contraseña ⚠️", "error"); 
} 

// Éxito 💖 
mostrarBurbuja("Contraseña actualizada con éxito 💖"); 
formReset.reset(); sessionStorage.removeItem("resetToken");
 

// limpiar token usado 
mostrarPantalla("pantalla-login"); 
} catch (err) { 
console.error("Error al restablecer contraseña:", err); 
mostrarBurbuja("Error de red. Intenta de nuevo.", "error"); 
} 
}); 
} 

// 🌸 Detectar token en la URL y mostrar pantalla de restablecer contraseña 
window.addEventListener("DOMContentLoaded", () => { 
const params = new URLSearchParams(window.location.search); 
const token = params.get("token"); 

if (token) { console.log("🔐 Token detectado en URL:", token); 
sessionStorage.setItem("resetToken", token);
mostrarPantalla("pantalla-reset"); 
} 
}); 



console.log("[DEBUG] Buscando formulario de recuperación...");



const formRecuperar = document.getElementById("formRecuperar"); 
if (formRecuperar) { 
console.log("[DEBUG] Formulario de recuperación encontrado ✅"); 

formRecuperar.addEventListener("submit", async (e) => { 
e.preventDefault(); console.log("[DEBUG] Evento submit activado 🚀"); 
const correo = document.getElementById("correoRecuperar").value.trim(); 
console.log("🩷 Botón de restablecer contraseña presionado"); 
if (!correo) { mostrarBurbuja("Por favor ingresa tu correo.", "error"); 
return; 
} 

try { 
const res = await fetch("https://petstherapy-backend.onrender.com/api/password/forgot", { 
method: "POST", 
headers: { "Content-Type": "application/json" }, 
body: JSON.stringify({ correo }), }); 

console.log("[DEBUG] Respuesta del servidor:", res.status); 
const data = await res.json(); 

if (!res.ok) { 
mostrarBurbuja(data.message || "Error al enviar el correo.", "error"); 
return; 
} 

mostrarBurbuja("📩 Revisa tu bandeja de entrada para recuperar tu contraseña.", "exito"); 
formRecuperar.reset(); 
} catch (error) { 
console.error("Error al enviar correo:", error); 
mostrarBurbuja("❌ No se pudo enviar el correo. Intenta nuevamente.", "error"); 
} 
}); 
} else { 
console.warn("[DEBUG] No se encontró el formulario de recuperación ⚠️"); 
} 



async function cargarPacientes() {
  const correoActivo = sessionStorage.getItem("usuarioActivoCorreo");
  if (!correoActivo) return;

  try {
    const res = await fetch(
      `https://petstherapy-backend.onrender.com/api/pacientes/${encodeURIComponent(correoActivo)}`
    );
    if (!res.ok) throw new Error(res.status);

    const pacientes = await res.json();

    const contenedor = document.getElementById("listaPacientes");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (pacientes.length === 0) {
      contenedor.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay pacientes registrados</p>";
      return;
    }

    pacientes.forEach(p => {
      const btn = document.createElement("button");
      btn.className = "btn-paciente";
      btn.textContent = p.nombre;
      btn.onclick = () => abrirPerfilPaciente(p);
      contenedor.appendChild(btn);
    });

  } catch (err) {
    console.error(err);
    mostrarBurbuja("❌ Error al cargar pacientes", "error");
  }
}



async function seleccionarPaciente(pacienteId) {
  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/id/${pacienteId}`);
    if (!res.ok) throw new Error("Paciente no encontrado");

    const paciente = await res.json();

    // Guardar únicamente en memoria
    window.pacienteActivo = paciente;

    mostrarBurbuja(`Paciente ${paciente.nombre} seleccionado ✅`, "exito");
  } catch (err) {
    console.error(err);
    mostrarBurbuja("❌ No se pudo seleccionar el paciente", "error");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Inicializar paciente activo en memoria
  window.pacienteActivo = null;
});




function mostrarListaPacientes(lista) {
  const cont = document.getElementById("listaPacientes");
  cont.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("paciente-card");
    div.innerHTML = `
      <span>${p.nombre} (${p.especie})</span>
      <button onclick="seleccionarPaciente('${p._id}')">Seleccionar</button>
      <button onclick="irAVacunas()">Vacunas</button>
      <button onclick="irADesparasitaciones()">Desparasitaciones</button>
      <button onclick="irAAntipulgas()">Antipulgas</button>
    `;
    cont.appendChild(div);
  });
}



// Inicializar paciente activo en memoria
window.pacienteActivo = null;


// --- Añadir nuevo paciente ---
async function crearNuevoPaciente() {
  const nombre = document.getElementById("npNombre").value.trim();
  const especie = document.getElementById("npEspecie").value.trim();
  const raza = document.getElementById("npRaza").value.trim();
  const edad = document.getElementById("npEdad").value.trim();

  const propietarioCorreo = sessionStorage.getItem("usuarioActivoCorreo");

  if (!nombre || !propietarioCorreo) {
    mostrarBurbuja("Nombre y correo obligatorios", "error");
    return;
  }

  try {
    const res = await fetch("https://petstherapy-backend.onrender.com/api/pacientes/nuevo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        especie,
        raza,
        edad,
        propietarioCorreo,
        foto: ""
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    sessionStorage.setItem(
      "pacienteSeleccionado",
      JSON.stringify(data.paciente)
    );

    mostrarBurbuja("Paciente creado 💖", "exito");
    abrirPerfilPaciente(data.paciente);

  } catch (error) {
    console.error(error);
    mostrarBurbuja("Error al crear paciente", "error");
  }
}






// 🌸 Abrir perfil del paciente (con datos del propietario)
async function abrirPerfilPaciente(paciente) {
  if (!paciente || !paciente._id) {
    mostrarBurbuja("Paciente inválido", "error");
    return;
  }

  try {
    const res = await fetch(
      `https://petstherapy-backend.onrender.com/api/pacientes/id/${paciente._id}`
    );
    if (!res.ok) throw new Error("Error al obtener paciente");

    const pacienteCompleto = await res.json();

    // 🔥 ESTADO GLOBAL (CLAVE PARA PROPIETARIO)
    window.pacienteActivo = pacienteCompleto;

    // 🔒 Respaldo en sessionStorage
    sessionStorage.setItem(
      "pacienteSeleccionado",
      JSON.stringify(pacienteCompleto)
    );

    // ----------------------------
    // 🧾 Cargar datos del paciente
    // ----------------------------
    document.getElementById("nombrePerfil").value =
      pacienteCompleto.nombre || "";
    document.getElementById("especiePerfil").value =
      pacienteCompleto.especie || "";
    document.getElementById("razaPerfil").value =
      pacienteCompleto.raza || "";
    document.getElementById("pesoPerfil").value =
      pacienteCompleto.peso || "";
    document.getElementById("fechaAplicacionPF").value =
      pacienteCompleto.fechaNacimiento || "";

    // ✅ Guardar ID para eliminar / actualizar
    document.getElementById("nombrePerfil").dataset.pacienteId =
      pacienteCompleto._id;

    // ----------------------------
    // 🖼️ Cargar foto
    // ----------------------------
    const preview = document.getElementById("previewFoto");

    if (
      pacienteCompleto.foto &&
      typeof pacienteCompleto.foto === "string" &&
      pacienteCompleto.foto.startsWith("data:image")
    ) {
      fotoBase64 = pacienteCompleto.foto;
      fotoEliminada = false;
      preview.src = fotoBase64;
    } else {
      fotoBase64 = "";
      fotoEliminada = false;
      preview.src = "img/default.png";
    }

    // ----------------------------
    // 📺 Mostrar pantalla
    // ----------------------------
    mostrarPantalla("perfilPaciente");

  } catch (error) {
    console.error(error);
    mostrarBurbuja("❌ Error al abrir paciente", "error");
  }
}




document.getElementById("btnQuitarFoto").addEventListener("click", async () => {
  const paciente = JSON.parse(sessionStorage.getItem("pacienteSeleccionado"));
  if (!paciente?._id) {
    mostrarBurbuja("Paciente no válido", "error");
    return;
  }

  try {
    const res = await fetch(
      `https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/foto`,
      { method: "PUT" }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // UI inmediata
    document.getElementById("previewFoto").src = "img/default.png";

    // limpiar estados
    fotoBase64 = "";
    document.getElementById("inputFoto").value = "";

    // actualizar paciente en memoria
    sessionStorage.setItem(
      "pacienteSeleccionado",
      JSON.stringify(data.paciente)
    );

    mostrarBurbuja("Foto eliminada 🐾", "exito");
  } catch (err) {
    console.error(err);
    mostrarBurbuja("Error al eliminar foto", "error");
  }
});





// 🌸 Eliminar paciente desde perfil 
document.addEventListener("DOMContentLoaded", () => {
  const btnEliminar = document.getElementById("btnEliminarPaciente");

  if (btnEliminar) {
    btnEliminar.addEventListener("click", async () => {
      const nombreInput = document.getElementById("nombrePerfil");
      const idPaciente = nombreInput?.dataset.pacienteId;
      const nombrePaciente = nombreInput?.value || "Paciente";

      if (!idPaciente) {
        mostrarBurbuja("No se pudo identificar el paciente 💔", "error");
        return;
      }

      if (!confirm(`¿Seguro que deseas eliminar a ${nombrePaciente}?`)) return;

      try {
        const res = await fetch(
          `https://petstherapy-backend.onrender.com/api/pacientes/${idPaciente}`,
          { method: "DELETE" }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        mostrarBurbuja(`Paciente eliminado 💔`, "exito");
        mostrarPantalla("pantallaPacientes");
        cargarPacientes();

      } catch (error) {
        console.error(error);
        mostrarBurbuja("Error al eliminar 🕸️", "error");
      }
    });
  }
});



async function guardarPerfilPaciente() {
  const paciente = JSON.parse(sessionStorage.getItem("pacienteSeleccionado"));
  const correoActivo = sessionStorage.getItem("usuarioActivoCorreo");

  if (!paciente || !paciente._id || !correoActivo) {
    mostrarBurbuja("No se pudo identificar el paciente 💔", "error");
    return;
  }

  const datosActualizados = {
    nombre: document.getElementById("nombrePerfil").value.trim(),
    especie: document.getElementById("especiePerfil").value.trim(),
    raza: document.getElementById("razaPerfil").value.trim(),
    peso: document.getElementById("pesoPerfil").value.trim(),
    fechaNacimiento: document.getElementById("fechaAplicacionPF").value,

    propietario: {
      nombre: document.getElementById("propNombre")?.value.trim() || "",
      direccion: document.getElementById("propDireccion")?.value.trim() || "",
      barrio: document.getElementById("propBarrio")?.value.trim() || "",
      localidad: document.getElementById("propLocalidad")?.value.trim() || "",
      telefono: document.getElementById("propTelefono")?.value.trim() || "",
      correo: document.getElementById("propCorreo")?.value.trim() || ""
    },

    propietarioCorreo: correoActivo
  };

  // ✅ SOLO subir foto si hay una nueva
  if (fotoBase64) {
    datosActualizados.foto = fotoBase64;
  }

  try {
    const res = await fetch(
      `https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados)
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // actualizar paciente en memoria
    sessionStorage.setItem(
      "pacienteSeleccionado",
      JSON.stringify(data.paciente)
    );

    mostrarBurbuja("Perfil actualizado 💖", "exito");

    // limpiar estado de foto
    fotoBase64 = "";

    // volver a lista
    mostrarPantalla("pantallaPacientes");
    cargarPacientes();

  } catch (error) {
    console.error(error);
    mostrarBurbuja("Error al guardar perfil 🕸️", "error");
  }
}








// 🌸 Conectar botón "Guardar"
const btnGuardarPerfil = document.getElementById("btnGuardarPerfil"); 
if (btnGuardarPerfil) { 
  btnGuardarPerfil.addEventListener("click", guardarPerfilPaciente); 
} 

// 🌸 Subir foto del paciente
document.getElementById("btnSubirFoto").addEventListener("click", () => { 
  document.getElementById("inputFoto").click(); 
}); 

document.getElementById("inputFoto").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const preview = document.getElementById("previewFoto");
  preview.src = URL.createObjectURL(file);

  const compressed = await comprimirImagen(file, 800, 0.7);

  const reader = new FileReader();
  reader.onload = (ev) => {
    fotoBase64 = ev.target.result; 
    fotoEliminada = false; 
    preview.src = fotoBase64;
  };
  reader.readAsDataURL(compressed);
});


/**
 * 🌸 Función para comprimir una imagen antes de subirla
 * @param {File} file - archivo original
 * @param {number} maxWidth - ancho máximo permitido
 * @param {number} quality - calidad (0.1 a 1)
 * @returns {Promise<File>} archivo comprimido
 */
function comprimirImagen(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleSize = maxWidth / img.width;
      canvas.width = Math.min(img.width, maxWidth);
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          resolve(new File([blob], file.name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        quality
      );
    };
  });
}


function subirFoto(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => preview.src = e.target.result;
    reader.readAsDataURL(file);
  };

  input.click();
}


async function mostrarPacientesCargo() {
  // Obtener el correo desde el input
  let propietarioCorreo = document.getElementById("propCorreo")?.value?.trim();

  console.log("🔎 mostrarPacientesCargo - correo usado:", propietarioCorreo);

  const contenedor = document.getElementById("listaPacientesCargo");
  if (!propietarioCorreo) {
    mostrarBurbuja("⚠️ Ingresa o selecciona un propietario para ver sus pacientes");
    return;
  }
  if (!contenedor) {
    console.error("❌ No se encontró el contenedor con id: listaPacientesCargo");
    return;
  }

  contenedor.innerHTML = "<p style='text-align:center;color:##ff4da6;'>Cargando pacientes...</p>";

  try {
    // fetch al backend con encodeURIComponent
    const url = `https://petstherapy-backend.onrender.com/api/pacientes/${encodeURIComponent(propietarioCorreo)}`;
    console.log("🔗 Fetch a:", url);
    const res = await fetch(url);

    if (!res.ok) {
      const texto = await res.text();
      console.error("Respuesta no OK:", res.status, texto);
      throw new Error("Error al cargar pacientes");
    }

    const pacientes = await res.json();
    console.log("📥 Pacientes recibidos:", pacientes);
    contenedor.innerHTML = "";

    if (!Array.isArray(pacientes) || pacientes.length === 0) {
      contenedor.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay pacientes registrados para este propietario 🐾</p>";
      return;
    }

    pacientes.forEach(p => {
      const card = document.createElement("div");
      card.className = "paciente-card";
      card.innerHTML = `
        <h3>${p.nombre}</h3>
        <p><strong>Especie:</strong> ${p.especie || "No especificada"}</p>
        <p><strong>Raza:</strong> ${p.raza || "No especificada"}</p>
      `;

      card.addEventListener("click", () => {
        console.log("🩷 Paciente seleccionado:", p);
        // 🔹 Abrir perfil directamente
        abrirPerfilPaciente(p);
      });

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar pacientes a cargo:", error);
    contenedor.innerHTML = "<p style='text-align:center;color:##ff4da6;'>❌ Error al cargar los pacientes</p>";
  }
}



// -----------------------------------------------------------------------------
// 🌸 VARIABLES DEL PROPIETARIO
// -----------------------------------------------------------------------------
const nombreInput = document.getElementById("propNombre");
const direccionInput = document.getElementById("propDireccion");
const barrioInput = document.getElementById("propBarrio");
const localidadInput = document.getElementById("propLocalidad");
const telefonoInput = document.getElementById("propTelefono");
const correoInput = document.getElementById("propCorreo");

const btnGuardarPropietario = document.getElementById("btnGuardarPropietario");
const pantallaPropietario = document.getElementById("pantallaPropietario");


// -----------------------------------------------------------------------------
// 🌸 CARGAR PROPIETARIO AL ENTRAR A LA PANTALLA
//    (Misma lógica que historial: carga instantánea + refresco backend)
// -----------------------------------------------------------------------------
window.cargarPropietario = async (pacienteActivo = window.pacienteActivo) => {
  if (!pacienteActivo || !pacienteActivo._id) return;

  // 1️⃣ Mostrar de inmediato lo que haya guardado en memoria
  const p = pacienteActivo.propietario || {};
  nombreInput.value = p.nombre || "";
  direccionInput.value = p.direccion || "";
  barrioInput.value = p.barrio || "";
  localidadInput.value = p.localidad || "";
  telefonoInput.value = p.telefono || "";
  correoInput.value = p.correo || "";

  // 2️⃣ Actualizar desde el backend en segundo plano
  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/id/${pacienteActivo._id}`);

    if (!res.ok) throw new Error("Error al refrescar datos desde servidor");

    pacienteActivo = await res.json();
    // Guardar en memoria global
    window.pacienteActivo = pacienteActivo;

    const p2 = pacienteActivo.propietario || {};
    nombreInput.value = p2.nombre || "";
    direccionInput.value = p2.direccion || "";
    barrioInput.value = p2.barrio || "";
    localidadInput.value = p2.localidad || "";
    telefonoInput.value = p2.telefono || "";
    correoInput.value = p2.correo || "";
  } catch (err) {
    console.error("Error refrescando propietario:", err);
  }
};



// -----------------------------------------------------------------------------
// 🌸 OBSERVER PARA DETECTAR CUANDO SE ABRE LA PANTALLA PROPIETARIO
// -----------------------------------------------------------------------------
const observerProp = new MutationObserver(() => {
  if (pantallaPropietario.classList.contains("activa")) {
    cargarPropietario();
  }
});
observerProp.observe(pantallaPropietario, { attributes: true });


// -----------------------------------------------------------------------------
// 🌸 GUARDAR PROPIETARIO (Versión final igual a guardarHistorial)
// -----------------------------------------------------------------------------
async function guardarPropietario() {
  let pacienteActivo = window.pacienteActivo;
  if (!pacienteActivo || !pacienteActivo._id) {
    mostrarBurbuja("❌ No hay paciente seleccionado");
    return;
  }

  try {
    const propietario = {
      nombre: nombreInput.value.trim(),
      direccion: direccionInput.value.trim(),
      barrio: barrioInput.value.trim(),
      localidad: localidadInput.value.trim(),
      telefono: telefonoInput.value.trim(),
      correo: correoInput.value.trim(),
    };

    // --- Enviar al backend ---
    const res = await fetch(
      `https://petstherapy-backend.onrender.com/api/pacientes/${pacienteActivo._id}/propietario`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propietario),
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Error al guardar propietario");
    }

    // --- Actualizar paciente en memoria global ---
    pacienteActivo = await res.json();
    window.pacienteActivo = pacienteActivo;

    mostrarBurbuja("💖 Propietario guardado correctamente");
  } catch (err) {
    console.error("Error guardando propietario:", err);
    mostrarBurbuja(`❌ No se pudo guardar propietario: ${err.message}`);
  }
}



// -----------------------------------------------------------------------------
// 🌸 EVENTO DEL BOTÓN GUARDAR
// -----------------------------------------------------------------------------
if (btnGuardarPropietario) {
  btnGuardarPropietario.addEventListener("click", guardarPropietario);
}











// 🌸 --- NAVEGACIÓN SEGURA ENTRE PANTALLAS ---
window._viendoExamen = false; // bandera global







function descargarBase64(base64, nombreArchivo) {
  const partes = base64.split(",");
  const mime = partes[0].match(/:(.*?);/)[1];
  const binario = atob(partes[1]);

  let length = binario.length;
  const buffer = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    buffer[i] = binario.charCodeAt(i);
  }

  const blob = new Blob([buffer], { type: mime });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 100);
}



// 🛡️ PARCHE DEFINITIVO PARA EVITAR VOLVER AL INICIO CUANDO SE VE UN EXAMEN
const __originalMostrarPantalla = mostrarPantalla;
window.mostrarPantalla = function(idPantalla) {

  // Si estoy viendo un examen NO PERMITO ir a pantalla-inicio
  if (window._viendoExamen && idPantalla === "pantalla-inicio") {
    console.log("🛡️ Bloqueada redirección al inicio (modo ver examen activo)");
    return;
  }

  return __originalMostrarPantalla(idPantalla);
};


// 🌸 --- PROTECCIÓN EXTRA: impedir que al volver del modo inactivo se devuelva al inicio ---
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    const activa = document.querySelector(".pantalla.activa");
    if (activa && activa.id === "pantallaVerExamen") {
      console.log("🩺 Manteniendo pantallaVerExamen visible tras volver a la app");
      window._viendoExamen = true;
    }
  }
});

// 🌸 --- FUNCIÓN SALIR DE EXAMEN ---
function salirDeExamen() {
  window._viendoExamen = false;
  mostrarPantalla("pantallaExamenes");
}

// 🌸 ==== MANEJO DE EXÁMENES INDEPENDIENTE (no interfiere con sesión) ====








// 🌸 Volver a lista de exámenes
function volverAListaExamenes() {
  console.log("↩️ Volviendo a la lista de exámenes");
  window._viendoExamen = false;

  document.querySelectorAll(".pantalla").forEach(p => {
    p.style.display = "none";
    p.classList.remove("activa");
  });

  const pantalla = document.getElementById("pantallaExamenes");
  pantalla.style.display = "block";
  pantalla.classList.add("activa");
}




// 🌸 --- FIX DEFINITIVO: Mantener pantallaVerExamen sin reiniciar la sesión ---
document.addEventListener("DOMContentLoaded", () => {
  // Evitar que mostrarPantalla mande al inicio si estamos viendo examen
  const originalMostrarPantalla = window.mostrarPantalla;
  window.mostrarPantalla = function (idPantalla) {
    if (window._viendoExamen && idPantalla === "pantalla-inicio") {
      console.log("🩺 Ignorando redirección al inicio (ver examen activo)");
      return;
    }
    originalMostrarPantalla(idPantalla);
  };

  // Marcar cuando entras a ver examen
  document.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".btn-principal") && e.target.textContent.includes("Ver examen")) {
      console.log("🩷 Activando modo ver examen");
      window._viendoExamen = true;
    }
  });

  // Cuando presionas “Volver” dentro de la pantalla de examen
  const volverBtn = document.querySelector("#pantallaVerExamen .btn-volver-examen");
  if (volverBtn) {
    volverBtn.addEventListener("click", () => {
      console.log("↩️ Saliendo de ver examen");
      window._viendoExamen = false;
      mostrarPantalla("pantallaExamenes");
    });
  }
});



/* 🌸 ---- EXÁMENES ---- */

async function guardarExamen(archivosExistentes = null) {
  const pacienteActivo = window.pacienteActivo;
  if (!pacienteActivo) return mostrarBurbuja("No hay paciente seleccionado.");

  const nombreExamen = document.getElementById("nombreExamen").value.trim();
  const tipoExamen = document.getElementById("tipoExamen").value.trim();
  const fecha = document.getElementById("fechaExamenes").value.trim();
  const resultado = document.getElementById("resultadoExamen").value.trim();

  // Usar los archivos que vienen del botón o los existentes en memoria
  let archivosParaEnviar = archivosExistentes || window.archivosExamenTemp || [];
  if (!archivosParaEnviar) archivosParaEnviar = [];

  try {
    const res = await fetch(`${API_PACIENTES}/${pacienteActivo._id}/examenes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreExamen, tipoExamen, fecha, resultado, archivos: archivosParaEnviar })
    });

    const data = await res.json();
    if (res.ok) {
      mostrarBurbuja("💖 Examen guardado exitosamente");
      window.archivosExamenTemp = [];

      // Actualizar paciente en memoria
      const pacienteActualizado = await fetchPacienteById(pacienteActivo._id).catch(() => pacienteActivo);
      window.pacienteActivo = pacienteActualizado;

      mostrarExamenesRegistrados(pacienteActualizado);
      document.getElementById("formExamen").reset();
    } else {
      mostrarBurbuja("❌ Error al guardar examen: " + (data.message || res.status));
    }
  } catch (error) {
    console.error("Error guardando examen:", error);
    mostrarBurbuja("Ocurrió un error al guardar el examen.");
  }
}





// ✅ Convertir archivo a base64
function convertirArchivoBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  
}



// ✅ Volver a lista
function volverAListaExamenes() {
  const pacienteActivo = window.pacienteActivo;
  if (!pacienteActivo) {
    mostrarBurbuja("❌ No hay paciente seleccionado.");
    return;
  }

  mostrarExamenesRegistrados(pacienteActivo);
  mostrarPantalla("pantallaExamenes");
}


// 🌸 Mostrar exámenes automáticamente al abrir pantallaExamenes (versión segura)
document.addEventListener("DOMContentLoaded", () => {
  let pantallaActual = null;

  const observer = new MutationObserver(() => {
    const pantallaExamenes = document.getElementById("pantallaExamenes");

    // Detectar cambio real de pantalla y evitar recargas infinitas
    if (
      pantallaExamenes &&
      pantallaExamenes.classList.contains("activa") &&
      pantallaActual !== "pantallaExamenes"
    ) {
      pantallaActual = "pantallaExamenes";

      const pacienteActivo = window.pacienteActivo;
      if (pacienteActivo) {
        console.log("📋 Cargando exámenes de:", pacienteActivo.nombre);
        mostrarExamenesRegistrados(pacienteActivo);
      }
    } else if (
      pantallaExamenes &&
      !pantallaExamenes.classList.contains("activa") &&
      pantallaActual === "pantallaExamenes"
    ) {
      // Cuando salimos de la pantalla de exámenes
      pantallaActual = null;
    }
  });

  // Observar cambios en el body (o contenedor principal) para detectar cambios de pantalla
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["class"] });
});





// --- CACHE SIMPLE PARA PACIENTE (5s)
window.__pacienteCache = window.__pacienteCache || {};

async function getPacienteConCache(id, force = false) {
  const key = String(id);
  const ahora = Date.now();
  const cached = window.__pacienteCache[key];
  if (!force && cached && (ahora - cached.ts) < 5000) {
    return cached.data;
  }
  // fetch del servidor
  const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/id/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('No se pudo obtener paciente');
  const paciente = await res.json();
  window.__pacienteCache[key] = { ts: ahora, data: paciente };
  return paciente;
}


// Helper: trae paciente actualizado por ID desde el servidor
async function fetchPacienteById(id) {
  if (!id) throw new Error("Falta id para fetchPacienteById()");
  const url = `https://petstherapy-backend.onrender.com/api/pacientes/id/${encodeURIComponent(id)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Error al obtener paciente: ${res.status} ${txt}`);
  }
  return await res.json();
}

// ✅ Volver robusto mostrarExamenesRegistrados
async function mostrarExamenesRegistrados(paciente) {
  const lista = document.getElementById("listaExamenes");
  if (!lista) {
    console.error("No existe el elemento #listaExamenes en el DOM");
    return;
  }
  lista.innerHTML = "<p style='text-align:center;color:#ff4da6;'>Cargando exámenes...</p>";

  try {
    // Usar paciente pasado como argumento o el global window.pacienteActivo
    let pacienteLocal = paciente || window.pacienteActivo;

    if (!pacienteLocal) {
      lista.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay paciente seleccionado.</p>";
      return;
    }

    const id = pacienteLocal._id || pacienteLocal.id || pacienteLocal;
    if (!id) {
      console.warn("Paciente sin id:", pacienteLocal);
      lista.innerHTML = "<p style='text-align:center;color:##ff4da6;'>Paciente inválido. No se puede cargar exámenes.</p>";
      return;
    }

    // Obtener versión más reciente del servidor
    let pacienteActualizado;
    try {
      const url = `https://petstherapy-backend.onrender.com/api/pacientes/id/${encodeURIComponent(id)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch paciente no ok " + res.status);
      pacienteActualizado = await res.json();
      window.pacienteActivo = pacienteActualizado; // <-- actualizar global
    } catch (fetchErr) {
      console.warn("No se pudo actualizar paciente desde servidor:", fetchErr);
      pacienteActualizado = pacienteLocal;
    }

    const examenes = Array.isArray(pacienteActualizado.examenes) ? pacienteActualizado.examenes : [];

    if (!examenes.length) {
      lista.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay exámenes registrados.</p>";
      return;
    }

    lista.innerHTML = "";

    examenes.forEach((examen) => {
      console.log("🩺 Examen detectado en el sistema:", examen);

      const examenId =
        examen._id?.toString?.() ||
        examen.id?.toString?.() ||
        examen.examenId?.toString?.() ||
        examen.uuid?.toString?.() ||
        examen.codigo?.toString?.() ||
        "";

      if (!examenId) {
        console.warn("Examen sin ID, se omite", examen);
        return;
      }

      const div = document.createElement("div");
      div.classList.add("examen-card");

      const titulo = document.createElement("strong");
      titulo.textContent = examen.nombreExamen || "Sin nombre";

      const tipo = document.createElement("small");
      tipo.textContent = examen.tipoExamen || "";

      const btnVer = document.createElement("button");
      btnVer.type = "button";
      btnVer.textContent = "Ver examen";
      btnVer.dataset.examenId = examenId;
      btnVer.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("👆 Clic en examen ID:", examenId);
        verExamen(examenId);
      });

      const btnEliminar = document.createElement("button");
      btnEliminar.type = "button";
      btnEliminar.textContent = "🗑 Eliminar";
      btnEliminar.classList.add("btn-eliminar-examen");
      btnEliminar.addEventListener("click", (e) => {
        e.preventDefault();
        eliminarExamen(examen._id);
      });

      div.appendChild(titulo);
      div.appendChild(document.createElement("br"));
      div.appendChild(tipo);
      div.appendChild(document.createElement("br"));
      div.appendChild(btnVer);
      div.appendChild(btnEliminar);

   

      lista.appendChild(div);
    });

    window.examenesCargados = examenes;
    console.log("💾 Exámenes guardados en memoria:", window.examenesCargados);

  } catch (error) {
    console.error("Error al cargar exámenes:", error);
    lista.innerHTML = "<p style='text-align:center;color:##ff4da6;'>Error al cargar exámenes.</p>";
  }
}


// Reemplazo robusto de verExamen
function verExamen(idExamen) {
  const paciente = window.pacienteActivo;
  if (!paciente || !Array.isArray(paciente.examenes)) {
    return mostrarBurbuja("Paciente o exámenes no disponibles 💔");
  }

  const examen = paciente.examenes.find(e =>
    String(e._id || e.id) === String(idExamen)
  );

  if (!examen) {
    return mostrarBurbuja("Examen no encontrado 💔");
  }

  window._viendoExamen = true;
  window.examenActivo = examen;

  document.getElementById("verNombrePaciente").value = paciente.nombre || "";
  document.getElementById("verEspecie").value = paciente.especie || "";
  document.getElementById("verRaza").value = paciente.raza || "";
  document.getElementById("verNombreExamen").value = examen.nombreExamen || "";
  document.getElementById("verTipoExamen").value = examen.tipoExamen || "";
  document.getElementById("verFechaExamen").value = examen.fecha || "";
  document.getElementById("verResultado").value = examen.resultado || "";

  const archivosDiv = document.getElementById("archivosAdjuntosVer");
  archivosDiv.innerHTML = "";

  if (Array.isArray(examen.archivos)) {
    examen.archivos.forEach((archivo, i) => {
      if (!archivo.base64) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = archivo.nombre || `Archivo ${i + 1}`;
      btn.onclick = () =>
        descargarBase64(archivo.base64, archivo.nombre);

      archivosDiv.appendChild(btn);
    });
  }

  mostrarPantalla("pantallaVerExamen");
}







const archivosDiv = document.createElement("div");
archivosDiv.classList.add("archivos-examen");















// Función para eliminar un examen
async function eliminarExamen(idExamen) {
  // Obtener paciente activo de la variable global
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("No se puede eliminar: paciente no encontrado 💔", "error");
  }

  // Confirmación del usuario
  const confirmar = confirm("¿Seguro que deseas eliminar este examen?");
  if (!confirmar) return;

  try {
    // Llamada al backend para eliminar examen
    const respuesta = await fetch(
      `${API_PACIENTES}/${paciente._id}/examenes/${idExamen}`,
      { method: "DELETE" }
    );

    const data = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error al eliminar examen:", data.message);
      return mostrarBurbuja(data.message || "Ocurrió un error al eliminar el examen 💔", "error");
    }

    // Éxito
    mostrarBurbuja("Examen eliminado correctamente ❤️", "exito");

    // 🔄 Recargar los exámenes desde la base de datos
    const pacienteActualizado = await fetchPacienteById(paciente._id);
    window.pacienteActivo = pacienteActualizado; // actualizar paciente activo
    mostrarExamenesRegistrados(pacienteActualizado);

  } catch (error) {
    console.error("Error de red al eliminar examen:", error);
    mostrarBurbuja("No se pudo eliminar. Verifica tu conexión 🕸️", "error");
  }
}






// 🌸 --- SUBIDA DE ARCHIVOS EXÁMENES ---
document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos
  const inputArchivo = document.getElementById("archivosExamen");
  const listaArchivosPantalla = document.getElementById("listaArchivosPantalla");
  const btnGuardarArchivos = document.getElementById("btnGuardarArchivos");

  // Variable temporal para almacenar archivos antes de enviar
  window.archivosExamenTemp = [];

  // Función para convertir a base64
  const convertirArchivoBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // 👆 Mostrar archivos seleccionados en la lista
  inputArchivo.addEventListener("change", () => {
    listaArchivosPantalla.innerHTML = ""; // limpiar lista anterior
    const archivos = Array.from(inputArchivo.files);

    if (archivos.length === 0) {
      listaArchivosPantalla.innerHTML = "<li>No se ha seleccionado ningún archivo</li>";
      return;
    }

    archivos.forEach((archivo) => {
      const li = document.createElement("li");
      li.textContent = archivo.name;
      listaArchivosPantalla.appendChild(li);
    });
  });

  // 👆 Subir archivos y convertirlos a base64
  btnGuardarArchivos.addEventListener("click", async () => {
    const archivos = Array.from(inputArchivo.files);
    if (archivos.length === 0) {
      mostrarBurbuja("No hay archivos seleccionados 💔");
      return;
    }

    const archivosBase64 = [];
    for (const archivo of archivos) {
      try {
        const base64 = await convertirArchivoBase64(archivo);
        archivosBase64.push({ nombre: archivo.name, base64 });
      } catch (err) {
        console.error("Error convirtiendo archivo a base64:", err);
        mostrarBurbuja(`Error con el archivo: ${archivo.name}`);
      }
    }

    // Guardamos temporalmente para usar al guardar el examen
    window.archivosExamenTemp = archivosBase64;

    mostrarBurbuja(`Se seleccionaron ${archivosBase64.length} archivo(s) ✅`);

    // Volver automáticamente a la pantalla de exámenes si quieres
    mostrarPantalla("pantallaExamenes");
  });
});




function descargarBase64(base64, nombreArchivo = "archivo") {
  try {
    const [meta, data] = base64.split(",");
    const mime = meta.match(/:(.*?);/)[1];
    const bin = atob(data);

    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }

    const blob = new Blob([buffer], { type: mime });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = nombreArchivo;

    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  } catch (e) {
    console.error(e);
    mostrarBurbuja("No se pudo descargar el archivo 💔");
  }
}








document.addEventListener("DOMContentLoaded", () => {
  // --------------------------- Variables ---------------------------
  const nombreInput = document.getElementById("nombreHistorial");
  const especieInput = document.getElementById("especieHistorial");
  const razaInput = document.getElementById("razaHistorial");
  const fechaInput = document.getElementById("fechaNacimientoHistorial");
  const pesoInput = document.getElementById("pesoHistorial");
  const fotoInput = document.getElementById("inputFotoHistorial");
  const previewFoto = document.getElementById("previewFotoHistorial");
  const btnGuardar = document.getElementById("btnGuardarHistorial");
  const pantallaHistorial = document.getElementById("pantallaHistorialMedico");

  // --------------------------- Funciones ---------------------------
  // Convertir archivo a Base64
  const convertirArchivoBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  // Cargar historial médico del paciente
window.cargarHistorialMedico = async () => {
  let pacienteActivo = window.pacienteActivo;
  if (!pacienteActivo) return;

  // 1️⃣ Mostrar datos del paciente inmediatamente
  const hLocal = pacienteActivo.historialMedico || {};
  nombreInput.value = hLocal.nombre || "";
  especieInput.value = hLocal.especie || "";
  razaInput.value = hLocal.raza || "";
  fechaInput.value = hLocal.fechaNacimiento || "";
  pesoInput.value = hLocal.peso || "";
  previewFoto.src = hLocal.foto || "img/default.png";

  // 2️⃣ Refrescar datos desde el backend en segundo plano
  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/id/${pacienteActivo._id}`);
    if (!res.ok) throw new Error("Error al cargar paciente desde servidor");

    pacienteActivo = await res.json();
    window.pacienteActivo = pacienteActivo; // actualizar variable global

    const h = pacienteActivo.historialMedico || {};
    nombreInput.value = h.nombre || "";
    especieInput.value = h.especie || "";
    razaInput.value = h.raza || "";
    fechaInput.value = h.fechaNacimiento || "";
    pesoInput.value = h.peso || "";
    previewFoto.src = h.foto || "img/default.png";

  } catch (err) {
    console.error("Error refrescando historial médico:", err);
  }
};


  // Guardar historial médico
async function guardarHistorial() {
  let pacienteActivo = window.pacienteActivo;
  if (!pacienteActivo) {
    mostrarBurbuja("❌ No hay paciente seleccionado");
    return;
  }

  try {
    // Procesar la foto si se seleccionó un archivo nuevo
    let fotoBase64 = pacienteActivo.historialMedico?.foto || "";
    if (fotoInput.files.length > 0) {
      fotoBase64 = await convertirArchivoBase64(fotoInput.files[0]);
      previewFoto.src = fotoBase64;
    }

    const historial = {
      nombre: nombreInput.value.trim(),
      especie: especieInput.value.trim(),
      raza: razaInput.value.trim(),
      fechaNacimiento: fechaInput.value,
      peso: pesoInput.value.trim(),
      foto: fotoBase64
    };

    // Enviar actualización al backend
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${pacienteActivo._id}/historial`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(historial)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Error al guardar historial");
    }

    // Actualizar paciente activo con la respuesta del servidor
    pacienteActivo = await res.json();
    window.pacienteActivo = pacienteActivo; // actualizar variable global

    mostrarBurbuja("💖 Historial médico guardado correctamente");
  } catch (err) {
    console.error("Error guardando historial:", err);
    mostrarBurbuja(`❌ No se pudo guardar el historial: ${err.message}`);
  }
}


  // --------------------------- Eventos ---------------------------
  btnGuardar.addEventListener("click", guardarHistorial);

  // Observador: cargar historial cuando pantalla se activa
  const observer = new MutationObserver(() => {
    if (pantallaHistorial.classList.contains("activa")) {
      cargarHistorialMedico();
    }
  });
  observer.observe(pantallaHistorial, { attributes: true });
});







async function irAVacunas() {
  // Tomar paciente directamente de la variable global en memoria
  const paciente = window.pacienteActivo;

  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  mostrarPantalla("pantallaVacunas");

  // Llenar los campos de la pantalla de vacunas
  document.getElementById("nombrePacienteV").value = paciente.nombre || "";
  document.getElementById("especieVacunas").value = paciente.especie || "";
  document.getElementById("razaV").value = paciente.raza || "";

  try {
    // Traer las vacunas del paciente desde el backend
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/vacunas`);
    if (!res.ok) throw new Error("Error al cargar vacunas");

    const lista = await res.json();
    mostrarVacunas(lista);
  } catch (err) {
    console.error("Error cargando vacunas:", err);
    mostrarBurbuja("❌ No se pudieron cargar las vacunas", "error");
  }
}




// --- Guardar nueva vacuna ---
async function guardarVacuna() {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  const nueva = {
    tipoVacuna: document.getElementById("tipoVacunaV").value.trim(),
    loteVacuna: document.getElementById("loteVacunaV").value.trim(),
    fechaAplicacion: document.getElementById("fechaAplicacionV").value,
    proximaFecha: document.getElementById("proximaFechaV").value,
    viaAdministracion: document.getElementById("viaAdministracionV").value.trim(),
    observaciones: document.getElementById("observacionesV").value.trim()
  };

  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/vacunas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al guardar vacuna");

    // Actualizar paciente activo
    window.pacienteActivo = data.paciente;

    mostrarVacunas(data.paciente.vacunas || []);
    mostrarBurbuja("💖 Vacuna guardada correctamente", "exito");

    // Limpiar campos
    ["tipoVacunaV","loteVacunaV","fechaAplicacionV","proximaFechaV","viaAdministracionV","observacionesV"]
      .forEach(id => document.getElementById(id).value = "");

  } catch (error) {
    console.error("Error guardando vacuna:", error);
    mostrarBurbuja(`❌ No se pudo guardar la vacuna: ${error.message}`, "error");
  }
}

// --- Cargar vacunas desde backend ---
async function cargarVacunas(pacienteId) {
  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${pacienteId}/vacunas`);
    if (!res.ok) throw new Error("Error al cargar vacunas");
    const lista = await res.json();
    mostrarVacunas(lista || []);
  } catch (err) {
    console.error("Error cargando vacunas:", err);
    mostrarBurbuja("❌ No se pudieron cargar las vacunas", "error");
  }
}

// --- Mostrar lista de vacunas ---
function mostrarVacunas(lista) {
  const cont = document.getElementById("listaVacunas");
  cont.innerHTML = "";

  if (!Array.isArray(lista) || lista.length === 0) {
    cont.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay vacunas registradas.</p>";
    return;
  }

  if (!lista.length) {
    cont.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay vacunas registradas.</p>";
    return;
  }

  lista.forEach(v => {
    const div = document.createElement("div");
    div.classList.add("vacuna-card");
    div.innerHTML = `
      <span><strong>${v.tipoVacuna}</strong></span>
      <div>
        <button class="btn-principal" onclick="verVacuna('${v._id}')">Ver</button>
        <button onclick="eliminarVacuna('${v._id}')">🗑</button>
      </div>
    `;
    cont.appendChild(div);
  });
}

// --- Ver vacuna específica ---
function verVacuna(vacId) {
  const paciente = window.pacienteActivo;
  if (!paciente || !Array.isArray(paciente.vacunas)) {
    return mostrarBurbuja("❌ No hay paciente seleccionado o no tiene vacunas");
  }

  const v = paciente.vacunas.find(x => String(x._id) === String(vacId));
  if (!v) return mostrarBurbuja("❌ Vacuna no encontrada");

  // Datos del paciente
  document.getElementById("nombrePacienteV_r").value = paciente.nombre || "";
  document.getElementById("especieVacunas_r").value = paciente.especie || "";
  document.getElementById("razaV_r").value = paciente.raza || "";

  // Datos de la vacuna
  document.getElementById("tipoVacunaV_r").value = v.tipoVacuna || "";
  document.getElementById("loteVacunaV_r").value = v.loteVacuna || "";
  document.getElementById("fechaAplicacionV_r").value = v.fechaAplicacion?.split("T")[0] || "";
  document.getElementById("proximaFechaV_r").value = v.proximaFecha?.split("T")[0] || "";
  document.getElementById("viaAdministracionV_r").value = v.viaAdministracion || "";
  document.getElementById("observacionesV_r").value = v.observaciones || "";

  mostrarPantalla("pantallaVerVacuna");
}

// --- Eliminar vacuna ---
async function eliminarVacuna(vacId) {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) return mostrarBurbuja("❌ No hay paciente seleccionado", "error");

  const confirmar = confirm("¿Seguro que deseas eliminar esta vacuna?");
  if (!confirmar) return;

  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/vacunas/${vacId}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al eliminar vacuna");

    window.pacienteActivo = data.paciente;
    mostrarVacunas(data.paciente.vacunas || []);
    mostrarBurbuja("Vacuna eliminada correctamente ❤️", "exito");

  } catch (err) {
    console.error("Error eliminando vacuna:", err);
    mostrarBurbuja("❌ No se pudo eliminar la vacuna", "error");
  }
}






async function irADesparasitaciones() {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  mostrarPantalla("pantallaDesparasitaciones");

  // Llenar campos con datos del paciente
  document.getElementById("nombrePacienteD").value = paciente.nombre || "";
  document.getElementById("especieDesparasitaciones").value = paciente.especie || "";
  document.getElementById("razaD").value = paciente.raza || "";

  try {
    // Cargar desparasitaciones desde backend
    await cargarDesparasitaciones(paciente._id);
  } catch (err) {
    console.error("Error cargando desparasitaciones:", err);
    mostrarBurbuja("❌ No se pudieron cargar las desparasitaciones", "error");
  }
}



async function guardarDesparasitacion() {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  const nueva = {
    producto: document.getElementById("productoD").value.trim(),
    dosis: document.getElementById("dosisDesparasitaciones").value.trim(),
    viaAdministracion: document.getElementById("viaAdministracionD").value.trim(),
    frecuencia: document.getElementById("frecuenciaD").value.trim(),
    fechaAplicacion: document.getElementById("fechaAplicacionD").value,
    proximaFecha: document.getElementById("proximaFechaD").value,
    observaciones: document.getElementById("observacionesD").value.trim()
  };

  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/desparasitaciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al guardar desparasitación");
    }

    // Actualizar solo la variable global
    window.pacienteActivo = data.paciente;

    mostrarDesparasitaciones(data.paciente.desparasitaciones);
    mostrarBurbuja("💖 Desparasitación guardada correctamente", "exito");

    // Limpiar campos
    document.getElementById("productoD").value = "";
    document.getElementById("dosisDesparasitaciones").value = "";
    document.getElementById("viaAdministracionD").value = "";
    document.getElementById("frecuenciaD").value = "";
    document.getElementById("fechaAplicacionD").value = "";
    document.getElementById("proximaFechaD").value = "";
    document.getElementById("observacionesD").value = "";

  } catch (err) {
    console.error("Error guardando desparasitación:", err);
    mostrarBurbuja(`❌ No se pudo guardar la desparasitación: ${err.message}`, "error");
  }
}



async function cargarDesparasitaciones(id) {
  const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${id}/desparasitaciones`);
  const lista = await res.json();
  mostrarDesparasitaciones(lista);
}

function mostrarDesparasitaciones(lista) {
  const cont = document.getElementById("listaDesparasitaciones");
  cont.innerHTML = "";

  if (!lista.length) {
    cont.innerHTML = "<p>No hay desparasitaciones registradas.</p>";
    return;
  }

  lista.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("vacuna-card");
    div.innerHTML = `
      <span><strong>${d.producto}</strong></span>
      <div>
        <button class="btn-principal" onclick="verDesparasitacion('${d._id}')">Ver</button>
        <button onclick="eliminarDesparasitacion('${d._id}')">🗑</button>
      </div>
    `;
    cont.appendChild(div);
  });
}


async function verDesparasitacion(depId) {
  const paciente = window.pacienteActivo;
  if (!paciente) return mostrarBurbuja("❌ No hay paciente seleccionado", "error");

  const lista = paciente.desparasitaciones || [];
  const d = lista.find(x => x._id === depId);

  if (!d) return mostrarBurbuja("❌ Desparasitación no encontrada", "error");

  document.getElementById("nombrePacienteD_r").value = paciente.nombre || "";
  document.getElementById("especieD_r").value = paciente.especie || "";
  document.getElementById("razaD_r").value = paciente.raza || "";

  document.getElementById("productoD_r").value = d.producto || "";
  document.getElementById("dosisD_r").value = d.dosis || "";
  document.getElementById("viaAdministracionD_r").value = d.viaAdministracion || "";
  document.getElementById("frecuenciaD_r").value = d.frecuencia || "";

  document.getElementById("fechaAplicacionD_r").value = d.fechaAplicacion?.split("T")[0] || "";
  document.getElementById("proximaFechaD_r").value = d.proximaFecha?.split("T")[0] || "";

  document.getElementById("observacionesD_r").value = d.observaciones || "";

  mostrarPantalla("pantallaVerDesparasitacion");
}



async function eliminarDesparasitacion(depId) {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  const confirmar = confirm("¿Seguro que deseas eliminar esta desparasitación?");
  if (!confirmar) return;

  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/desparasitaciones/${depId}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al eliminar desparasitación");
    }

    // Actualizar variable global
    window.pacienteActivo = data.paciente;

    mostrarDesparasitaciones(data.paciente.desparasitaciones);
    mostrarBurbuja("✅ Desparasitación eliminada correctamente", "exito");

  } catch (err) {
    console.error("Error eliminando desparasitación:", err);
    mostrarBurbuja(`❌ No se pudo eliminar: ${err.message}`, "error");
  }
}





async function irAAntipulgas() {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  mostrarPantalla("pantallaAntipulgas");

  document.getElementById("nombrePacienteA").value = paciente.nombre || "";
  document.getElementById("especieAntipulgas").value = paciente.especie || "";
  document.getElementById("razaA").value = paciente.raza || "";

  try {
    await cargarAntipulgas(paciente._id);
  } catch (err) {
    console.error("Error cargando antipulgas:", err);
    mostrarBurbuja("❌ No se pudieron cargar los antipulgas", "error");
  }
}


async function guardarAntipulgas() {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  const nueva = {
    producto: document.getElementById("productoA").value.trim(),
    dosis: document.getElementById("dosisAntipulgas").value.trim(),
    viaAdministracion: document.getElementById("viaAdministracionA").value.trim(),
    frecuencia: document.getElementById("frecuenciaA").value.trim(),
    fechaAplicacion: document.getElementById("fechaAplicacionA").value,
    proximaFecha: document.getElementById("proximaFechaA").value,
    observaciones: document.getElementById("observacionesA").value.trim()
  };

  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/antipulgas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al guardar antipulgas");

    // Actualizar solo variable global en memoria
    window.pacienteActivo = data.paciente;

    // Actualizar interfaz
    mostrarAntipulgas(data.paciente.antipulgas);
    mostrarBurbuja("💖 Aplicación antipulgas guardada correctamente", "exito");

    // Limpiar campos
    document.getElementById("productoA").value = "";
    document.getElementById("dosisAntipulgas").value = "";
    document.getElementById("viaAdministracionA").value = "";
    document.getElementById("frecuenciaA").value = "";
    document.getElementById("fechaAplicacionA").value = "";
    document.getElementById("proximaFechaA").value = "";
    document.getElementById("observacionesA").value = "";

  } catch (err) {
    console.error("Error guardando antipulgas:", err);
    mostrarBurbuja(`❌ No se pudo guardar: ${err.message}`, "error");
  }
}




async function cargarAntipulgas(id) {
  const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${id}/antipulgas`);
  const lista = await res.json();
  mostrarAntipulgas(lista);
}

function mostrarAntipulgas(lista) {
  const cont = document.getElementById("listaAntipulgas");
  cont.innerHTML = "";

  if (!lista.length) {
    cont.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay antipulgas registrados</p>";
    return;
  }

  lista.forEach(a => {
    const div = document.createElement("div");
    div.classList.add("vacuna-card");

    div.innerHTML = `
      <span><strong>${a.producto}</strong></span>
      <div>
        <button class="btn-principal" onclick="verAntipulgas('${a._id}')">Ver</button>
        <button onclick="eliminarAntipulgas('${a._id}')">🗑</button>
      </div>
    `;
    cont.appendChild(div);
  });
}

function verAntipulgas(aid) {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  const a = paciente.antipulgas.find(x => x._id === aid);
  if (!a) return mostrarBurbuja("Antipulgas no encontrada", "error");

  document.getElementById("nombrePacienteA_r").value = paciente.nombre || "";
  document.getElementById("especieA_r").value = paciente.especie || "";
  document.getElementById("razaA_r").value = paciente.raza || "";

  document.getElementById("productoA_r").value = a.producto || "";
  document.getElementById("dosisA_r").value = a.dosis || "";
  document.getElementById("viaAdministracionA_r").value = a.viaAdministracion || "";
  document.getElementById("frecuenciaA_r").value = a.frecuencia || "";

  document.getElementById("fechaAplicacionA_r").value = a.fechaAplicacion?.split("T")[0] || "";
  document.getElementById("proximaFechaA_r").value = a.proximaFecha?.split("T")[0] || "";

  document.getElementById("observacionesA_r").value = a.observaciones || "";

  mostrarPantalla("pantallaVerAntipulgas");
}

async function eliminarAntipulgas(aid) {
  const paciente = window.pacienteActivo;
  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  const confirmar = confirm("¿Seguro que deseas eliminar esta aplicación antipulgas?");
  if (!confirmar) return;

  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/antipulgas/${aid}`, {
      method: "DELETE"
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al eliminar antipulgas");

    // Actualizar variable global
    window.pacienteActivo = data.paciente;

    mostrarAntipulgas(data.paciente.antipulgas);
    mostrarBurbuja("🗑 Aplicación antipulgas eliminada correctamente", "exito");
  } catch (err) {
    console.error("Error eliminando antipulgas:", err);
    mostrarBurbuja(`❌ No se pudo eliminar: ${err.message}`, "error");
  }
}





async function irATratamiento() {
  const paciente = window.pacienteActivo;   // ← Usamos la variable global

  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  mostrarPantalla("pantallaTratamiento");

  // Llenar los campos del encabezado
  document.getElementById("nombrePacienteT").value = paciente.nombre || "";
  document.getElementById("especieT").value = paciente.especie || "";
  document.getElementById("razaT").value = paciente.raza || "";

  try {
    await cargarTratamientos(paciente._id);   // 🔥 Cargar desde la BD
  } catch (error) {
    console.error("Error cargando tratamientos:", error);
    mostrarBurbuja("❌ No se pudieron cargar los tratamientos", "error");
  }
}


async function guardarTratamiento() {
  const paciente = window.pacienteActivo;   // <--- usamos el global

  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado", "error");
  }

  const nuevo = {
    medicamento: document.getElementById("medicamentoT").value.trim(),
    dosis: document.getElementById("dosisT").value.trim(),
    frecuencia: document.getElementById("frecuenciaT").value.trim(),
    viaAdministracion: document.getElementById("viaAdministracionT").value.trim(),
    duracion: document.getElementById("duracionT").value.trim(),
    costo: document.getElementById("costoT").value.trim(),
    observaciones: document.getElementById("observacionesT").value.trim()
  };

  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/tratamientos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Error al guardar tratamiento");
    }

    const data = await res.json();

    // 🔥 actualizamos la variable global
    window.pacienteActivo = data.paciente;

    // 🔥 refrescar lista
    mostrarTratamientos(data.paciente.tratamientos);

    mostrarBurbuja("💊 Tratamiento guardado con éxito", "exito");

    // limpiar
    document.getElementById("medicamentoT").value = "";
    document.getElementById("dosisT").value = "";
    document.getElementById("frecuenciaT").value = "";
    document.getElementById("viaAdministracionT").value = "";
    document.getElementById("duracionT").value = "";
    document.getElementById("costoT").value = "";
    document.getElementById("observacionesT").value = "";

  } catch (error) {
    console.error("Error guardando tratamiento:", error);
    mostrarBurbuja(`❌ No se pudo guardar el tratamiento: ${error.message}`, "error");
  }
}


async function cargarTratamientos(id) {
  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${id}/tratamientos`);
    if (!res.ok) throw new Error("No se pudo obtener la lista");

    const lista = await res.json();
    mostrarTratamientos(Array.isArray(lista) ? lista : []);

  } catch (error) {
    console.error("Error cargando tratamientos:", error);
    mostrarTratamientos([]); // <- evita caída total
  }
}



function mostrarTratamientos(lista = []) {
  const cont = document.getElementById("listaTratamientos");
  cont.innerHTML = "";

  // Si no hay tratamientos
  if (!Array.isArray(lista) || lista.length === 0) {
    cont.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay tratamientos registrados.</p>";
    return;
  }

  lista.forEach(t => {
    const div = document.createElement("div");
    div.classList.add("vacuna-card"); // Puedes renombrar la clase luego si quieres

    div.innerHTML = `
      <span><strong>${t.medicamento || "Sin nombre"}</strong></span>

      <div>
        <button class="btn-principal" onclick="verTratamiento('${t._id}')">Ver</button>
        <button class="btn-eliminar" onclick="eliminarTratamiento('${t._id}')"> 🗑 </button>
      </div>
    `;

    cont.appendChild(div);
  });
}

async function verTratamiento(tId) {
  const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/tratamientos/${tId}`);

  if (!res.ok) return mostrarBurbuja("No se pudo obtener el tratamiento");
  
  const { paciente, tratamiento } = await res.json();

  document.getElementById("nombrePacienteT_r").value = paciente.nombre || "";
  document.getElementById("especieT_r").value = paciente.especie || "";
  document.getElementById("razaT_r").value = paciente.raza || "";

  document.getElementById("medicamentoT_r").value = tratamiento.medicamento || "";
  document.getElementById("dosisT_r").value = tratamiento.dosis || "";
  document.getElementById("frecuenciaT_r").value = tratamiento.frecuencia || "";
  document.getElementById("viaAdministracionT_r").value = tratamiento.viaAdministracion || "";
  document.getElementById("duracionT_r").value = tratamiento.duracion || "";
  document.getElementById("costoT_r").value = tratamiento.costo || "";
  document.getElementById("observacionesT_r").value = tratamiento.observaciones || "";

  mostrarPantalla("pantallaVerTratamiento");
}



async function eliminarTratamiento(tId) {

  if (!confirm("¿Seguro que quieres eliminar este tratamiento?")) return;

  const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/tratamientos/${tId}`, {
    method: "DELETE"
  });

  const { paciente } = await res.json();
  mostrarTratamientos(paciente.tratamientos);

  mostrarBurbuja("Tratamiento eliminado con éxito 🗑");
}




// ---------------------------
// CONSULTAS - FRONTEND CORREGIDO
// ---------------------------
// ---------------------------
// CONSULTAS - FRONTEND
// ---------------------------

async function irAConsultas() {
  const paciente = window.pacienteActivo;

  if (!paciente || !paciente._id) {
    return mostrarBurbuja("❌ No hay paciente seleccionado");
  }

  mostrarPantalla("pantallaConsultas");

  // Llenar encabezado
  document.querySelector("#pantallaConsultas input[placeholder='Nombre del paciente:']").value = paciente.nombre || "";
  document.querySelector("#pantallaConsultas input[placeholder='Especie:']").value = paciente.especie || "";
  document.querySelector("#pantallaConsultas input[placeholder='Raza:']").value = paciente.raza || "";

  // Cargar consultas desde MongoDB
  await cargarConsultas(paciente._id);
}

async function guardarConsulta() {
  try {
    const paciente = window.pacienteActivo;
    if (!paciente || !paciente._id) {
      return mostrarBurbuja("❌ No hay paciente seleccionado");
    }

    const consulta = {
      fecha: document.getElementById("fechaConsulta").value,
      hora: document.getElementById("horaConsulta").value,
      propietario: document.getElementById("consultaPropietario").value.trim(),
      direccion: document.getElementById("consultaDireccion").value.trim(),
      motivo: document.getElementById("motivoConsulta").value.trim(),
      examenClinico: document.getElementById("examenClinico").value.trim(),
      diagnostico: document.getElementById("diagnosticoFinal").value.trim(),
      diferenciales: document.getElementById("diagnosticosDiferenciales").value.trim(),
      pruebasDiagnosticas: document.getElementById("pruebasDiagnosticas").value.trim(),
      tratamientoAplicado: document.getElementById("tratamientoAplicado").value.trim(),
      formulaMedica: document.getElementById("formulaMedica").value.trim(),
      fechaControl: document.getElementById("fechaControl").value,
      horaControl: document.getElementById("horaControl").value,
      costo: document.getElementById("costoConsulta").value.trim()
    };

    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/consultas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consulta)
    });

    if (!res.ok) throw new Error("Error enviando consulta al servidor");

    const data = await res.json();

    // Actualizamos paciente global
    window.pacienteActivo = data.paciente;

    mostrarBurbuja("✅ Consulta guardada correctamente");

    mostrarConsultas(data.paciente.consultas);
    document.getElementById("formConsulta").reset();

  } catch (error) {
    console.error("⛔ Error guardando consulta:", error);
    mostrarBurbuja("❌ No se pudo guardar la consulta");
  }
}

async function cargarConsultas(id) {
  try {
    if (!id) return console.error("❌ No se recibió el ID del paciente");

    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${id}/consultas`);
    if (!res.ok) throw new Error("Error obteniendo consultas del backend");

    const lista = await res.json();
    mostrarConsultas(lista);

  } catch (error) {
    console.error("⛔ Error cargando consultas:", error);
    mostrarConsultas([]);
  }
}

function mostrarConsultas(lista) {
  const cont = document.getElementById("listaConsultas");
  if (!cont) return;

  cont.innerHTML = "";

  if (!Array.isArray(lista) || lista.length === 0) {
    cont.innerHTML = "<p style='text-align:center;color:##ff4da6;'>No hay consultas registradas.</p>";
    return;
  }

  lista.forEach(c => {
    const div = document.createElement("div");
    div.classList.add("vacuna-card");

    div.innerHTML = `
      <span><strong>${c.motivo || "Consulta"}</span>
      <div>
        <button class="btn-principal" onclick="verConsulta('${c._id}')">Ver</button>
        <button onclick="eliminarConsulta('${c._id}')"> 🗑 </button>
      </div>
    `;
    cont.appendChild(div);
  });
}




async function verConsulta(consultaId) {
  const paciente = window.pacienteActivo;
  if (!paciente) return mostrarBurbuja("❌ No hay paciente seleccionado");

  const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/consultas/${consultaId}`);
  if (!res.ok) return mostrarBurbuja("❌ Error cargando consulta");

  const c = await res.json();

  // Datos generales
  document.getElementById("consultaNombre_r").value = paciente.nombre;
  document.getElementById("consultaEspecie_r").value = paciente.especie;
  document.getElementById("consultaRaza_r").value = paciente.raza;
  document.getElementById("consultaPropietario_r").value = c.propietario || "";
  document.getElementById("consultaDireccion_r").value = c.direccion || "";

  // Fecha & hora
  document.getElementById("fechaConsulta_r").value = c.fecha?.split("T")[0] || "";
  document.getElementById("horaConsulta_r").value = c.hora || "";

  // Detalles clínicos
  document.getElementById("motivoConsulta_r").value = c.motivo || "";
  document.getElementById("examenClinico_r").value = c.examenClinico || "";
  document.getElementById("diagnosticosDiferenciales_r").value = c.diferenciales || "";
  document.getElementById("pruebasDiagnosticas_r").value = c.pruebasDiagnosticas || "";
  document.getElementById("diagnosticoFinal_r").value = c.diagnostico || "";
  document.getElementById("tratamientoAplicado_r").value = c.tratamientoAplicado || "";
  document.getElementById("formulaMedica_r").value = c.formulaMedica || "";

  // Control
  document.getElementById("fechaControl_r").value = c.fechaControl?.split("T")[0] || "";
  document.getElementById("horaControl_r").value = c.horaControl || "";

  // Costo
  document.getElementById("costoConsulta_r").value = c.costo || "";

  mostrarPantalla("pantallaVerConsulta");
}

async function eliminarConsulta(id) {
  const paciente = window.pacienteActivo;
  if (!paciente) return mostrarBurbuja("❌ No hay paciente seleccionado");

  if (!confirm("¿Seguro que deseas eliminar esta consulta?")) return;

  const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/consultas/${id}`, {
    method: "DELETE"
  });

  const data = await res.json();
  if (data.error) return mostrarBurbuja("❌ Error eliminando consulta");

  // Actualizamos paciente global
  window.pacienteActivo = data.paciente;

  await cargarConsultas(paciente._id);

  mostrarBurbuja("✅ Consulta eliminada correctamente");
}









// temporal, no se guarda en localStorage
let recordatoriosGlobales = [];



/* ---------------------------
  RECORDATORIOS - FRONTEND (AVANZADO)
---------------------------- */

// ir a pantalla recordatorios
async function irARecordatorios() {
const paciente = obtenerPacienteActivo();
  if (!paciente) return mostrarBurbuja("No hay paciente seleccionado");

  mostrarPantalla("pantallaRecordatorios");

  // autocompletar
  document.getElementById("recNombre").value = paciente.nombre || "";
  document.getElementById("recEspecie").value = paciente.especie || "";
  document.getElementById("recRaza").value = paciente.raza || "";

  // limpiar campos propios de input
  document.getElementById("tipoEvento").value = "";
  document.getElementById("fechaEvento").value = "";
  document.getElementById("horaEvento").value = "";
  document.getElementById("fechaEnvio").value = "";
  document.getElementById("horaEnvio").value = "";
  document.getElementById("mensaje").value = "";

  // cargar recordatorios desde backend
  cargarRecordatorios(paciente._id);
}

async function guardarRecordatorio() {
  try {
    const paciente = obtenerPacienteActivo();
    if (!paciente?._id) return mostrarBurbuja("⚠ No hay paciente seleccionado");

    const recordatorio = {
  tipo: document.getElementById("tipoEvento").value,
  fechaEvento: document.getElementById("fechaEvento").value,
  horaEvento: document.getElementById("horaEvento").value || null,
  mensaje: document.getElementById("mensaje").value || "",
  diasAntesVet: 2,   // 👈 CLAVE
  diasAntesProp: 0   // 👈 CLAVE
};


    if (!recordatorio.fechaEvento || !recordatorio.tipo) {
      return mostrarBurbuja("⚠ Fecha y tipo son obligatorios");
    }

    const res = await fetch(
      `https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/recordatorios`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recordatorio)
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error servidor");

    mostrarBurbuja("✔ Recordatorio guardado");

    limpiarFormularioRecordatorio();


    cargarRecordatorios(paciente._id);

  } catch (e) {
    console.error(e);
    mostrarBurbuja("❌ No se pudo guardar");
  }
}











// ✅ SOLO AQUÍ
async function cargarRecordatorios(id) {
  try {
    const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${id}/recordatorios`);
    if (!res.ok) throw new Error("No se cargaron recordatorios");

    recordatoriosGlobales = await res.json();
    mostrarRecordatorios(recordatoriosGlobales);

    
  } catch (err) {
    console.error(err);
    mostrarBurbuja("Error cargando recordatorios");
  }
}




// mostrar lista
function mostrarRecordatorios(lista) {
  const cont = document.getElementById("listaRecordatorios");
  if (!cont) return;
  cont.innerHTML = "";

  if (!Array.isArray(lista) || lista.length === 0) {
    cont.innerHTML = "<p style='text-align:center;color:#ff4da6;'>No hay recordatorios registrados.</p>";
    return;
  }

  lista.forEach(r => {

    // 👉 determinar estado del recordatorio
    let estadoTexto = "🕒 Pendiente de confirmar";
    let estadoClase = "estado-pendiente";

    if (r.vetConfirmado && r.enviadoProp) {
      estadoTexto = "✅ Confirmado y enviado";
      estadoClase = "estado-confirmado";
    }

    const div = document.createElement("div");
    div.classList.add("vacuna-card");

    div.innerHTML = `
      <div class="${estadoClase}">
        <strong>${(r.tipo || "TIPO").toUpperCase()}</strong><br>
        <span style="font-size:12px;">${estadoTexto}</span>
      </div>

      <div>
        <button class="btn-principal" onclick="verRecordatorio('${r._id}')">Ver</button>
        <button onclick="eliminarRecordatorio('${r._id}')">🗑</button>
      </div>
    `;

    cont.appendChild(div);
  });
}



async function confirmarYEnviarRecordatorio() {
const paciente = obtenerPacienteActivo();
  const rec = window.recordatorioSeleccionado; // ← Debes tener esto almacenado al abrir detalle

  const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/recordatorios/${rec._id}/confirmarYEnviar`, {
  method:"PATCH",
  headers:{"Content-Type":"application/json"}
  });

  const data = await res.json();
  if(data.ok){
    mostrarBurbuja("Confirmado ✔ Ahora el propietario ha sido notificado");
    mostrarPantalla("pantallaRecordatorios");
  }
}



function verRecordatorio(recordatorioId) {
  const paciente = obtenerPacienteActivo();
  if (!paciente) return mostrarBurbuja("No hay paciente activo");

  const r = recordatoriosGlobales.find(x => x._id === recordatorioId);
  if (!r) return mostrarBurbuja("⚠ No se encontró el recordatorio");

  console.log("Recordatorio cargado:", r);

  window.recordatorioSeleccionado = r;

  document.getElementById("recNombre_r").value = paciente.nombre;
  document.getElementById("recEspecie_r").value = paciente.especie;
  document.getElementById("recRaza_r").value = paciente.raza;

  document.getElementById("tipoEvento_r").value = r.tipo || "";

  // ✅ Fecha y hora del evento
  document.getElementById("fechaEvento_r").value = r.fechaEvento ? r.fechaEvento.split("T")[0] : "";
  document.getElementById("horaEvento_r").value = r.horaEvento || "";

  // ✅ Fecha y hora de envío sugerida
  document.getElementById("fechaEnvio_r").value = r.fechaAvisoProp ? r.fechaAvisoProp.split("T")[0] : "";
  document.getElementById("horaEnvio_r").value = r.horaAvisoProp || "";

  document.getElementById("mensaje_r").value = r.mensaje || "";

  document.getElementById("enviarWA_btn").dataset.recId = r._id;


  mostrarPantalla("pantallaVerRecordatorio");
}










// cambiar fecha -> abre prompt simple o usar un input en UI
async function cambiarFechaRecordatorio(recId, nuevaFechaIso, nuevoDiasAntesVet = 2, nuevoDiasAntesProp = 0) {
  const paciente = obtenerPacienteActivo();
  if (!paciente) return mostrarBurbuja("No hay paciente activo");

  const body = {
    fechaEvento: nuevaFechaIso,
    diasAntesVet: nuevoDiasAntesVet,
    diasAntesProp: nuevoDiasAntesProp
  };

  const res = await fetch(
    `https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/recordatorios/${recId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    const e = await res.json().catch(() => ({ message: "Error servidor" }));
    return mostrarBurbuja(`❌ ${e.message}`);
  }

  mostrarBurbuja("Fecha cambiada ✅");
  cargarRecordatorios(paciente._id);
}


// eliminar recordatorio
async function eliminarRecordatorio(recId) {
  const paciente = obtenerPacienteActivo();
  if (!paciente) return;

  const res = await fetch(
    `https://petstherapy-backend.onrender.com/api/pacientes/${paciente._id}/recordatorios/${recId}`,
    { method: "DELETE" }
  );

  if (!res.ok) return mostrarBurbuja("No se pudo eliminar");

  mostrarBurbuja("Recordatorio eliminado");
  cargarRecordatorios(paciente._id);
}


// enviar WhatsApp al propietario (abre wa.me)
function enviarWhatsAppPropietario(rec) {
const paciente = obtenerPacienteActivo();
  if (!paciente || !paciente.propietario) return mostrarBurbuja("No hay teléfono del propietario");

  const numero = (paciente.propietario.telefono || "").replace(/\D/g, "");
  if (!numero) return mostrarBurbuja("Teléfono inválido");

  const texto =
    `Hola 👋, te recuerda PetsTherapy:\n` +
    `Evento: ${rec.tipo} · ${rec.descripcion || ""}\n` +
    `Paciente: ${paciente.nombre}\n` +
    `Fecha evento: ${rec.fechaEvento ? (new Date(rec.fechaEvento)).toISOString().split("T")[0] : ""}\n` +
    `Hora: ${rec.horaEvento || ""}\n\n` +
    `${rec.notas || ""}`;

  window.open(`https://wa.me/57${numero}?text=${encodeURIComponent(texto)}`, "_blank");
}




// revisión global (se ejecuta al cargar la app)
// - si hoy == fechaAvisoVet && !enviadoVet => notifica a la vet (UI) y marca enviadoVet = true
// - si hoy == fechaAvisoProp && vetConfirmado && !enviadoProp => abre WA al propietario y marca enviadoProp = true
// 🌟 Notificaciones seguras 2 días antes del evento
// function revisarRecordatoriosSeguros() {
//   if (Notification.permission !== "granted") return;

//   const hoy = new Date();
//   hoy.setHours(0, 0, 0, 0);

//   recordatoriosGlobales.forEach(async rec => {

//     if (!rec.fechaAvisoVet) return;
//     if (rec.enviadoVet) return;

//     const fechaAviso = new Date(rec.fechaAvisoVet);
//     fechaAviso.setHours(0, 0, 0, 0);

//     const fechaEvento = new Date(rec.fechaEvento);
//     fechaEvento.setHours(0, 0, 0, 0);

//     // ❌ Evento vencido → jamás notificar
//     if (fechaEvento < hoy) return;

//     // ❌ Aún no es el día del aviso
//     if (fechaAviso.getTime() !== hoy.getTime()) return;

//     const reg = await navigator.serviceWorker.ready;
//     reg.showNotification("🐾 Recordatorio PetsTherapy", {
//       body: `${rec.tipo} de ${rec.nombrePaciente} en 2 días`,
//       icon: "icon-192.png",
//       vibrate: [200, 100, 200]
//     });

//     // ⚠️ SOLO en memoria (MVP)
//     rec.enviadoVet = true;
//   });
// }










function fechaISOHoy() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return hoy.toISOString().split("T")[0];
}








// listeners para botones dentro de pantallaVerRecordatorio (debe existir en DOM)
document.addEventListener("DOMContentLoaded", () => {
  // revisar al cargar

    const cambiarBtn = document.getElementById("cambiarFecha_btn");
  if (cambiarBtn) cambiarBtn.addEventListener("click", async (ev) => {
    const recId = ev.target.dataset.recId;
    if (!recId) return;
    // prompt simple (recomendado: reemplazar por date input modal)
    const nueva = prompt("Nueva fecha (YYYY-MM-DD):");
    if (!nueva) return;
    await cambiarFechaRecordatorio(recId, nueva, 2, 0);
  });

  const enviarBtn = document.getElementById("enviarWA_btn");
  if (enviarBtn) enviarBtn.addEventListener("click", (ev) => {
    const recId = ev.target.dataset.recId;
    if (!recId) return;
const paciente = obtenerPacienteActivo();
const rec = recordatoriosGlobales.find(x => x._id === recId);
    if (!rec) return mostrarBurbuja("No encontrado");
    enviarWhatsAppPropietario(rec);
  });
});



async function actualizarPacientesLocal() {
  try {
const paciente = obtenerPacienteActivo();
    if (paciente?._id) {
      const res = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes/id/${paciente._id}`);
      if (res.ok) {
        const actualizado = await res.json();
      }
    }

    const resTodos = await fetch(`https://petstherapy-backend.onrender.com/api/pacientes`);

    if (resTodos.ok) {
      const todos = await resTodos.json();
    }
  } catch (e) { console.error(e); }
}


async function inicializarApp() {
  try {
    const res = await fetch('https://petstherapy-backend.onrender.com/api/pacientes');
    if (!res.ok) throw new Error("No se pudieron cargar pacientes");
    const pacientes = await res.json();

    // Si hay paciente seleccionado, actualízalo
    if(pacientes.length > 0) {
    }
  } catch (e) {
    console.error("Error inicializando app:", e);
  }

  iniciarPushFCM();


//   setTimeout(async () => {
//   const paciente = obtenerPacienteActivo();
//   if (!paciente?._id) return;

//   await cargarRecordatorios(paciente._id); // 👈 carga primero
//   revisarRecordatoriosSeguros();            // 👈 luego revisa
// }, 3000);


}


// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {

//     // ✅ Registrar Service Worker
//     navigator.serviceWorker
//       .register("sw.js")
//       .then(() => console.log("✅ Service Worker registrado"))
//       .catch((err) => console.error("❌ Error SW:", err));

//       pedirPermisoNotificaciones();

//   });
// }


async function pedirPermisoNotificaciones() {
  if (!("Notification" in window)) {
    console.warn("Este navegador no soporta notificaciones");
    return;
  }

  const permiso = await Notification.requestPermission();
  console.log("Permiso de notificación:", permiso);
}





// function programarNotificacionPrueba(titulo, mensaje, fecha, hora) {
//   console.log("🧪 Programando notificación de prueba...");

//   const fechaNoti = construirFecha(fecha, hora);
//   if (!fechaNoti) return;

//   const delay = fechaNoti.getTime() - Date.now();
//   console.log("⏰ Delay notificación (ms):", delay);

//   if (delay <= 0) {
//     console.log("⚠️ Fecha ya pasada");
//     return;
//   }

//   setTimeout(() => {
//     navigator.serviceWorker.ready.then(registro => {
//       registro.showNotification(titulo, {
//         body: mensaje,
//         icon: "icon-192.png",
//         badge: "icon-192.png",
//         vibrate: [200, 100, 200],
//         tag: "petstherapy-recordatorio"
//       });
//     });
//   }, delay);
// }




function construirFecha(fecha, hora) {
  if (!fecha) return null;
  if (!hora) return null; // 👈 NO inventar horas

  const fechaStr = typeof fecha === "string"
    ? fecha.split("T")[0]
    : new Date(fecha).toISOString().split("T")[0];

  return new Date(`${fechaStr}T${hora}:00`);
}





window.notificacionPruebaReal = function () {
  console.log("🧪 Lanzando notificación de prueba inmediata");

  navigator.serviceWorker.ready.then(registro => {
    registro.showNotification("🐾 PetsTherapy", {
      body: "Esta es una notificación de prueba inmediata",
      icon: "icon-192.png",
      badge: "icon-192.png",
      vibrate: [200, 100, 200]
    });
  });
};


function estadoRecordatorio(r) {
  if (r.vetConfirmado && r.enviadoProp) return "confirmado";
  if (r.enviadoVet) return "pendiente";
  return "nuevo";
}
function limpiarFormularioRecordatorio() {
  document.getElementById("tipoEvento").value = "";
  document.getElementById("fechaEvento").value = "";
  document.getElementById("horaEvento").value = "";
  document.getElementById("fechaEnvio").value = "";
  document.getElementById("horaEnvio").value = "";
  document.getElementById("mensaje").value = "";
}


async function registrarTokenPush(token) {
  await fetch("https://petstherapy-backend.onrender.com/api/push/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });
}




async function iniciarPushFCM() {
  if (!Capacitor.isNativePlatform()) {
    console.log("No es plataforma nativa, FCM no aplica");
    return;
  }

  const { PushNotifications } = Capacitor.Plugins;


  const perm = await PushNotifications.requestPermissions();
  console.log("Permisos FCM:", perm);

  if (perm.receive !== 'granted') {
    alert("Permiso de notificaciones denegado");
    return;
  }

  await PushNotifications.register();

  PushNotifications.addListener('registration', token => {
    console.log('🔥 TOKEN FCM:', token.value);
    alert("TOKEN FCM:\n" + token.value);

    // opcional: enviarlo al backend
    registrarTokenPush(token.value);
  });

  PushNotifications.addListener('registrationError', err => {
    console.error('❌ Error registro FCM:', err);
    alert("Error FCM: " + JSON.stringify(err));
  });

  PushNotifications.addListener('pushNotificationReceived', notification => {
    alert(
      "🔔 Notificación recibida\n\n" +
      notification.title + "\n" +
      notification.body
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarApp();
});






let historialPantallas = [];
let pantallaActual = null;

function mostrarPantalla(id) {
  if (pantallaActual) {
    historialPantallas.push(pantallaActual);
  }

  document.querySelectorAll('.pantalla').forEach(p =>
    p.classList.remove('activa')
  );

  const nueva = document.getElementById(id);
  if (nueva) {
    nueva.classList.add('activa');
    pantallaActual = id;
  }
}

function mostrarPantallaSinGuardar(id) {
  document.querySelectorAll('.pantalla').forEach(p =>
    p.classList.remove('activa')
  );

  const nueva = document.getElementById(id);
  if (nueva) {
    nueva.classList.add('activa');
    pantallaActual = id;
  }
}

/* 🔴 ESTO ES LO QUE FALTABA TODA ESTA VEZ */
App.addListener('backButton', (event) => {
  event.preventDefault(); // ⬅️ ESTA LÍNEA BLOQUEA EL CIERRE

  if (historialPantallas.length > 0) {
    const anterior = historialPantallas.pop();
    mostrarPantallaSinGuardar(anterior);
  }
});




const isNative = !!window.Capacitor?.isNativePlatform?.();

if (isNative) {
  console.log("Ejecutando en APK (Capacitor)");

  const App = window.Capacitor.Plugins.App;
  const PushNotifications = window.Capacitor.Plugins.PushNotifications;

  // aquí va tu lógica nativa
}


const razas = {
  perro: [
    "Mestizo",
    "Affenpinscher",
    "Airedale Terrier",
    "Akita Americano",
    "Akita Inu",
    "Alaskan Malamute",
    "American Staffordshire Terrier",
    "Antiguo perro de muestra danés",
    "Azawakh",
    "Azul de Gascuña",
    "Basenji",
    "Basset artesiano de Normandía",
    "Basset de los Alpes",
    "Basset Hound",
    "Basset leonado de Bretaña",
    "Beagle",
    "Beagle-Harrier",
    "Beauceron",
    "Bedlington Terrier",
    "Bergamasco",
    "Bichón boloñés",
    "Bichón frisé",
    "Bichón Habanero",
    "Bichón maltés",
    "Billy",
    "Black and Tan Coonhound",
    "Bobtail",
    "Boerboel",
    "Border collie",
    "Border Terrier",
    "Borzoi",
    "Boston terrier",
    "Boxador",
    "Bóxer",
    "Perro de Montaña Appenzell",
    "Bernes de la montaña",
    "Perro de montaña Entlebuch",
    "Boyero de Flandes",
    "Boyero de las Ardenas",
    "Braco alemán",
    "Braco alemán de pelo corto",
    "Braco alemán de pelo duro",
    "Braco austriaco negro y fuego",
    "Braco de Ariège",
    "Braco de Auvernia",
    "Braco de Borbón",
    "Braco de Weimar",
    "Braco eslovaco de pelo duro",
    "Braco francés",
    "Braco húngaro",
    "Braco Italiano",
    "Braco Saint-Germain",
    "Briquet grifón vendeano",
    "Broholmer",
    "Buhund noruego",
    "Bull Terrier",
    "Bulldog Americano",
    "Bulldog francés",
    "Bulldog inglés",
    "Bullmastiff",
    "Cairn Terrier",
    "Cane Corso",
    "Caniche",
    "Cavachón",
    "Cavalier King Charles Spaniel",
    "Cavapoo",
    "Cazador de alces noruego",
    "Chi-Chi",
    "Chihuahua",
    "Chow Chow",
    "Cirneco del Etna",
    "Clumber Spaniel",
    "Cobrador de pelo liso",
    "Cobrador de pelo rizado",
    "Cockapoo",
    "Cocker Spaniel americano",
    "Cocker Spaniel inglés",
    "Collie barbudo",
    "Collie de pelo corto",
    "Collie de pelo largo",
    "Corgie",
    "Cotón de Tulear",
    "Crestado chino",
    "Crestado rodesiano",
    "Cursinu",
    "Dálmata",
    "Dandie Dinmont",
    "Dóberman",
    "Dogo argentino",
    "Dogo de Burdeos",
    "Dogo del Tíbet",
    "Dogo mallorquín",
    "Drever",
    "Eurasier",
    "Field Spaniel",
    "Fila Brasileiro",
    "Fila de San Miguel",
    "Fox Terrier",
    "Foxhound americano",
    "Foxhound inglés",
    "Galgo afgano",
    "Galgo español",
    "Galgo inglés",
    "Galgo italiano",
    "Galgo polaco",
    "Gascon saintongeois",
    "Golden Retriever",
    "Gordon Setter",
    "Gran basset grifón vendeano",
    "Gran boyero suizo",
    "Gran Danés",
    "Gran grifón vendeano",
    "Gran Munsterlander",
    "Gran sabueso anglo-francés blanco y naranja",
    "Gran sabueso anglo-francés blanco y negro",
    "Gran sabueso anglo-francés tricolor",
    "Grifón de Bruselas",
    "Grifón de muestra de pelo duro",
    "Grifón bohemio de muestra de pelo duro",
    "Grifón leonado de Bretaña",
    "Grifón Nivernais",
    "Harrier",
    "Havapoo",
    "Hokkaido",
    "Hovawart",
    "Husky siberiano",
    "Jack chi",
    "Jack Russell Terrier",
    "Jämthund",
    "Kai",
    "Kelpie australiano",
    "Kerry Blue Terrier",
    "King Charles Spaniel",
    "Kishu",
    "Komondor",
    "Kromfohrländer",
    "Kuvasz",
    "Labrador Retriever",
    "Labrottie",
    "Lagotto Romagnolo",
    "Laika de Siberia occidental",
    "Laika de Siberia oriental",
    "Laika de Yakutia",
    "Laika ruso europeo",
    "Lakeland Terrier",
    "Lancashire heeler",
    "Landseer",
    "Lebrel escocés",
    "Lebrel húngaro",
    "Lebrel irlandés",
    "Leonberger",
    "Lhasa Apso",
    "Lundehund",
    "Lurcher",
    "Manchester Terrier",
    "Mastín del Pirineo",
    "Mastín español",
    "Mastín inglés",
    "Mastín napolitano",
    "Morkie",
    "Mudi",
    "Münsterländer pequeño",
    "Otterhound",
    "Papillón",
    "Pastor alemán",
    "Pastor belga",
    "Pastor Blanco Suizo",
    "Pastor de Anatolia",
    "Pastor de Bosnia-Herzegovina y Croacia",
    "Pastor de Brie",
    "Pastor de Karst",
    "Pastor de las islas Shetland",
    "Pastor de los Pirineos",
    "Pastor de Maremma",
    "Pastor de Picardía",
    "Pastor de Tatra",
    "Pastor del Cáucaso",
    "Pastor eslovaco",
    "Pastor finlandés de Laponia",
    "Pastor ganadero australiano",
    "Pastor holandés",
    "Pastor islandés",
    "Pastor lapón de Suecia",
    "Pastor mallorquín",
    "Pastor ovejero australiano",
    "Pastor polaco de las llanuras",
    "Pastor rumano de Mioritza",
    "Pastor ucraniano",
    "Pastor Yugoslavo",
    "Pekinés",
    "Pequeño Basset Grifón vendeano",
    "Pequeño Brabantino",
    "Pequeño perro león",
    "Pequeño perro ruso",
    "Pequeño sabueso de Suiza",
    "Perdiguero alemán",
    "Perdiguero de Burgos",
    "Perdiguero de Drente",
    "Perdiguero frisón",
    "Perdiguero portugués",
    "Perro de agua americano",
    "Perro de agua español",
    "Perro de agua francés",
    "Perro de agua frisón",
    "Perro de agua irlandés",
    "Perro de agua portugués",
    "Perro de Canaán",
    "Perro de Castro Laboreiro",
    "Perro de caza polaco",
    "Perro de Chindo",
    "Perro de Groenlandia",
    "Perro de la Sierra de la Estrela",
    "Perro de montaña de Formosa",
    "Perro de montaña de los Pirineos",
    "Perro de Montaña del Atlas",
    "Perro de muestra alemán de pelo cerdoso",
    "Perro de muestra alemán de pelo duro",
    "Perro de osos de Carelia",
    "Perro de San Huberto",
    "Perro esquimal canadiense",
    "Perro Finlandés de Laponia",
    "Perro lobo checoslovaco",
    "Perro lobo de Saarloos",
    "Perro pastor catalán",
    "Perro pastor croata",
    "Perro pastor de Asia central",
    "Perro pastor portugués",
    "Perro sin pelo del Perú",
    "Perro tejonero de Westfalia",
    "Pharaoh Hound",
    "Pinscher",
    "Pinscher austríaco",
    "Pitbull",
    "Podenco canario",
    "Podenco ibicenco",
    "Podenco portugués",
    "Pointer inglés",
    "Poitevino",
    "Pomchi",
    "Pomerania",
    "Porcelana",
    "Presa Canario",
    "Pudelpointer",
    "Pug",
    "Puli",
    "Pumi",
    "Rafeiro do Alentejo",
    "Rat Terrier",
    "Ratonero holandés",
    "Retriever de Chesapeake",
    "Retriever de Nueva Escocia",
    "Ridgeback tailandés",
    "Rottsky",
    "Rottweiler",
    "Sabueso anglo-francés de tamaño mediano",
    "Sabueso artesiano",
    "Sabueso bávaro de montaña",
    "Sabueso de Bosnia de pelo cerdoso",
    "Sabueso de Hamilton",
    "Sabueso de Hannover",
    "Sabueso de Hygen",
    "Sabueso de Istria de pelo corto",
    "Sabueso de Istria de pelo duro",
    "Sabueso de montaña de Montenegro",
    "Sabueso de Schiller",
    "Sabueso de Småland",
    "Sabueso del Ariège",
    "Sabueso del Tirol",
    "Sabueso del Valle de Save",
    "Sabueso eslovaco",
    "Sabueso español",
    "Sabueso estirio de pelo áspero",
    "Sabueso finlandés",
    "Sabueso francés blanco y naranja",
    "Sabueso francés blanco y negro",
    "Sabueso francés tricolor",
    "Sabueso Halden",
    "Sabueso helénico",
    "Sabueso italiano",
    "Sabueso polaco",
    "Sabueso serbio",
    "Sabueso suizo",
    "Sabueso tricolor serbio",
    "Saluki",
    "Samoyedo",
    "San Bernardo",
    "Schapendoes neerlandés",
    "Schipperke",
    "Schnauzer",
    "Sealyham terrier",
    "Setter inglés",
    "Setter irlandés",
    "Setter irlandés rojo y blanco",
    "Shar Pei",
    "Shiba Inu",
    "Shih Tzu",
    "Shikoku Inu",
    "Skye Terrier",
    "Sloughi",
    "Spaniel azul de Picardía",
    "Spaniel bretón",
    "Spaniel de Pont-Audemer",
    "Spaniel francés",
    "Spaniel holandés",
    "Spaniel japonés",
    "Spaniel picardo",
    "Spaniel tibetano",
    "Spinone italiano",
    "Spitz de Norrbotten",
    "Spitz finlandés",
    "Spitz japonés",
    "Spitz lobo",
    "Springer spaniel galés",
    "Springer Spaniel inglés",
    "Staffador",
    "Staffordshire bull terrier",
    "Sussex Spaniel",
    "Teckel",
    "Terranova",
    "Terrier alemán",
    "Terrier australiano",
    "Terrier brasileño",
    "Terrier checo",
    "Terrier de Norwich",
    "Terrier escocés",
    "Terrier galés",
    "Terrier Glen de Imaal irlandés",
    "Terrier inglés miniatura",
    "Terrier irlandés",
    "Terrier irlandés de pelo suave",
    "Terrier japonés",
    "Terrier ruso negro",
    "Terrier tibetano",
    "Tosa Inu",
    "Vallhund sueco",
    "Vizsla",
    "Volpino italiano",
    "Westie",
    "Whippet",
    "Xoloitzcuintle",
    "Yorkshire Terrier",
    ],
  gato: [
    "Mestizo",
    "Abisinio",
    "American Shorthair",
    "American Wirehair",
    "Angora turco",
    "Azul ruso",
    "Balinés",
    "Bengala",
    "Birmano",
    "Bobtail Americano",
    "Bobtail japonés",
    "Bombay",
    "Bosque de Noruega",
    "British Longhair",
    "British Shorthair",
    "Burmilla",
    "California Spangled",
    "Californian Rex",
    "Cartujo",
    "Ceilán",
    "Chausie",
    "Cornish Rex",
    "Curl americano",
    "Cymric",
    "Devon Rex",
    "Esfinge",
    "Persa de pelo corto",
    "Gato común",
    "Gato común europeo",
    "Gato esfinge",
    "Gato Siberiano",
    "Gato Van turco",
    "Rex alemán",
    "Habana Brown",
    "Highland Fold y Highland Straight",
    "Himalayo",
    "Javanés",
    "Khao Manee",
    "Korat",
    "LaPerm",
    "Maine Coon",
    "Manx",
    "Mau egipcio",
    "Munchkin",
    "Nebelung",
    "Ocicat",
    "Oriental",
    "Persa",
    "Persa Chinchilla",
    "Peterbald",
    "Pixie Bob",
    "Ragamuffin",
    "Ragdoll",
    "Safari",
    "Sagrado de Birmania",
    "Savannah",
    "Scottish Fold",
    "Selkirk Rex",
    "Siamés",
    "Siamés thai",
    "Singapura",
    "Snowshoe",
    "Sokoke",
    "Somalí",
    "Tiffany",
    "Tonkinés",
    "Toyger",
    "York Chocolate",  
  ]
};


const especieSelect = document.getElementById("especie");
const razaSelect = document.getElementById("raza");

especieSelect.addEventListener("change", () => {
  const especie = especieSelect.value;

  // Limpiar razas
  razaSelect.innerHTML = '<option value="">Seleccione raza</option>';

  if (!especie) return;

  razas[especie].forEach(raza => {
    const option = document.createElement("option");
    option.value = raza;
    option.textContent = raza;
    razaSelect.appendChild(option);
  });
});
