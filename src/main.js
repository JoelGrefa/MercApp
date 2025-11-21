import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el archivo de rutas

createApp(App)
  .use(router) // Usa Vue Router
  .mount('#app');
