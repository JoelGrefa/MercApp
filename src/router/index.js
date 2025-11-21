import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const Categories = () => import('../views/Categories.vue')
const Cart = () => import('../views/Cart.vue')
const About = () => import('../views/About.vue')
const ProductDetail = () => import('../views/ProductDetail.vue')
const Checkout = () => import('../views/Checkout.vue')

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/category/:category', name: 'category', component: Categories, props: true },
  { path: '/product/:id', name: 'product-detail', component: ProductDetail, props: true },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/checkout', name: 'checkout', component: Checkout },
  { path: '/about', name: 'about', component: About },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
