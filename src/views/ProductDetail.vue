<template>
  <div v-if="product" class="detail">
    <!-- Información del producto -->
    <div class="product-info">
      <img :src="product.imageUrl" :alt="product.name" class="detail-image" />
      <h1>{{ product.name }}</h1>
      <p class="category">
        Categoría: <strong>{{ formatCategory(product.category) }}</strong>
      </p>
      <p class="price">${{ product.price }}</p>
      <p class="desc">{{ product.description }}</p>

      <!-- Selector de cantidad -->
      <div class="qty-wrapper">
        <span>Cantidad:</span>
        <div class="qty-controls">
          <button @click="decrementQty">−</button>
          <span>{{ quantity }}</span>
          <button @click="incrementQty">+</button>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="button-row">
        <button class="btn-add" @click="addProduct">Añadir al carrito</button>
        <button class="btn-buy" @click="buyNow">Comprar ahora</button>
      </div>
    </div>

    <!-- Formulario para agregar reseñas -->
    <div class="review-section">
      <ReviewForm @new-review="addNewReview" />
    </div>

    <!-- Mostrar las reseñas (debajo del formulario) -->
    <div class="reviews">
      <h3>Reseñas</h3>
      <div v-if="reviews.length > 0">
        <div v-for="(review, index) in reviews" :key="index" class="review">
          <!-- Estrellas -->
          <div class="rating">
            <span v-for="n in review.rating" :key="n" class="star">★</span>
            <span v-for="n in (5 - review.rating)" :key="n" class="star-empty">★</span>
          </div>

          <!-- Comentario y Fecha -->
          <p><strong>Comentario:</strong> {{ review.comment }}</p>
          <p><small>{{ review.date }}</small></p>

          <!-- Botón para eliminar reseña -->
          <button class="btn-delete" @click="deleteReview(index)">Eliminar reseña</button>
        </div>
      </div>
      <div v-else>
        <p>Aún no hay reseñas para este producto.</p>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Producto no encontrado.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '../data/products'
import { useCart } from '../composables/useCart'
import ReviewForm from '../components/ReviewForm.vue'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

// Producto según el id de la ruta
const product = computed(() => getProductById(route.params.id))

// Cantidad seleccionada
const quantity = ref(1)

const incrementQty = () => {
  quantity.value++
}

const decrementQty = () => {
  if (quantity.value > 1) quantity.value--
}

// Añadir al carrito
const addProduct = () => {
  if (!product.value) return
  addToCart(product.value, quantity.value)
}

// Comprar ahora
const buyNow = () => {
  if (!product.value) return
  addToCart(product.value, quantity.value)
  router.push('/cart')
}

// Usar reactive para las reseñas
const reviews = ref([])

// Obtener las reseñas desde localStorage al cargar el producto
onMounted(() => {
  const storedReviews = JSON.parse(localStorage.getItem('reviews')) || []
  reviews.value = storedReviews.filter(review => review.productId === product.value.id) // Filtramos por producto
})

// Agregar una nueva reseña a las existentes
const addNewReview = (newReview) => {
  newReview.productId = product.value.id
  reviews.value.push(newReview) // Agregar la reseña a la lista reactiva
  localStorage.setItem('reviews', JSON.stringify(reviews.value)) // Guardamos las reseñas actualizadas en localStorage
}

// Eliminar una reseña
const deleteReview = (index) => {
  reviews.value.splice(index, 1) // Eliminar la reseña en el índice indicado
  localStorage.setItem('reviews', JSON.stringify(reviews.value)) // Guardar las reseñas actualizadas
}

// Formatear la categoría
const formatCategory = (cat) => cat.charAt(0).toUpperCase() + cat.slice(1)
</script>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.product-info {
  max-width: 400px;
  text-align: left;
}

.detail-image {
  max-width: 350px;
  border-radius: 10px;
}

.price {
  font-size: 1.7em;
  font-weight: bold;
  margin: 10px 0;
}

.category {
  color: #777;
  margin-bottom: 5px;
}

.desc {
  margin-bottom: 15px;
  line-height: 1.5;
}

/* Selector de cantidad */
.qty-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0 18px;
}

.qty-controls {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 999px;
  background: #f5f5f5;
}

.qty-controls button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #ffffff;
  cursor: pointer;
  font-size: 1rem;
}

.qty-controls span {
  min-width: 24px;
  text-align: center;
}

/* Botones */
.button-row {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-add,
.btn-buy {
  flex: 1;
  padding: 10px 14px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
}

.btn-add {
  background-color: #42b883;
  color: #fff;
}

.btn-add:hover {
  background-color: #369f6f;
}

.btn-buy {
  background-color: #ff9900;
  color: #fff;
}

.btn-buy:hover {
  background-color: #e68a00;
}

/* Sección de reseñas */
.reviews {
  margin-top: 30px;
  width: 100%;
  text-align: left;
}

.review {
  background-color: #f0f0f0;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rating {
  color: gold;
}

.star {
  font-size: 1.5em;
}

.star-empty {
  font-size: 1.5em;
  color: #ddd;
}

.btn-delete {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 10px;
}

.btn-delete:hover {
  background-color: #e64a4a;
}

.review-section {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.not-found {
  text-align: center;
}
</style>
