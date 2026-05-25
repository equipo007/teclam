let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* =========================
   GUARDAR EN LOCALSTORAGE
========================= */
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* =========================
   SINCRONIZAR ENTRE PESTAÑAS
========================= */
window.addEventListener("storage", (e) => {
    if (e.key === "carrito") {
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        actualizarCarrito();
        mostrarCarritoPagina();
    }
});

/* =========================
   CONTADOR HEADER
========================= */
function actualizarCarrito() {
    const contador = document.getElementById("contadorCarrito");
    if (!contador) return;

    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = totalItems;
}

/* =========================
   AGREGAR PRODUCTO
========================= */
function agregarCarrito(nombre, precio, imagen = "") {

    precio = Number(precio); // 🔥 evita NaN

    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            nombre,
            precio,
            cantidad: 1,
            imagen
        });
    }

    guardarCarrito();
    actualizarCarrito();
    mostrarCarritoPagina();

    mostrarMensaje("Agregado 🛒");
}

/* =========================
   ELIMINAR
========================= */
function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
    mostrarCarritoPagina();
}

/* =========================
   CAMBIAR CANTIDAD
========================= */
function cambiarCantidad(index, cambio) {

    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    guardarCarrito();
    actualizarCarrito();
    mostrarCarritoPagina();
}

/* =========================
   VACIAR CARRITO
========================= */
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
    mostrarCarritoPagina();
}

/* =========================
   MENSAJE FLOTANTE
========================= */
function mostrarMensaje(texto) {

    const msg = document.createElement("div");

    msg.innerText = texto;

    msg.style.position = "fixed";
    msg.style.bottom = "20px";
    msg.style.right = "20px";
    msg.style.background = "#431169";
    msg.style.color = "white";
    msg.style.padding = "10px 15px";
    msg.style.borderRadius = "10px";
    msg.style.zIndex = "9999";
    msg.style.fontSize = "14px";

    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 1500);
}

/* =========================
   MINI CARRITO HEADER
========================= */
function actualizarCarrito() {

    const lista = document.getElementById("lista-carrito");
    const contador = document.getElementById("contadorCarrito");
    const totalSpan = document.getElementById("total");

    let total = 0;

    if (contador) {
        contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    }

    if (lista && totalSpan) {

        lista.innerHTML = "";

        carrito.forEach((p, i) => {

            const subtotal = p.precio * p.cantidad;
            total += subtotal;

            lista.innerHTML += `
                <div class="item-carrito">

                    <div style="display:flex; gap:10px; align-items:center;">

                        ${p.imagen ? `<img src="${p.imagen}" width="50">` : ""}

                        <div>
                            <b>${p.nombre}</b><br>
                            $${p.precio.toFixed(2)} x ${p.cantidad}
                        </div>

                    </div>

                    <div>
                        <button onclick="cambiarCantidad(${i}, -1)">-</button>
                        <button onclick="cambiarCantidad(${i}, 1)">+</button>
                        <button onclick="eliminarProducto(${i})">x</button>
                    </div>

                </div>
            `;
        });

        totalSpan.textContent = total.toFixed(2);
    }
}

/* =========================
   PÁGINA CARRITO
========================= */
function mostrarCarritoPagina() {

    const contenedor = document.getElementById("carrito-contenido");
    const totalSpan = document.getElementById("total");

    if (!contenedor || !totalSpan) return;

    let total = 0;

    contenedor.innerHTML = "";

    carrito.forEach((p, i) => {

        const subtotal = p.precio * p.cantidad;
        total += subtotal;

        contenedor.innerHTML += `
            <div class="item">

                ${p.imagen ? `<img src="${p.imagen}" width="80">` : ""}

                <div>
                    <b>${p.nombre}</b>
                    <p>$${p.precio.toFixed(2)}</p>
                </div>

                <div>
                    <button onclick="cambiarCantidad(${i}, -1)">➖</button>
                    <span>${p.cantidad}</span>
                    <button onclick="cambiarCantidad(${i}, 1)">➕</button>
                    <button onclick="eliminarProducto(${i})">❌</button>
                </div>

            </div>
        `;
    });

    totalSpan.textContent = total.toFixed(2);
}

/* =========================
   INICIO
========================= */
window.onload = () => {
    actualizarCarrito();
    mostrarCarritoPagina();
};function toggleMenu(){

    document
        .getElementById("menu")
        .classList.toggle("activo");

}function toggleMenu() {

    document
        .getElementById("menu")
        .classList.toggle("activo");

}

function toggleMenu() {

    document
        .getElementById("menu")
        .classList.toggle("active");
}
