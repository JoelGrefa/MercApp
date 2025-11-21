<template>
  <div class="category">
    <h1>Productos en la categoría: {{ currentCategoryLabel }}</h1>

    <!-- Filtros -->
    <div class="filters">
      <input
        v-model="searchQuery"
        class="search"
        type="text"
        placeholder="Buscar por nombre o descripción..."
      />

      <select v-model="selectedCategory" class="select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ formatCategory(cat) }}
        </option>
      </select>
    </div>

    <!-- Lista visible -->
    <div class="products">
      <div
        v-for="product in visibleProducts"
        :key="product.id"
        class="product-card"
      >
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="product-image clickable"
          @click="goToDetail(product)"
        />

        <h3 class="product-title clickable" @click="goToDetail(product)">
          {{ product.name }}
        </h3>

        <p class="desc">{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>

        <div class="button-row">
          <button class="btn-add" @click="addProduct(product)">
            Añadir al carrito
          </button>
          <button class="btn-buy" @click="buyNow(product)">
            Comprar ahora
          </button>
        </div>
      </div>

      <p v-if="!visibleProducts.length">
        No se encontraron productos con esos filtros.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products'
import { useCart } from '../composables/useCart'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

const searchQuery = ref('')
const selectedCategory = ref(route.params.category || '')

// actualizar cuando cambie /category/:category
watch(
  () => route.params.category,
  (newCategory) => {
    selectedCategory.value = newCategory || ''
  }
)

// categorías únicas
const categories = computed(() => {
  const set = new Set(products.map((p) => p.category))
  return Array.from(set)
})

// lista visible filtrada
const visibleProducts = computed(() => {
  const term = searchQuery.value.trim().toLowerCase()

  return products.filter((p) => {
    const matchesCategory =
      !selectedCategory.value || p.category === selectedCategory.value

    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)

    return matchesCategory && matchesSearch
  })
})

const goToDetail = (product) => {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

const addProduct = (product) => {
  addToCart(product)
}

// 👉 añade y lleva al carrito
const buyNow = (product) => {
  addToCart(product)
  router.push('/cart')
}

const formatCategory = (cat) =>
  cat.charAt(0).toUpperCase() + cat.slice(1)

const currentCategoryLabel = computed(() =>
  selectedCategory.value ? formatCategory(selectedCategory.value) : 'Todas'
)
</script>

<style scoped>
.category {
  text-align: center;
}

/* Filtros */
.filters {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search,
.select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-width: 220px;
}

/* Grid de productos */
.products {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Tarjeta con animación tipo zoom */
.product-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 18px;
  border: 1px solid #eee;
  width: 260px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-6px) scale(1.02);
}

.product-image {
  max-width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.06);
}

.product-title {
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
}

.desc {
  color: #777;
  font-size: 0.9rem;
  min-height: 40px;
}

.price {
  font-weight: bold;
  margin: 10px 0;
}

/* fila de botones */
.button-row {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}

.btn-add,
.btn-buy {
  flex: 1;
  padding: 8px 10px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
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

.clickable {
  cursor: pointer;
}
</style>
