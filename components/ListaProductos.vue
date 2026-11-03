<script setup>
import ProductoCard from './ProductoCard.vue'

defineProps({
  productos: { type: Array, required: true },
})

const emit = defineEmits(['agregar-producto'])
</script>

<template>
  <section aria-labelledby="titulo-catalogo">
    <h2 id="titulo-catalogo" class="titulo-seccion">Catálogo</h2>
    <div v-if="productos.length" class="rejilla">
      <ProductoCard
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
        @agregar-al-carrito="emit('agregar-producto', $event)"
      />
    </div>
    <p v-else class="vacio">No encontramos motos que coincidan con tu búsqueda.</p>
  </section>
</template>

<style scoped>
.rejilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
</style>
