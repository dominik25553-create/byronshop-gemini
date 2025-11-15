import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Catálogo de prueba
const productos = [
  { nombre: "Paquete Web Pro", descripcion: "Sitios web profesionales adaptados a tu negocio.", precio: 1356.00, categoria: "Web" },
  { nombre: "Aplicaciones Innovadoras", descripcion: "Apps innovadoras para startups y negocios digitales.", precio: 111.87, categoria: "Aplicaciones" },
  { nombre: "Productos Digitales", descripcion: "Soluciones digitales para tus necesidades online.", precio: 111.87, categoria: "Digital" },
  { nombre: "Servicios Digitales", descripcion: "Servicios digitales para mejorar tu presencia online.", precio: 111.87, categoria: "Digital" }
];

// Endpoint del asistente
app.post("/api/asistente", async (req, res) => {
  const userMessage = req.body.message;

  // Prompt para Gemini
  const systemPrompt = `
Eres el Asistente de Compras profesional y corporativo de ByronShop.
Tu función es recomendar paquetes de servicios según la necesidad, presupuesto y atributos del cliente.
Catálogo disponible: 
- Paquete Web Pro: $1356.00, Web
- Aplicaciones Innovadoras: $111.87, Aplicaciones
- Productos Digitales: $111.87, Digital
- Servicios Digitales: $111.87, Digital
Responde con recomendaciones claras y concisas, siempre de forma profesional y corporativa.
`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      // Respuesta de prueba si no hay API Key
      let reply = "Aquí tienes algunas recomendaciones según tu necesidad: ";
      if (userMessage.toLowerCase().includes("web")) {
        reply += "Paquete Web Pro sería ideal para ti.";
      } else if (userMessage.toLowerCase().includes("app")) {
        reply += "Aplicaciones Innovadoras encajan con tu proyecto.";
      } else {
        reply += "Productos Digitales o Servicios Digitales podrían servirte.";
      }
      return res.json({ reply, used: "mock" });
    }

    // Llamada a Gemini si hay API Key
    const response = await fetch("https://generativeai.googleapis.com/v1beta2/models/gemini-1.5-pro:generateMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.[0]?.text || "Lo siento, no pude generar una recomendación.";
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error al comunicarse con Gemini." });
  }
});

// 🔹 Servir archivos estáticos (widget.js)
app.use(express.static(__dirname)); // cualquier archivo en la raíz, incluido widget.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Gemini activo en puerto ${PORT}`));
