console.log("js cargado");

const contenedor = document.getElementById("productos");




let productos = [];
let productosBase = [];

function cargarProductos(url) {
  fetch(url)
    .then(r => r.json())
    .then(data => {
      productosBase = data;
      productos = data;
      renderizar(productos);
    });
}
//ahora funciona la api
Promise.all([
  fetch("https://fakestoreapi.com/products/category/men's clothing").then(r => r.json()),
  fetch("https://fakestoreapi.com/products/category/women's clothing").then(r => r.json())
])
.then(data => {
  productosBase = [...data[0], ...data[1]];
  productos = productosBase;
  renderizar(productos);
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

