<script setup>
defineProps({
  nombreTienda: { type: String, required: true },
  anio: { type: Number, required: true },
  contacto: { type: String, default: '' },
})
</script>

<template>
  <footer class="pie">
    <div class="contenedor pie__interno">
      <p class="pie__marca">{{ nombreTienda }}</p>
      <p v-if="contacto">{{ contacto }}</p>
      <p class="pie__legal">© {{ anio }} {{ nombreTienda }}. Todos los derechos reservados. Precios en COP, IVA no incluido en el catálogo.</p>
    </div>
  </footer>
</template>

<style scoped>
.pie { margin-top: 4rem; background: #070709; border-top: 1px solid var(--oro); padding-block: 2rem; color: var(--gris); }
.pie__interno { display: grid; gap: 0.4rem; text-align: center; }
.pie__marca { font-family: var(--fuente-titulo); font-size: 1.3rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--oro-claro); }
.pie__legal { font-size: 0.8rem; }
</style>
