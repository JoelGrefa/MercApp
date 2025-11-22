MercApp - Sistema de Reseñas de Productos
¡Bienvenido a MercApp!

Una aplicación para gestionar productos, reseñas de usuarios y carrito de compras.
Permite agregar reseñas con calificación y comentarios, y guarda todo en localStorage.

🚀 Instalación
1. Clonar el Repositorio
git clone https://github.com/JoelGrefa/MercApp.git
cd MercApp

2. Instalar Dependencias
npm install

3. Ejecutar la Aplicación
npm run dev


¡Visita tu aplicación en http://localhost:5173!

🛠 Tecnologías Utilizadas

Vue 3: Framework para la creación de la interfaz.

localStorage: Persistencia de reseñas entre sesiones.

HTML/CSS: Diseño y estructura del proyecto.

💡 Características Principales

Catálogo de Productos: Visualiza y filtra productos.

Sistema de Reseñas: Agrega reseñas con calificación (1 a 5 estrellas) y comentarios.

Persistencia de Datos: Reseñas guardadas en localStorage, no se pierden con recargas.

Carrito de Compras: Añade productos al carrito y procede a la compra.

📂 Estructura del Proyecto
MercApp/
├── assets/            # Imágenes y recursos estáticos
├── components/        # Componentes reutilizables (Navbar, Footer, ReviewForm)
├── data/              # Datos de productos (puede conectarse a API)
├── views/             # Vistas principales (Home, ProductDetail)
├── App.vue            # Componente raíz
├── router/            # Configuración de rutas (Vue Router)
├── package.json       # Dependencias y scripts
└── README.md          # Este archivo

🛠 Cómo Contribuir

Haz un fork del repositorio.

Crea una nueva rama: git checkout -b mi-nueva-funcionalidad.

Realiza cambios y haz commit de tus mejoras.

Sube tus cambios y crea un pull request.