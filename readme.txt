# 🎱 PingoGood - Plataforma de Bingo Online

PingoGood es una solución integral de Bingo Digital diseñada para eventos en vivo y virtuales. Combina una interfaz de usuario intuitiva con un robusto panel de administración vinculado a Google Sheets para la gestión de datos en tiempo real.

## 🚀 Características Principales

### 👤 Experiencia del Usuario (Jugador)
* **Personalización:** Los usuarios pueden ingresar su nombre y seleccionar la cantidad de cartillas deseadas.
* **Pasarela de Pago Manual:** Integración visual con Yape; tras el pago, el usuario envía su comprobante y código por WhatsApp para validación.
* **Generación Dinámica:** Sistema de creación de cartillas únicas descargables en formato digital.

### 🔐 Panel Administrativo (Gestión Total)
* **Seguridad:** Acceso restringido mediante clave de administrador y tokens de sesión temporales.
* **Control de Partida:** * Modo **Manual**: El admin marca los números cantados físicamente.
    * Modo **Automático**: El sistema genera y canta los números aleatoriamente con animaciones.
* **Verificador de Ganadores:** Consulta instantánea mediante código de cartilla. El sistema cruza los números marcados con la matriz de la cartilla en la base de datos (Google Sheets).
* **Visualización en Tiempo Real:** Renderizado visual de la cartilla consultada para confirmar patrones (Línea, Diagonal, etc.).

## 🛠️ Stack Tecnológico
* **Frontend:** HTML5, CSS3 (Diseño Responsivo), JavaScript Moderno.
* **Backend:** Google Apps Script (GAS).
* **Base de Datos:** Google Sheets (Persistencia de datos y auditoría).
* **Seguridad:** CacheService para manejo de sesiones y validación de tokens.