// widget.js - Asistente de Compras ByronShop (burbuja gris elegante)
(function() {
  // Esperar a que el DOM cargue
  document.addEventListener("DOMContentLoaded", function() {

    // Crear burbuja
    const burbuja = document.createElement("div");
    burbuja.id = "asistente-burbuja";
    burbuja.innerHTML = `
      <div class="cabecera">
        <div class="dot"></div>
        Asistente de Compras ByronShop
      </div>
      <div class="cuerpo" id="chat-burbuja">
        <div class="msg-asistente">Hola — soy el Asistente de Compras ByronShop. Dime qué necesitas (presupuesto, tipo de servicio o necesidad).</div>
      </div>
      <div class="entrada">
        <input id="input-burbuja" type="text" placeholder="Ej: Busco un sitio web profesional, presupuesto $500..." aria-label="Escribe tu consulta">
        <button id="btn-burbuja">Enviar</button>
      </div>
    `;
    document.body.appendChild(burbuja);

    // Estilos CSS
    const style = document.createElement("style");
    style.innerHTML = `
      #asistente-burbuja { position: fixed; bottom:22px; right:22px; width:340px; max-width:calc(100%-40px); background:#f4f5f7; border-radius:14px; box-shadow:0 6px 24px rgba(0,0,0,0.18); font-family: "Helvetica Neue", Arial, sans-serif; z-index:99999; overflow:hidden; border:1px solid #e0e0e0; }
      #asistente-burbuja .cabecera { background:#d9dbe0; padding:12px 14px; color:#222; font-weight:700; font-size:15px; display:flex; align-items:center; gap:10px; }
      #asistente-burbuja .cabecera .dot { width:10px; height:10px; border-radius:50%; background:#7a7d82; }
      #asistente-burbuja .cuerpo { padding:10px; height:260px; overflow-y:auto; font-size:14px; color:#222; background:white; }
      #asistente-burbuja .entrada { border-top:1px solid #e6e6e6; display:flex; align-items:center; gap:8px; padding:8px; background:#f4f5f7; }
      #asistente-burbuja input[type="text"]{ flex:1; border:none; outline:none; padding:8px 10px; font-size:14px; background:transparent; }
      #asistente-burbuja button { background:#7a7d82; color:white; border:none; padding:8px 10px; border-radius:8px; cursor:pointer; font-weight:600; }
      #asistente-burbuja .msg-usuario { color:#333; margin-bottom:8px; }
      #asistente-burbuja .msg-asistente { color:#0b3b56; margin-bottom:12px; font-weight:500; }
      @media (max-width:480px){ #asistente-burbuja { width:88%; right:6%; bottom:12px; } #asistente-burbuja .cuerpo { height:180px; } }
    `;
    document.head.appendChild(style);

    // Funciones para agregar mensajes
    const chat = document.getElementById("chat-burbuja");
    const input = document.getElementById("input-burbuja");
    const btn = document.getElementById("btn-burbuja");

    function appendUser(text) {
      const d = document.createElement("div");
      d.className = "msg-usuario";
      d.innerHTML = `<b>Tú:</b> ${escapeHtml(text)}`;
      chat.appendChild(d);
      chat.scrollTop = chat.scrollHeight;
    }

    function appendAssistant(text) {
      const d = document.createElement("div");
      d.className = "msg-asistente";
      d.innerHTML = `<b>Asistente:</b> ${text}`;
      chat.appendChild(d);
      chat.scrollTop = chat.scrollHeight;
    }

    function escapeHtml(unsafe) {
      return unsafe.replace(/[&<"']/g, function(m) {
        return ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', "'": '&#039;' })[m];
      });
    }

    // Enviar mensaje al backend
    async function sendMessage(text){
      appendUser(text);
      appendAssistant("Consultando...", "#666");

      try {
        const res = await fetch("https://byronshop-gemini.onrender.com/api/asistente", { // <- reemplaza si tu URL cambia
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        const reply = data?.reply || "Lo siento, no hay respuesta disponible.";
        if(data?.used === "mock"){
          appendAssistant(reply + "<br><small><i>(Respuesta simulada — añade la API key en Render para usar Gemini real)</i></small>");
        } else {
          appendAssistant(reply);
        }
      } catch(err){
        appendAssistant("Error de conexión con el servidor. Inténtalo de nuevo más tarde.");
        console.error(err);
      }
    }

    // Eventos
    btn.addEventListener("click", () => { const v=input.value.trim(); if(!v) return; sendMessage(v); input.value=""; });
    input.addEventListener("keypress", (e) => { if(e.key==="Enter"){ e.preventDefault(); btn.click(); } });

  });
})();
