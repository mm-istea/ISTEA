const contenedor = document.getElementById("productos");
const buscador = document.getElementById("buscador");

const modal = document.getElementById("modal");
const cerrar_modal = document.getElementById("cerrar_modal");

const modal_imagen = document.getElementById("modal_imagen");
const modal_titulo = document.getElementById("modal_titulo");
const modal_descripcion = document.getElementById("modal_descripcion");
const modal_precio = document.getElementById("modal_precio");

let productos = [];
let productos_base = [];

Promise.all([
  fetch("https://fakestoreapi.com/products/category/men's clothing").then(r => r.json()),
  fetch("https://fakestoreapi.com/products/category/women's clothing").then(r => r.json())
])
.then(data => {
  productos_base = [...data[0], ...data[1]];
  productos = productos_base;
  renderizar(productos);
})
.catch(err => {
  console.log("Error API:", err);
});

function abrir_modal(producto) {
  modal.style.display = "flex";

  modal_imagen.src = producto.image;
  modal_titulo.textContent = producto.title;
  modal_descripcion.textContent = producto.description;
  modal_precio.textContent = "$ " + producto.price;
}

function cerrar_modal_funcion() {
  modal.style.display = "none";
}

cerrar_modal.addEventListener("click", cerrar_modal_funcion);

function renderizar(lista) {
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    tarjeta.innerHTML = `
      <img src="${p.image}">
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
    `;

    tarjeta.addEventListener("click", () => {
      abrir_modal(p);
    });

    contenedor.appendChild(tarjeta);
  });
}

buscador.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();

  const filtrados = productos_base.filter(p =>
    p.title.toLowerCase().includes(texto)
  );

  renderizar(filtrados);
});