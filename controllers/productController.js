// Simulamos una base de datos de productos
let products = [
  { id: 1, name: "Producto A", category: "A", price: 100, stock: 2 },
  { id: 2, name: "Producto B", category: "A", price: 200, stock: 4 },
  { id: 3, name: "Producto C", category: "A", price: 300, stock: 6 },
  { id: 4, name: "Producto D", category: "B", price: 100, stock: 2 },
  { id: 5, name: "Producto E", category: "B", price: 200, stock: 41 },
  { id: 6, name: "Producto F", category: "B", price: 300, stock: 64 },
  { id: 7, name: "Producto G", category: "C", price: 100, stock: 26 },
  { id: 8, name: "Producto H", category: "C", price: 200, stock: 47 },
  { id: 9, name: "Producto I", category: "C", price: 300, stock: 0 },
  { id: 10, name: "Producto J", category: "D", price: 100, stock: 54 },
  { id: 11, name: "Producto K", category: "D", price: 200, stock: 45 },
  { id: 12, name: "Producto L", category: "D", price: 300, stock: 69 },
];

//Obtener todos los productos
exports.getProducts = (req, res) => {
  res.status(200).json(products);
  console.log("Productos enviados: ", products);
};

//Agregar un producto
exports.addProduct = (req, res) => {
  const { name, category, price, stock, imageUrl } = req.body;

  // Validar los datos del producto
  if (!name || price <= 0 || stock < 0) {
    return res.status(400).json({
      message: "Datos inválidos. Asegúrate de completar todos los campos obligatorios.",
    });
  }

  const newProduct = {
    id: products.length + 1, // Generar un ID simple
    name,
    category,
    price,
    stock,
    imageUrl: imageUrl || "", // Si no se proporciona imageUrl, usar una cadena vacía
  };

  products.push(newProduct);

  // Devolvemos solo el producto recién agregado
  res.status(201).json(newProduct);

  console.log("Producto agregado:", newProduct);
};

// Editar un producto
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  console.log("ID del producto a editar: ",id)
  const productToEdit = products.find((product) => product.id === parseInt(id));
  console.log("Producto actual a editar: ", productToEdit);
  const { name, category, price, stock, imageUrl } = req.body;
  console.log("Datos recibidos para actualizar:", {
    params: req.params,
    body: req.body,
  });
  
  const productIndex = products.findIndex((product) => product.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: "Producto no encontrado." });
  }

  products[productIndex] = {
    ...products[productIndex], // Mantén los campos existentes
    ...req.body,              // Sobrescribe solo los campos enviados
  };
  

  res.status(200).json(products[productIndex]);
  console.log("Producto updateado:", products[productIndex]);
};

// Eliminar un producto
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((product) => product.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: "Producto no encontrado." });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.status(200).json(deletedProduct[0]);

  console.log("Producto eliminado:", deletedProduct[0]);
};
