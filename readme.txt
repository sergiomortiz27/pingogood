# 🎱 PingoGood - Manual de Licencia y Configuración

¡Gracias por adquirir PingoGood! Este paquete contiene el diseño y la lógica necesaria para operar tu propio Bingo Online.

## 📁 Contenido del Paquete
* `index.html` / `admin.html`: Estructura web y panel de control.
* `style.css` / `styleAdmin.css`: Diseño visual y adaptabilidad móvil.
* `admin.js`: Lógica de juego, validación de patrones y conexión API.
* `Codigo.gs`: Código fuente para Google Apps Script.

## 🛠️ Guía de Instalación Rápida
1. **Google Sheets:** Crea una hoja nueva llamada `cartillas`.
2. **Apps Script:** Desde la hoja, ve a "Extensiones" > "Apps Script" y pega el contenido de `Codigo.gs`.
3. **Despliegue:** Implementa como "Aplicación Web" (Acceso: Cualquier persona).
4. **Vinculación:** Copia la URL obtenida y pégala en la constante `API_URL` dentro de `admin.js`.
5. **Hosting:** Sube los archivos HTML/CSS/JS a tu servidor preferido (GitHub Pages, Vercel, Hostinger, etc.).

## ⚖️ Términos de Licencia y Propiedad Intelectual
Al adquirir este software, usted acepta los siguientes términos:
* **Uso Único:** Esta licencia otorga el derecho de uso para **una (1) sola plataforma/dominio web**.
* **Prohibición de Reventa:** Queda estrictamente prohibida la redistribución, sublicencia o reventa del código fuente, diseño o lógica a terceros.
* **Derechos de Autor:** La propiedad intelectual del diseño visual y la arquitectura del código pertenece exclusivamente al desarrollador original.
* **Uso Comercial:** Usted tiene derecho a lucrar con los eventos realizados dentro de su instancia instalada.