<template>
  <div class="cart">
    <h2>Carrito</h2>

    <div v-if="!cart.length" class="empty">
      No hay productos en el carrito
    </div>

    <div v-else class="cart-content">
      <div class="items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.imageUrl" :alt="item.name" class="item-image" />

          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="subtitle">Producto de MercApp</p>

            <div class="qty-price">
              <div class="qty-controls">
                <button @click="decrement(item.id)">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="increment(item.id)">+</button>
              </div>
              <span class="line-total">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </span>
            </div>

            <button class="remove-btn" @click="removeFromCart(item.id)">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div class="summary">
        <div class="row">
          <span>Subtotal</span>
          <span>${{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="row">
          <span>Total</span>
          <span class="total">${{ totalPrice.toFixed(2) }}</span>
        </div>
        <p class="note">Tasas y envíos calculados en el checkout.</p>

        <button class="checkout-btn" @click="goToCheckout">
          PROCEDER CON EL PAGO
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { cart, totalPrice, removeFromCart, increment, decrement } = useCart()

const goToCheckout = () => {
  router.push('/checkout')
}
</script>

<style scoped>
.cart {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
  text-align: left;
}

.empty {
  text-align: center;
  color: #666;
}

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: flex;
  gap: 15px;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.item-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
}

.item-info {
  flex: 1;
}

.subtitle {
  font-size: 0.85rem;
  color: #777;
}

.qty-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-controls button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
}

.line-total {
  font-weight: 600;
}

.remove-btn {
  border: none;
  background: transparent;
  color: #d9534f;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
}

.summary {
  margin-top: 10px;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(90deg, #4ca8ff, #42b883);
  color: white;
}

.summary .row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.summary .total {
  font-weight: 700;
  font-size: 1.1rem;
}

.note {
  font-size: 0.8rem;
  margin-top: 4px;
}

.checkout-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 999px;
  background: white;
  color: #1c6ddf;
  font-weight: 700;
  cursor: pointer;
}
</style>
