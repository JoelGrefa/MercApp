<template>
  <div class="checkout">
    <h2>Checkout</h2>

    <div v-if="!cart.length">
      <p>Tu carrito está vacío.</p>
    </div>

    <div v-else>
      <h3>Resumen de compra</h3>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} x {{ item.quantity }} —
          ${{ (item.price * item.quantity).toFixed(2) }}
        </li>
      </ul>

      <p class="total">Total: ${{ totalPrice.toFixed(2) }}</p>

      <h3>Datos del cliente</h3>
      <form @submit.prevent="pay">
        <input v-model="name" placeholder="Nombre completo" required />
        <input v-model="email" type="email" placeholder="Correo" required />
        <input v-model="address" placeholder="Dirección" required />

        <button type="submit">Confirmar pago</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { cart, totalPrice, clearCart } = useCart()

const name = ref('')
const email = ref('')
const address = ref('')

const pay = () => {
  alert(`Gracias por tu compra, ${name.value}! (pago simulado)`)
  clearCart()
  router.push('/')
}
</script>

<style scoped>
.checkout {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

ul {
  padding-left: 18px;
}

.total {
  font-weight: bold;
  margin-top: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #42b883;
  color: white;
  cursor: pointer;
}
</style>
