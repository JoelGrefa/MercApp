<template>
  <div class="home">
    <!-- Sección de bienvenida -->
    <div class="welcome-section">
      <h1>Bienvenido a MercApp</h1>
      <p>Encuentra lo que buscas: productos de calidad para todos los gustos.</p>

      <!-- Buscador principal -->
      <input
        v-model="searchQuery"
        class="search-bar"
        type="text"
        placeholder="Buscar productos..."
      />
    </div>

    <!-- Tarjetas de categorías -->
    <div class="categories">
      <router-link to="/category/ropa" class="category-card">
        <img src="../assets/ropa.jpg" alt="Ropa" class="category-image" />
        <h3>Ropa</h3>
      </router-link>
      <router-link to="/category/computadoras" class="category-card">
        <img
          src="../assets/computadoras.jpg"
          alt="Computadoras"
          class="category-image"
        />
        <h3>Computadoras</h3>
      </router-link>
      <router-link to="/category/accesorios" class="category-card">
        <img
          src="../assets/accesorios.jpg"
          alt="Accesorios"
          class="category-image"
        />
        <h3>Accesorios</h3>
      </router-link>
    </div>

    <!-- Filtro por categoría para la lista -->
    <div class="filters">
      <label>
        Categoría:
        <select v-model="selectedCategory">
          <option value="">Todas</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ formatCategory(cat) }}
          </option>
        </select>
      </label>
    </div>

    <!-- Lista visible (filtrada) de productos -->
    <h2>Productos</h2>
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

        <h3 class="clickable" @click="goToDetail(product)">
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../data/products'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { addToCart } = useCart()

const searchQuery = ref('')
const selectedCategory = ref('')

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

// solo añade al carrito
const addProduct = (product) => {
  addToCart(product)
}

// añade y lleva al carrito
const buyNow = (product) => {
  addToCart(product)
  router.push('/cart')
}

const formatCategory = (cat) =>
  cat.charAt(0).toUpperCase() + cat.slice(1)
</script>

<style scoped>
.home {
  text-align: center;
}

/* Sección de bienvenida */
.welcome-section {
  color: #333;
  text-align: center;
  padding: 60px 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: #fff;
}

.welcome-section h1 {
  font-size: 3em;
  margin-bottom: 20px;
  font-weight: 600;
}

.welcome-section p {
  font-size: 1.2em;
  margin-bottom: 30px;
  font-weight: 400;
}

/* Barra de búsqueda */
.search-bar {
  padding: 12px;
  width: 60%;
  font-size: 1.1em;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
}

.search-bar:focus {
  border-color: #42b883;
}

/* Categorías */
.categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
  justify-items: center;
  margin-bottom: 20px;
}

.category-card {
  background-color: #fff;
  color: #333;
  padding: 20px;
  border-radius: 12px;
  text-decoration: none;
  text-align: center;
  min-width: 230px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eee;
}

.category-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.category-card h3 {
  font-size: 1.5em;
  margin-top: 10px;
  font-weight: 600;
}

.category-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

/* Filtros */
.filters {
  margin: 30px 0 10px;
  display: flex;
  justify-content: center;
}

.filters select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* Productos */
.products {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.product-card {
  background: #fff;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #eee;
  width: 240px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.product-card:hover .product-image {
  transform: scale(1.06);
}

.desc {
  font-size: 0.9rem;
  color: #666;
  min-height: 32px;
}

.price {
  font-weight: bold;
  margin: 8px 0;
}

/* ===== Botones  ===== */

.button-row {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 8px;
}

.btn-add,
.btn-buy {
  position: relative;
  flex: 1;
  padding: 7px 8px;        /* ← más pequeño */
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.78rem;      /* ← letra más chica */
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16);
}

/* brillo animado */
.btn-add::before,
.btn-buy::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  transform: skewX(-20deg);
  transition: left 0.4s ease;
}

.btn-add:hover::before,
.btn-buy:hover::before {
  left: 130%;
}

/* hover general */
.btn-add:hover,
.btn-buy:hover {
  transform: translateY(-1px) scale(1.01);
  filter: brightness(1.05);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.22);
}

/* "Añadir al carrito" */
.btn-add {
  background: linear-gradient(135deg, #00b894, #00d6a1);
  color: #fff;
}

/* "Comprar ahora" */
.btn-buy {
  background: linear-gradient(135deg, #ff9f1a, #ff7b00);
  color: #fff;
}

.clickable {
  cursor: pointer;
}

/* Responsivo */
@media (max-width: 768px) {
  .categories {
    grid-template-columns: 1fr 1fr;
  }

  .search-bar {
    width: 80%;
  }
}

@media (max-width: 480px) {
  .categories {
    grid-template-columns: 1fr;
  }
}
</style>
