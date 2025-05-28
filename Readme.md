# 🚀 Sistema de Gestión de Inventario

[![GitHub Stars](https://img.shields.io/github/stars/tu-usuario/sistema-gestion-inventario?style=social )](https://github.com/tu-usuario/sistema-gestion-inventario )  
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue.svg )](https://opensource.org/licenses/MIT )

---

## 📦 Descripción del Proyecto

Este **Sistema de Gestión de Inventario** nace de la necesidad de optimizar y digitalizar los procesos de control de almacenes en empresas. Es una herramienta moderna que integra diferentes aspectos del negocio, desde el control de inventario hasta la gestión financiera básica, todo en una sola plataforma intuitiva y fácil de usar.

El sistema está diseñado para facilitar la toma de decisiones basada en datos, mejorando la eficiencia operativa y reduciendo errores humanos. ¡Es ideal para pequeñas y medianas empresas que buscan digitalizar sus procesos!

---

## 🌟 Características Principales

- **Gestión completa de almacenes y productos**
- **Control de categorías** para organizar el inventario de manera eficiente
- **Administración de proveedores y clientes**
- **Sistema de compras** con seguimiento detallado
- **Gestión de cuentas y finanzas básicas**
- **Reportes avanzados** con visualización de datos mediante gráficos interactivos
- **Panel de logística** con métricas clave para monitorear el rendimiento
- **Interfaz moderna, intuitiva y responsive**

---

## 📝 Captura de Pantalla

Aquí tienes una vista previa de cómo luce la interfaz del sistema:

![Captura de Pantalla](./doc/imgs/login-muestra.png)

> **Nota:** Esta es una versión preliminar del diseño. ¡Pronto se agregarán más funcionalidades y mejoras visuales!

---

## 📊 Funcionalidades Destacadas

Entre las funcionalidades más destacadas se encuentran:

- **Balance de gastos mensuales**: Analiza tus gastos de forma clara y precisa.
- **Compras por período y proveedor**: Identifica patrones de compra y optimiza tus relaciones con proveedores.
- **Productos más comprados**: Descubre qué productos son los más populares.
- **Distribución de productos por almacén**: Mantén el control de tus inventarios en múltiples ubicaciones.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías:

- **Backend**: [Laravel](https://laravel.com/ ) con una arquitectura limpia siguiendo principios SOLID.
- **Frontend**: [React](https://reactjs.org/ ) + [TypeScript](https://www.typescriptlang.org/ ) para un código mantenible y seguro.
- **Puente Backend-Frontend**: [Inertia.js](https://inertiajs.com/ ) para conectar Laravel y React de manera fluida.
- **UI/UX**: Diseño moderno e intuitivo con componentes reutilizables.
- **Gráficos**: Visualización interactiva de datos mediante bibliotecas como [Chart.js](https://www.chartjs.org/ ) o [Recharts](https://recharts.org/ ).

---

## 🚀 Instalación y Configuración

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/PushoDev/sistema-gestion-inventario.git 
   cd sistema-gestion-inventario
   npm install
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan db:seed

   user: tests@example.com
   password: password

