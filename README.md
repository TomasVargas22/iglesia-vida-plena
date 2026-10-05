# Comunidad Cristiana Vida Plena ✝️

Sitio web oficial de la **Comunidad Cristiana Vida Plena**, perteneciente a las **Asambleas de Dios en Costa Rica** (Tres Ríos, Cartago).

Diseñado con un enfoque de **Desarrollo Editorial Artesanal**, balance tipográfico, micro-interacciones fluidas y arquitectura **Mobile-First**.

---

## 🌟 Características Principales

* **Sistema de Diseño "Editorial Sanctuary"**:
  * Paleta cálida inspirada en papelería fina (`surface: #fbf9f6`, `primary: #0c1b33`, `secondary: #904d00` / `#fe932c`).
  * Combinación tipográfica de alto impacto con *Newsreader* (serif editorial) y *Hanken Grotesk* (sans geométrica).
  * Efectos de vidrio esmerilado (*glassmorphism*) y bordes táctiles.
* **Adaptación Mobile-First Integral**:
  * Menú lateral (*drawer*) táctil optimizado para navegación con una sola mano.
  * Barra de acciones inferior flotante (*Thumb Zone Action Bar*) para acceso rápido a GPS y WhatsApp.
  * Prevención de auto-zoom en Safari para iOS (`font-size >= 16px` en inputs) y soporte para `env(safe-area-inset-bottom)`.
* **Micro-interacciones y Lógica Reactiva**:
  * **Contadores Regresivos en Vivo**: Cálculo automático en tiempo real para el próximo Culto Dominical (10:00 AM) y "La Reu" de Jóvenes (Sábados 4:00 PM).
  * **SINPE Móvil Interactivo**: Copiado automático del número oficial al portapapeles con notificación toast.
  * **Formulario Pastoral**: Generador dinámico de peticiones de oración con enlace directo a WhatsApp.
  * **Accesos GPS directos**: Botones dedicados para abrir la ruta en **Waze** y **Google Maps**.
  * **Animaciones de Scroll**: Integración con biblioteca AOS para apariciones escalonadas sin sobrecargar el hilo principal del navegador.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 Semántico**: Estructura limpia y accesible.
* **Tailwind CSS**: Estilizado utility-first optimizado.
* **Vanilla JavaScript (ES6+)**: Lógica modular, pura y sin frameworks pesados.
* **AOS (Animate On Scroll)**: Micro-animaciones al desplazarse por la página.
* **Google Fonts**: Newsreader & Hanken Grotesk.
* **Google Material Symbols**: Iconografía moderna.

---

## 📁 Estructura del Proyecto

```
├── images/
│   ├── hero.jpg             # Fotografía principal del Hero
│   ├── faith_journey.jpg    # Fotografía de fondo para el banner de testimonio
│   └── church_hero.jpg      # Fotografía de fachada de las instalaciones
├── index.html               # Estructura y maquetación semántica del sitio
├── styles.css               # Estilos personalizados, keyframes y reglas responsive
├── app.js                   # Lógica interactiva del cliente (contadores, menús, WhatsApp)
├── .gitignore               # Archivos y carpetas excluidos del control de versiones
└── README.md                # Documentación del proyecto
```

---

## 🚀 Cómo Visualizar el Proyecto Localmente

No requiere pasos de compilación ni dependencias complejas de Node:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TomasVargas22/iglesia-vida-plena.git
   cd iglesia-vida-plena
   ```
2. Abre `index.html` en tu navegador favorito, o sírvelo con cualquier servidor estático local:
   ```bash
   # Opción 1: Python
   python -m http.server 3000

   # Opción 2: Node.js (npx serve)
   npx serve .
   ```
3. Accede a `http://localhost:3000` en tu navegador.

---

## 👤 Desarrollado por

**Tomás Vargas (Kaxfv)**  
*Desarrollador Web · San José, Costa Rica*
