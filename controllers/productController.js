exports.getProducts = (req, res) => {
    // Simulación de datos hardcodeados
    const products = [
      { id: 1, name: "Producto A", price: 100 },
      { id: 2, name: "Producto B", price: 200 },
      { id: 3, name: "Producto C", price: 300 },
    ];
    // Acá simplemente simulamos pasar a json
    // datos extraídos de una db
    res.status(200).json(products);
  };
  