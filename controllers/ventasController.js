// Simulamos una base de datos de preventas activas
let preventas = [
    { id: 1, cart:[{product: { id: 2, name: "Madera 3x3", category: "A", price: 2000, stock: 40 }, quantity: 3},
                   {product:{ id: 12, name: "Producto L", category: "D", price: 300, stock: 69 }, quantity: 10}
                ]}
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
        // Verificar que el stock del producto sea suficiente para la cantidad solicitada
        if (item.product.stock < item.quantity) {
            return res.status(400).json({
                message: `Stock insuficiente para el producto ${item.product.name}. Stock disponible: ${item.product.stock}, Cantidad solicitada: ${item.quantity}`
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
        // Verificar que el stock del producto sea suficiente para la cantidad solicitada
        if (item.product.stock < item.quantity) {
            return res.status(400).json({
                message: `Stock insuficiente para el producto ${item.product.name}. Stock disponible: ${item.product.stock}, Cantidad solicitada: ${item.quantity}`
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