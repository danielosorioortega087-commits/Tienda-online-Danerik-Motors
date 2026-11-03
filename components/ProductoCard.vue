<script setup>
import { computed } from 'vue'
import { formatearCOP } from '../utils/moneda'
import { calcularValorConDescuento } from '../utils/precios'

const props = defineProps({
  producto: {
    type: Object,
    required: true,
    validator: (p) => ['id', 'imagen', 'descripcion', 'valor', 'descuento'].every((campo) => campo in p),
  },
})

const emit = defineEmits(['agregar-al-carrito'])

const valorConDescuento = computed(() => calcularValorConDescuento(props.producto))
const tieneDescuento = computed(() => props.producto.descuento > 0)
const nombre = computed(() => props.producto.descripcion.split(' — ')[0])
const caracteristicas = computed(() => props.producto.descripcion.split(' — ')[1] ?? '')
</script>

<template>
  <article class="tarjeta">
    <div class="tarjeta__imagen">
      <img :src="producto.imagen" :alt="nombre" loading="lazy" />
      <span v-if="tieneDescuento" class="etiqueta-descuento">-{{ producto.descuento }}%</span>
    </div>

    <div class="tarjeta__cuerpo">
      <h3 class="tarjeta__nombre">{{ nombre }}</h3>
      <p class="tarjeta__detalle">{{ caracteristicas }}</p>

      <div class="precios">
        <span v-if="tieneDescuento" class="precio-tachado">{{ formatearCOP(producto.valor) }}</span>
        <span class="precio-final">{{ formatearCOP(valorConDescuento) }}</span>
      </div>

      <button class="boton" type="button" @click="emit('agregar-al-carrito', producto)">
        Comprar
      </button>
    </div>
  </article>
</template>

<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--panel), var(--carbon));
  border: 1px solid var(--borde);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}
.tarjeta:hover {
  transform: translateY(-4px);
  border-color: var(--oro);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.55);
}
.tarjeta__imagen { position: relative; aspect-ratio: 3 / 2; background: #0b0b0d; }
.tarjeta__imagen img { width: 100%; height: 100%; object-fit: cover; display: block; }
.etiqueta-descuento {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: var(--rojo);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
.tarjeta__cuerpo { display: flex; flex-direction: column; gap: 0.6rem; padding: 1.1rem 1.2rem 1.3rem; flex: 1; }
.tarjeta__nombre { font-family: var(--fuente-titulo); font-size: 1.25rem; color: var(--oro-claro); font-weight: 600; }
.tarjeta__detalle { color: var(--gris); font-size: 0.9rem; line-height: 1.45; flex: 1; }
.precios { display: flex; flex-direction: column; min-height: 3.2rem; justify-content: flex-end; }
.precio-tachado { color: var(--gris); text-decoration: line-through; font-size: 0.9rem; }
.precio-final { font-size: 1.4rem; font-weight: 700; color: var(--texto); }
</style>
