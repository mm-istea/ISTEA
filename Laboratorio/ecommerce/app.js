console.log("js cargado");

const contenedor = document.getElementById("productos");

console.log(contenedor);
//no me cargan las imagenes externas, pruebo con esto como placeholder por el momento
const productos = [
  {
    titulo: "Producto 1",
    precio: 10,
    imagen: "data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='gray'/%3E%3C/svg%3E"
  },
  {
    titulo: "Producto 2",
    precio: 20,
    imagen: "data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='blue'/%3E%3C/svg%3E"
  }
];

function renderizarProductos() {
  for (let i = 0; i < productos.length; i++) {
    const p = productos[i];

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    tarjeta.innerHTML = `
      <img src="${p.imagen}">
      <h3>${p.titulo}</h3>
      <p>$${p.precio}</p>
    `;

    contenedor.appendChild(tarjeta);
  }
}

renderizarProductos();