// --------------------
// ASISTENTE BYRONSHOP (SIMULACIÓN SIN API)
// --------------------

(function () {
    // Crear el contenedor flotante
    const widget = document.createElement("div");
    widget.id = "byronshop-assistant";
    widget.innerHTML = `
        <style>
            #byronshop-assistant {
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
            #bsa-header {
                background: #002b5c;
                color: white;
                padding: 12px;
                font-weight: bold;
                text-align: center;
                border-radius: 12px 12px 0 0;
            }
            #bsa-messages {
                flex: 1;
                padding: 10px;
                overflow-y: auto;
                font-size: 14px;
            }
            #bsa-input-section {
                display: flex;
                border-top: 1px solid #ccc;
            }
            #bsa-input {
                flex: 1;
                border: none;
                padding: 10px;
                font-size: 14px;
                outline: none;
            }
            #bsa-send {
                width: 70px;
                background: #002b5c;
                color: white;
                border: none;
                cursor: pointer;
            }
        </style>

        <div id="bsa-header">Asistente ByronShop</div>
        <div id="bsa-messages"></div>
        <div id="bsa-input-section">
            <input id="bsa-input" placeholder="Escribe tu consulta..." />
            <button id="bsa-send">Enviar</button>
        </div>
    `;

    document.body.appendChild(widget);

    // Función para agregar mensajes
    function addMessage(sender, text) {
        const msgBox = document.getElementById("bsa-messages");
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

        const productos = {
            web: {
                nombre: "Paquete Web Pro",
                precio: 1356,
                desc: "Desarrollo web profesional, ideal para empresas que buscan presencia sólida."
            },
            apps: {
                nombre: "Aplicaciones Innovadoras",
                precio: 111.87,
                desc: "Apps dinámicas y modernas para emprendimientos digitales."
            },
            prod: {
                nombre: "Productos Digitales",
                precio: 111.87,
                desc: "Soluciones digitales listas para usar."
            },
            serv: {
                nombre: "Servicios Digitales",
                precio: 111.87,
                desc: "Servicios especializados para optimizar tu presencia digital."
            }
        };

        // Por necesidades clave
        if (mensajeMin.includes("web") || mensajeMin.includes("página") || mensajeMin.includes("sitio")) {
            return `
Recomendación profesional:

Con base en tu necesidad orientada al desarrollo web, el paquete ideal es el **Paquete Web Pro ($1356.00)**.  
Incluye una solución profesional y escalable diseñada para negocios que necesitan presencia digital sólida.
            `;
        }

        if (mensajeMin.includes("app") || mensajeMin.includes("aplicación") || mensajeMin.includes("movil")) {
            return `
Recomendación profesional:

Considerando tu interés en soluciones móviles o de software, te sugiero **Aplicaciones Innovadoras ($111.87)**.  
Es un paquete diseñado para proyectos ágiles y modernos.
            `;
        }

        // Por presupuesto
        if (mensajeMin.includes("barato") || mensajeMin.includes("económico") || mensajeMin.includes("presupuesto") || mensajeMin.includes("111")) {
            return `
Recomendación profesional:

Según tu presupuesto, las opciones más adecuadas son:

• **Aplicaciones Innovadoras — $111.87**  
• **Productos Digitales — $111.87**  
• **Servicios Digitales — $111.87**

Son alternativas accesibles que mantienen un enfoque corporativo y funcional.
            `;
        }

        // Genérica profesional
        return `
Gracias por tu consulta.

Para poder brindarte una recomendación precisa y corporativa, por favor indícame:

• Tu necesidad principal  
• El presupuesto disponible  
• El tipo de solución que buscas  

Estaré encantado de orientarte con la mejor propuesta de ByronShop.
        `;
    }

    // --------------------
    // EVENTO DE ENVÍO
    // --------------------

    document.getElementById("bsa-send").addEventListener("click", () => {
        const input = document.getElementById("bsa-input");
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


