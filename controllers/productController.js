// Simulamos una base de datos de productos
let products = [
  { id: 1, name: "Producto A", category: "A", imageUrl: "https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png?format=1500w", price: 100, stock: 2 },
  { id: 2, name: "Madera 3x3", category: "A", price: 2000, stock: 40 },
  { id: 3, name: "Producto C", category: "A", price: 300, stock: 6 },
  { id: 4, name: "Producto D", category: "Ferretería", price: 100, stock: 2 },
  { id: 5, name: "Producto E", category: "Ferretería", price: 200, stock: 41 },
  { id: 6, name: "Producto F", category: "Ferretería", price: 300, stock: 64 },
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
  const { name, category, price, stock, imageFile} = req.body;
  // Validar los datos del producto
  if (!name || !category || (price && price <= 0) || (stock && stock < 0)) { //Si no hay nombre, no hay categoría, o existe price y stock pero no con valores válidos
    return res.status(400).json({
      message: "Datos inválidos. Asegúrate de completar todos los campos obligatorios y llenar price y stock con valores válidos",
    });
  }

  const newProduct = {
    id: products.length + 1, // Generar un ID simple
    name,
    category,
    price,
    stock,
    imageUrl: imageFile? "https://placehold.co/" : "", // Si no se proporciona imageUrl, usar una cadena vacía
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
  const { name, category, price, stock, imageUrl, imageFile } = req.body;
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
    imageUrl: imageFile? "https://placehold.co/" : products[productIndex].imageUrl //Si se editó la imagen se asigna una nueva url, si no se conserva la anterior
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

// Simulamos una base de datos de los productos más vendidos
let topProducts = [
  { id: 2, name: "Madera 3x3", category: "A", price: 2000, stock: 4 },
  { id: 3, name: "Producto C", category: "A", price: 300, stock: 6 },
  { id: 4, name: "Producto D", category: "Ferretería", price: 100, stock: 2 },
  { id: 5, name: "Producto E", category: "Ferretería", price: 200, stock: 41 },
];

//Obtener los productos más vendidos
exports.getTopProducts = (req, res) => {
  res.status(200).json(topProducts);
  console.log("Lista de prod. más vendidos enviada: ", topProducts);
};
