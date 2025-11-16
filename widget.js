// --------------------
// ASISTENTE OMEGASV (SIMULACIÓN SIN API)
// --------------------

(function () {
    // Crear contenedor flotante
    const widget = document.createElement("div");
    widget.id = "omegasv-assistant";
    widget.innerHTML = `
        <style>
            #omegasv-assistant {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 340px;
                height: 460px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 14px rgba(0,0,0,0.2);
                display: flex;
                flex-direction: column;
                font-family: Arial, sans-serif;
                z-index: 99999;
            }
            #os-header {
                background: #002b5c;
                color: white;
                padding: 12px;
                font-weight: bold;
                text-align: center;
                border-radius: 12px 12px 0 0;
            }
            #os-messages {
                flex: 1;
                padding: 10px;
                overflow-y: auto;
                font-size: 14px;
            }
            #os-input-section {
                display: flex;
                border-top: 1px solid #ccc;
            }
            #os-input {
                flex: 1;
                border: none;
                padding: 10px;
                font-size: 14px;
                outline: none;
            }
            #os-send {
                width: 70px;
                background: #002b5c;
                color: white;
                border: none;
                cursor: pointer;
            }
        </style>

        <div id="os-header">Asistente OmegaSV</div>
        <div id="os-messages"></div>
        <div id="os-input-section">
            <input id="os-input" placeholder="Escribe tu consulta..." />
            <button id="os-send">Enviar</button>
        </div>
    `;

    document.body.appendChild(widget);

    // Función para agregar mensajes
    function addMessage(sender, text) {
        const msgBox = document.getElementById("os-messages");
        const bubble = document.createElement("div");
        bubble.style.margin = "8px 0";

        if (sender === "user") {
            bubble.style.textAlign = "right";
            bubble.innerHTML = `<div style="display:inline-block;padding:8px 12px;background:#e3e3e3;border-radius:10px;">${text}</div>`;
        } else {
            bubble.style.textAlign = "left";
            bubble.innerHTML = `<div style="display:inline-block;padding:8px 12px;background:#002b5c;color:white;border-radius:10px;">${text}</div>`;
        }

        msgBox.appendChild(bubble);
        msgBox.scrollTop = msgBox.scrollHeight;
    }

    // --------------------
    // SIMULADOR DE RESPUESTAS PROFESIONALES
    // --------------------

    function generarRespuestaSimulada(mensaje) {
        const mensajeMin = mensaje.toLowerCase();

        // Catálogo
        const productos = {
            web: {
                nombre: "Paquete Web Pro",
                precio: 1356.00,
                desc: "Sitios web profesionales adaptados a tu negocio."
            },
            apps: {
                nombre: "Aplicaciones Innovadoras",
                precio: 111.87,
                desc: "Apps innovadoras para startups y negocios digitales."
            },
            prod: {
                nombre: "Productos Digitales",
                precio: 111.87,
                desc: "Soluciones digitales listas para usar."
            },
            serv: {
                nombre: "Servicios Digitales",
                precio: 111.87,
                desc: "Servicios digitales para mejorar tu presencia online."
            }
        };

        // Recomendar según necesidad
        if (mensajeMin.includes("web") || mensajeMin.includes("sitio") || mensajeMin.includes("página")) {
            return `
Recomendación profesional:

Con base en tu necesidad de desarrollo web, el paquete ideal es **${productos.web.nombre} ($${productos.web.precio})**.  
${productos.web.desc}
            `;
        }

        if (mensajeMin.includes("app") || mensajeMin.includes("aplicación") || mensajeMin.includes("móvil")) {
            return `
Recomendación profesional:

Considerando tu interés en aplicaciones, sugerimos **${productos.apps.nombre} ($${productos.apps.precio})**.  
${productos.apps.desc}
            `;
        }

        // Presupuesto limitado
        if (mensajeMin.includes("barato") || mensajeMin.includes("económico") || mensajeMin.includes("presupuesto") || mensajeMin.includes("111")) {
            return `
Recomendación profesional:

Según tu presupuesto, las opciones más adecuadas son:

• **${productos.apps.nombre} — $${productos.apps.precio}**  
• **${productos.prod.nombre} — $${productos.prod.precio}**  
• **${productos.serv.nombre} — $${productos.serv.precio}**

Todas mantienen un enfoque corporativo y profesional.
            `;
        }

        // Respuesta genérica
        return `
Gracias por tu consulta.

Para ofrecer la mejor recomendación profesional de OmegaSV, por favor indica:

• Tu necesidad principal  
• Presupuesto aproximado  
• Tipo de solución deseada

Estaré encantado de orientarte con la propuesta más adecuada.
        `;
    }

    // --------------------
    // EVENTO DE ENVÍO
    // --------------------

    document.getElementById("os-send").addEventListener("click", () => {
        const input = document.getElementById("os-input");
        const texto = input.value.trim();
        if (!texto) return;

        addMessage("user", texto);

        const respuesta = generarRespuestaSimulada(texto);

        setTimeout(() => {
            addMessage("bot", respuesta);
        }, 600);

        input.value = "";
    });
})();
