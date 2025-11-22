<template>
  <div class="review-form">
    <h3>Deja tu reseña</h3>

    <!-- Selector de calificación con estrellas -->
    <div class="rating">
      <label for="rating">Calificación:</label>
      <select v-model="rating" id="rating" required>
        <option value="1">1 Estrella</option>
        <option value="2">2 Estrellas</option>
        <option value="3">3 Estrellas</option>
        <option value="4">4 Estrellas</option>
        <option value="5">5 Estrellas</option>
      </select>
    </div>

    <!-- Campo de comentario -->
    <div class="comment">
      <label for="comment">Comentario:</label>
      <textarea v-model="comment" id="comment" placeholder="Escribe tu comentario..." required></textarea>
    </div>

    <!-- Botón de envío -->
    <button @click="submitReview">Enviar reseña</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rating = ref(5)  // Valor inicial de calificación
const comment = ref('') // Comentario de la reseña

// Esta función se ejecutará cuando el usuario envíe su reseña
const submitReview = () => {
  if (!comment.value) {
    alert('Por favor, ingresa un comentario')
    return
  }

  const newReview = {
    rating: rating.value,
    comment: comment.value,
    date: new Date().toLocaleString(),
  }

  // Emitir la reseña hacia el componente padre para agregarla al listado de reseñas
  emit('new-review', newReview)

  // Limpiar los campos después de enviar la reseña
  comment.value = ''
  rating.value = 5
}
</script>

<style scoped>
.review-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 450px;
  width: 100%;
  margin-top: 20px;
}

h3 {
  font-size: 1.5em;
  margin-bottom: 15px;
  text-align: center;
}

.rating,
.comment {
  margin-bottom: 20px;
}

select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  padding: 12px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #369f6f;
}
</style>
