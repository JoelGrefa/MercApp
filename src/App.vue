<template>
  <div id="app">
    <!-- Navbar -->
    <Navbar />

    <!-- Renderizar las vistas aquí -->
    <main>
      <router-view /> <!-- Aquí se mostrarán las vistas -->
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
/* Aplicar la fuente globalmente */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f7fb; /* Fondo suave para todo el sitio */
}

#app {
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Mejorar el fondo y el espaciado */
main {
  flex-grow: 1;
  background-color: #ffffff; /* Fondo blanco para el contenido */
  margin: 40px 20px; /* Mejor espaciado */
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}

/* Fondo suave para el footer */
footer {
  margin-top: 20px;
  padding: 20px 0;
  background-color: #333; /* Fondo oscuro para el pie de página */
  color: white;
  font-size: 0.9em;
  text-align: center;
}

/* Mejorar los enlaces */
a {
  text-decoration: none;
  color: inherit;
}

/* Añadir una transición suave para los enlaces */
a:hover {
  color: #42b883; /* Cambiar a verde cuando pase el mouse */
  transition: color 0.3s ease;
}

/* Navbar: mejorar el fondo y la separación de los elementos */
.navbar {
  padding: 15px 30px;
  background-color: #42b883;
  color: white;
  font-size: 1.2em;
}

.navbar .links a {
  margin: 0 15px;
  font-weight: bold;
}

.navbar .links a:hover {
  color: #fff;
  text-decoration: underline;
}
</style>
