// Simulamos una base de datos de preventas activas
let preventas = [
    {
      id: 1,
      cart: [
        { productId: 1, quantity: 1 },
        { productId: 11, quantity: 40 },
      ],
    },
    {
      id: 2,
      cart: [
        { productId: 2, quantity: 3 },
        { productId: 12, quantity: 40 },
      ],
    },
    {
      id: 3,
      cart: [
        { productId: 3, quantity: 4 },
        { productId: 2, quantity: 40 },
      ],
    },
  ];

// Simulamos la base de datos de productos (ASEGURARSE Q SEA IGUAL A LA DE PORDUCTCONTROLLER)
let products = [
    { id: 1, name: "Producto A", category: "A", price: 100, stock: 2 },
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

// Obtener la lista de preventas
exports.getPreventas = (req, res) => {
    res.status(200).json(preventas);
    console.log("Preventas enviados: ", preventas);
};

// Añadir una nueva preventa
exports.addPreventa = (req, res) => {
    const { cart } = req.body;
    
    // Validar que el carrito no venga vacío
    if (!cart || cart.length === 0) {
        return res.status(400).json({
            message: "El carrito no puede estar vacío."
        });
    }

    // Validar stock de los productos
    for (let item of cart) {
        // Encontrar el producto correspondiente
        const product = products.find(p => p.id === item.productId);
        
        // Verificar que el producto existe
        if (!product) {
            return res.status(400).json({
                message: `Producto con ID ${item.productId} no encontrado.`
            });
        }

        // Verificar que el stock del producto sea suficiente para la cantidad solicitada
        if (product.stock < item.quantity) {
            return res.status(400).json({
                message: `Stock insuficiente para el producto ${product.name}. Stock disponible: ${product.stock}, Cantidad solicitada: ${item.quantity}`
            });
        }
    }

    // Si pasó todas las validaciones, crear la preventa
    const newPreventa = {
        id: preventas.length + 1, // Generar un ID simple
        cart: cart
    };

    preventas.push(newPreventa);

    // En el backend real se devuelve el PDF de la preventa para ser impreso
    res.status(201).json(newPreventa);

    console.log("Preventa agregada:", newPreventa);
};

// Editar una preventa
exports.updatePreventa = (req, res) => {
    const { id } = req.params;
    const { cart } = req.body;
    
    console.log("ID de la preventa a editar: ", id);
    console.log("Datos recibidos para actualizar:", {
        params: req.params,
        body: req.body,
    });
    
    // Validar que el carrito no venga vacío
    if (!cart || cart.length === 0) {
        return res.status(400).json({
            message: "El carrito no puede estar vacío."
        });
    }

    // Buscar la preventa
    const preventaIndex = preventas.findIndex((preventa) => preventa.id === parseInt(id));
    
    if (preventaIndex === -1) {
        return res.status(404).json({ message: "Preventa no encontrada." });
    }

    // Validar stock de los productos
    for (let item of cart) {
        // Encontrar el producto correspondiente
        const product = products.find(p => p.id === item.productId);
        
        // Verificar que el producto existe
        if (!product) {
            return res.status(400).json({
                message: `Producto con ID ${item.productId} no encontrado.`
            });
        }

        // Verificar que el stock del producto sea suficiente para la cantidad solicitada
        if (product.stock < item.quantity) {
            return res.status(400).json({
                message: `Stock insuficiente para el producto ${product.name}. Stock disponible: ${product.stock}, Cantidad solicitada: ${item.quantity}`
            });
        }
    }

    // Actualizar la preventa
    preventas[preventaIndex] = {
        ...preventas[preventaIndex], // Mantén los campos existentes
        ...req.body,                 // Sobrescribe solo los campos enviados
    };
    
    res.status(200).json(preventas[preventaIndex]);
    console.log("Preventa updateada:", preventas[preventaIndex]);
};