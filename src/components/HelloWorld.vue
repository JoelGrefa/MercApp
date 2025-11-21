<script setup>
import { ref } from 'vue'

// Definir la propiedad 'msg' que se pasará desde el componente padre
defineProps({
  msg: String,
})

// Declarar una propiedad reactiva 'count' que se utilizará para el contador
const count = ref(0)
</script>

<template>
  <!-- Mostrar el mensaje pasado como propiedad 'msg' -->
  <h1>{{ msg }}</h1>

  <div class="card">
    <!-- Botón para incrementar el contador -->
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <!-- Enlace a la documentación de Vue -->
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
