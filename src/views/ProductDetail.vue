<template>
  <div v-if="product" class="detail">
    <img :src="product.imageUrl" :alt="product.name" class="detail-image" />

    <div class="detail-info">
      <h1>{{ product.name }}</h1>

      <p class="category">
        Categoría: <strong>{{ formatCategory(product.category) }}</strong>
      </p>

      <p class="price">${{ product.price }}</p>

      <p class="desc">
        {{ product.description }}
      </p>

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
        <button class="btn-add" @click="addProduct">
          Añadir al carrito
        </button>
        <button class="btn-buy" @click="buyNow">
          Comprar ahora
        </button>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Producto no encontrado.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '../data/products'
import { useCart } from '../composables/useCart'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

// producto según el id de la ruta
const product = computed(() => getProductById(route.params.id))

// cantidad seleccionada
const quantity = ref(1)

const incrementQty = () => {
  quantity.value++
}

const decrementQty = () => {
  if (quantity.value > 1) quantity.value--
}

// solo agrega al carrito con la cantidad elegida
const addProduct = () => {
  if (!product.value) return
  addToCart(product.value, quantity.value)
}

// agrega y te lleva al carrito (luego puedes "PROCEDER CON EL PAGO")
const buyNow = () => {
  if (!product.value) return
  addToCart(product.value, quantity.value)
  router.push('/cart')
}

const formatCategory = (cat) =>
  cat.charAt(0).toUpperCase() + cat.slice(1)
</script>

<style scoped>
.detail {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}

.detail-image {
  max-width: 350px;
  border-radius: 10px;
}

.detail-info {
  max-width: 400px;
  text-align: left;
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

/* Cantidad */
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

.not-found {
  text-align: center;
}
</style>
