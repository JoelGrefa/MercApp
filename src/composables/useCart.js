// src/composables/useCart.js
import { ref, computed, watch } from 'vue'

const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

watch(
  cart,
  (value) => {
    localStorage.setItem('cart', JSON.stringify(value))
  },
  { deep: true }
)

export function useCart() {
  const totalPrice = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  // 👉 ahora acepta cantidad (por defecto 1)
  const addToCart = (product, qty = 1) => {
    const quantity = Math.max(1, Number(qty) || 1)

    const existing = cart.value.find((p) => p.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.value.push({ ...product, quantity })
    }
  }

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter((p) => p.id !== productId)
  }

  const clearCart = () => {
    cart.value = []
  }

  const increment = (productId) => {
    const item = cart.value.find((p) => p.id === productId)
    if (item) item.quantity++
  }

  const decrement = (productId) => {
    const item = cart.value.find((p) => p.id === productId)
    if (!item) return
    if (item.quantity > 1) item.quantity--
    else removeFromCart(productId)
  }

  return {
    cart,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    increment,
    decrement,
  }
}
