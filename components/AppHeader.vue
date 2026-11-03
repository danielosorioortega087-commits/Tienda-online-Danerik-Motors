<script setup>
defineProps({
  nombreTienda: { type: String, required: true },
  cantidadItems: { type: Number, default: 0 },
})

const emit = defineEmits(['ver-carrito', 'buscar'])
</script>

<template>
  <header class="encabezado">
    <div class="encabezado__interno contenedor">
      <a class="marca" href="#" @click.prevent>
        <img class="marca__logo" src="/logo-danerik.jpeg" alt="Logotipo de Danerik Motors" />
        
      </a>

      <label class="buscador">
        <span class="visualmente-oculto">Buscar motos</span>
        <input type="search" placeholder="Buscar moto, cilindraje, estilo…" @input="emit('buscar', $event.target.value)" />
      </label>

      <button class="carrito-btn" type="button" :aria-label="`Ver carrito, ${cantidadItems} unidades`" @click="emit('ver-carrito')">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="10" cy="20" r="1.5" fill="currentColor" />
          <circle cx="17" cy="20" r="1.5" fill="currentColor" />
        </svg>
        <span class="carrito-btn__contador">{{ cantidadItems }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.encabezado {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(11, 11, 13, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--borde);
}
.encabezado__interno {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-block: 0.75rem;
}
.marca {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--oro-claro);
}
.marca__logo { width: 132px; height: 76px; flex: none; object-fit: contain; }
.marca__nombre {
  font-family: var(--fuente-titulo);
  font-size: 1.2rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}
.buscador { flex: 1; min-width: 0; }
.buscador input {
  width: 100%;
  padding: 0.65rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--borde);
  background: var(--panel);
  color: var(--texto);
  font: inherit;
}
.buscador input:focus { outline: 2px solid var(--oro); outline-offset: 1px; }
.carrito-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid var(--oro);
  background: transparent;
  color: var(--oro-claro);
  cursor: pointer;
  transition: background 0.2s;
}
.carrito-btn:hover { background: rgba(201, 162, 75, 0.15); }
.carrito-btn__contador {
  position: absolute;
  top: -9px;
  right: -9px;
  min-width: 22px;
  height: 22px;
  padding-inline: 5px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: var(--rojo);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
}
@media (max-width: 640px) {
  .encabezado__interno { flex-wrap: wrap; }
  .marca__nombre { font-size: 1.1rem; }
  .buscador { order: 3; flex-basis: 100%; }
  .carrito-btn { margin-left: auto; }
}
</style>
