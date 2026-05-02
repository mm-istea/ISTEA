//console.log("js cargado");

const contenedor = document.getElementById("productos");
const buscador = document.getElementById("buscador");

let productos = [];
let productosBase = [];

Promise.all([
  fetch("https://fakestoreapi.com/products/category/men's clothing").then(r => r.json()),
  fetch("https://fakestoreapi.com/products/category/women's clothing").then(r => r.json())
])
.then(data => {
  productosBase = [...data[0], ...data[1]];
  productos = productosBase;
  renderizar(productos);
})
.catch(err => {
  console.log("Error API:", err);
});

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

    contenedor.appendChild(tarjeta);
  });
}

buscador.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();

  const filtrados = productosBase.filter(p =>
    p.title.toLowerCase().includes(texto)
  );

  renderizar(filtrados);
});