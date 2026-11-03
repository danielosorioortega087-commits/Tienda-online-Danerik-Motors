<script setup>
import { ref, computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import ListaProductos from '../components/ListaProductos.vue'
import CarritoCompra from '../components/CarritoCompra.vue'
import FacturaCompra from '../components/FacturaCompra.vue'
import AppFooter from '../components/AppFooter.vue'

const NOMBRE_TIENDA = 'Danerik Motors'
const img = (archivo) => `/img/${archivo}`

const productos = ref([
  { id: 1, imagen: img('stradale-v4.jpg'), descripcion: 'Stradale V4 Rosso Corsa — Superdeportiva V4 de 1.103 cc, 214 hp, quickshifter y control de tracción', valor: 189900000, descuento: 10 },
  { id: 2, imagen: img('fulmine-rr.jpg'), descripcion: 'Fulmine RR 1000 — Superbike de 999 cc, 205 hp, alerones aerodinámicos y suspensión electrónica', valor: 165000000, descuento: 0 },
  { id: 3, imagen: img('imperator-1800.jpg'), descripcion: 'Imperator 1800 Chrome — Crucero V-Twin de 1.800 cc, escapes cromados y asiento de cuero', valor: 142500000, descuento: 15 },
  { id: 4, imagen: img('bronzo-bobber.jpg'), descripcion: 'Bronzo Bobber 1200 — Bobber artesanal de 1.200 cc, acabado bronce y asiento solitario', valor: 98000000, descuento: 0 },
  { id: 5, imagen: img('furia-s.jpg'), descripcion: 'Furia S 1100 — Naked de 1.099 cc, 175 hp, chasis tubular y escape deportivo', valor: 112000000, descuento: 20 },
  { id: 6, imagen: img('lord-cafe.jpg'), descripcion: 'Lord Café Racer 900 — Café racer clásica de 900 cc, tanque verde inglés y detalles en oro', valor: 76900000, descuento: 12 },
  { id: 7, imagen: img('everest-gt.jpg'), descripcion: 'Everest GT Adventure — Trail de gran turismo de 1.250 cc, parabrisas alto y maletas laterales', valor: 134000000, descuento: 5 },
  { id: 8, imagen: img('gran-turismo.jpg'), descripcion: 'Gran Turismo DM LT — Touring de lujo 1.832 cc, carenado batwing, baúl y maletas integradas', valor: 178000000, descuento: 8 },
])

const carrito = ref([])
const mostrarCarrito = ref(false)
const mostrarFactura = ref(false)
const consecutivo = ref(1)
const numeroFactura = ref('')
const fechaFactura = ref('')
const busqueda = ref('')
const aviso = ref('')
let temporizadorAviso = null

const cantidadItems = computed(() =>
  carrito.value.reduce((total, item) => total + item.cantidad, 0),
)

const quitarTildes = (texto) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const productosFiltrados = computed(() => {
  const termino = quitarTildes(busqueda.value.trim())
  if (!termino) return productos.value
  return productos.value.filter((p) => quitarTildes(p.descripcion).includes(termino))
})

function mostrarAviso(texto) {
  aviso.value = texto
  clearTimeout(temporizadorAviso)
  temporizadorAviso = setTimeout(() => (aviso.value = ''), 2200)
}

function agregarProducto(producto) {
  const existente = carrito.value.find((item) => item.producto.id === producto.id)
  if (existente) {
    existente.cantidad++
  } else {
    carrito.value.push({ producto, cantidad: 1 })
  }
  mostrarAviso('Agregada al carrito: ' + producto.descripcion.split(' — ')[0])
}

function incrementar(id) {
  const item = carrito.value.find((i) => i.producto.id === id)
  if (item) item.cantidad++
}

function decrementar(id) {
  const item = carrito.value.find((i) => i.producto.id === id)
  if (item && item.cantidad > 1) item.cantidad--
}

function eliminar(id) {
  carrito.value = carrito.value.filter((i) => i.producto.id !== id)
}

function alternarCarrito() {
  if (mostrarFactura.value) return
  mostrarCarrito.value = !mostrarCarrito.value
}

function finalizarCompra() {
  if (carrito.value.length === 0) return
  numeroFactura.value = 'FV-' + String(consecutivo.value).padStart(6, '0')
  fechaFactura.value = new Date().toLocaleString('es-CO', { dateStyle: 'long', timeStyle: 'short' })
  mostrarFactura.value = true
}

function nuevaCompra() {
  carrito.value = []
  mostrarFactura.value = false
  mostrarCarrito.value = false
  consecutivo.value++
}
</script>

<template>
  <AppHeader
    :nombre-tienda="NOMBRE_TIENDA"
    :cantidad-items="cantidadItems"
    @ver-carrito="alternarCarrito"
    @buscar="busqueda = $event"
  />

  <main class="contenedor">
    <FacturaCompra
      v-if="mostrarFactura"
      :items="carrito"
      :numero-factura="numeroFactura"
      :fecha="fechaFactura"
      @nueva-compra="nuevaCompra"
    />

    <CarritoCompra
      v-else-if="mostrarCarrito"
      :items="carrito"
      @incrementar="incrementar"
      @decrementar="decrementar"
      @eliminar="eliminar"
      @finalizar-compra="finalizarCompra"
      @seguir-comprando="mostrarCarrito = false"
    />

    <template v-else>
      <section class="hero">
        <p class="hero__sobre">COLECCIÓN EXCLUSIVA</p>
        <h2 class="hero__titulo">Potencia, elegancia y libertad.</h2>
        <p class="hero__texto">Descubre motocicletas de alto rendimiento y diseño exclusivo. Elige la máquina que representa tu estilo.</p>
      </section>
      <ListaProductos :productos="productosFiltrados" @agregar-producto="agregarProducto" />
    </template>
  </main>

  <AppFooter :nombre-tienda="NOMBRE_TIENDA" :anio="new Date().getFullYear()" contacto="ventas@danerikmotors.com · Colombia" />

  <Transition name="aviso">
    <div v-if="aviso" class="aviso" role="status">{{ aviso }}</div>
  </Transition>
</template>


<style>
:root {
  --negro: #0b0b0d;
  --carbon: #121216;
  --panel: #1a1a20;
  --borde: #2d2d35;
  --oro: #c9a24b;
  --oro-claro: #e6c978;
  --texto: #f2efe8;
  --gris: #9d9a92;
  --rojo: #b3262e;
  --fuente-titulo: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --fuente-texto: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; }

body {
  min-height: 100vh;
  background: radial-gradient(circle at 50% -10%, #23232b 0%, var(--negro) 55%);
  background-attachment: fixed;
  color: var(--texto);
  font-family: var(--fuente-texto);
  line-height: 1.5;
}

a { text-decoration: none; }
img { max-width: 100%; }

.contenedor { width: min(1240px, 100% - 2rem); margin-inline: auto; }
main.contenedor { padding-top: 2rem; }

.visualmente-oculto {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); white-space: nowrap;
}

.titulo-seccion {
  font-family: var(--fuente-titulo);
  font-size: clamp(1.7rem, 4vw, 2.3rem);
  color: var(--oro-claro);
  letter-spacing: 0.04em;
  margin-bottom: 1.2rem;
}

.vacio {
  padding: 2.5rem 1rem;
  text-align: center;
  color: var(--gris);
  border: 1px dashed var(--borde);
  border-radius: 12px;
}

.boton {
  padding: 0.75rem 1.6rem;
  border: 1px solid var(--oro);
  border-radius: 8px;
  background: linear-gradient(180deg, var(--oro-claro), var(--oro));
  color: #17130a;
  font: inherit;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: filter 0.2s, transform 0.1s;
}
.boton:hover:not(:disabled) { filter: brightness(1.1); }
.boton:active:not(:disabled) { transform: scale(0.97); }
.boton:disabled { opacity: 0.35; cursor: not-allowed; filter: grayscale(0.6); }
.boton--secundario { background: transparent; color: var(--oro-claro); }

.hero { text-align: center; padding: clamp(1.5rem, 6vw, 3.5rem) 1rem; margin-bottom: 2rem; }
.hero__sobre { color: var(--oro); letter-spacing: 0.35em; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 0.5rem; }
.hero__titulo { font-family: var(--fuente-titulo); font-size: clamp(2rem, 6vw, 3.6rem); font-weight: 600; line-height: 1.1; }
.hero__texto { max-width: 560px; margin: 1rem auto 0; color: var(--gris); }

.aviso {
  position: fixed; left: 50%; bottom: 1.5rem; transform: translateX(-50%);
  z-index: 50; padding: 0.8rem 1.4rem; border-radius: 999px;
  background: var(--oro); color: #17130a; font-weight: 600;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6); max-width: calc(100% - 2rem);
}
.aviso-enter-active, .aviso-leave-active { transition: opacity 0.25s, transform 0.25s; }
.aviso-enter-from, .aviso-leave-to { opacity: 0; transform: translate(-50%, 12px); }

@media print {
  body { background: #fff; color: #000; }
  .encabezado, .pie, .aviso { display: none !important; }
}

</style>
