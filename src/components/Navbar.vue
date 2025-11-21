<template>
  <nav class="navbar">
    <div class="logo">
      <h1>MercApp</h1>
    </div>
    <div class="links">
      <router-link to="/">Inicio</router-link>

      <router-link to="/cart" class="cart-link">
        Carrito
        <span v-if="cartCount" class="badge">{{ cartCount }}</span>
      </router-link>

      <router-link to="/about">Sobre Nosotros</router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '../composables/useCart'

const { cart } = useCart()

// cantidad total = suma de cantidades
const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #42b883;
  color: white;
  font-size: 1.2em;
}

.links {
  display: flex;
  gap: 30px;
}

.links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.links a:hover {
  color: #dfffea;
}

.cart-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ff4b4b;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>
