document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("productos");
  const buscador = document.getElementById("buscador");
  const modal = document.getElementById("modal");
  const cerrar_modal = document.getElementById("cerrar_modal");
  const btn_agregar = document.getElementById("btn_agregar");

  const sidebar = document.getElementById("sidebar");
  const cerrar_sidebar = document.getElementById("cerrar_sidebar");
  const icono_carrito = document.getElementById("icono_carrito");
  const contador_carrito = document.getElementById("contador_carrito");
  const carrito_items = document.getElementById("carrito_items");
  const precio_total = document.getElementById("precio_total");

  let productos_base = [];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let producto_actual = null;

  // Carrito y local storage
  function actualizar_carrito_visual() {
    carrito_items.innerHTML = "";
    let total_acumulado = 0;

    carrito.forEach(prod => {
      total_acumulado = total_acumulado + (prod.price * prod.cantidad);
      
      const div = document.createElement("div");
      div.className = "item-carrito";
      div.innerHTML = `
        <img src="${prod.image}">
        <div>
          <p><b>${prod.title}</b></p>
          <p>Subtotal: $${(prod.price * prod.cantidad).toFixed(2)}</p>
          <button onclick="modificarCant(${prod.id}, -1)" ${prod.cantidad === 1 ? 'disabled' : ''}>-</button>
          <span>${prod.cantidad}</span>
          <button onclick="modificarCant(${prod.id}, 1)">+</button>
          <button onclick="quitarItem(${prod.id})">Eliminar</button>
        </div>
      `;
      carrito_items.appendChild(div);
    });

    precio_total.textContent = "Total: $" + total_acumulado.toFixed(2);
    contador_carrito.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // funciones de boton carrito
  window.modificarCant = (id, valor) => {
    let encontrado = carrito.find(p => p.id === id);
    if (encontrado) {
      encontrado.cantidad = encontrado.cantidad + valor;
      actualizar_carrito_visual();
    }
  };

  window.quitarItem = (id) => {
    carrito = carrito.filter(p => p.id !== id);
    actualizar_carrito_visual();
  };

  // BOTONES DE VACIAR Y FINALIZAR
  document.getElementById("vaciar_carrito").onclick = () => {
    carrito = [];
    actualizar_carrito_visual();
  };

  document.getElementById("finalizar_compra").onclick = () => {
    if (carrito.length > 0) {
      alert("¡Gracias por su compra!");
      carrito = [];
      actualizar_carrito_visual();
      sidebar.classList.remove("abierto");
    } else {
      alert("El carrito está vacío");
    }
  };

  // ModAl

  function abrir_modal(p) {
    producto_actual = p;
    document.getElementById("modal_imagen").src = p.image;
    document.getElementById("modal_titulo").textContent = p.title;
    document.getElementById("modal_descripcion").textContent = p.description;
    document.getElementById("modal_precio").textContent = "USD " + p.price;
    modal.style.display = "flex";
  }

  cerrar_modal.onclick = () => modal.style.display = "none";
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

  btn_agregar.onclick = () => {
    let existe = carrito.find(item => item.id === producto_actual.id);
    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({ ...producto_actual, cantidad: 1 });
    }
    actualizar_carrito_visual();
    modal.style.display = "none";
    alert("Agregado al carrito");
  };

  //Abrir y cerrar para el sidebar
  icono_carrito.onclick = () => sidebar.classList.add("abierto");
  cerrar_sidebar.onclick = () => sidebar.classList.remove("abierto");

 
  function dibujar_productos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(p => {
      const card = document.createElement("div");
      card.className = "tarjeta";
      card.innerHTML = `
        <img src="${p.image}">
        <h3>${p.title.substring(0, 20)}...</h3>
        <p>$${p.price}</p>
      `;
      card.onclick = () => abrir_modal(p);
      contenedor.appendChild(card);
    });
  }

  // BUscador
  buscador.oninput = (e) => {
    const palabra = e.target.value.toLowerCase();
    const filtrados = productos_base.filter(p => p.title.toLowerCase().includes(palabra));
    dibujar_productos(filtrados);
  };

  // Con esto trae solo vestimenta (HOMBRE Y MUJER)
  Promise.all([
    fetch("https://fakestoreapi.com/products/category/men's clothing"),
    fetch("https://fakestoreapi.com/products/category/women's clothing")
  ])
  .then(respuestas => Promise.all(respuestas.map(res => res.json())))
  .then(data => {
   
    productos_base = [...data[0], ...data[1]];
    dibujar_productos(productos_base);
    actualizar_carrito_visual();
  });

});