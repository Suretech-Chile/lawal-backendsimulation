// Diccionario de productos base (limitado a 4 productos)
const baseProducts = {
    1: "Martillo Profesional",
    2: "Madera de Pino",
    3: "Tornillos Galvanizados",
    4: "Cemento Portland"
  };
  
  // Función para generar código según el nuevo formato
  // [3 primeros caracteres del nombre]-[2 dígitos calidad]-[2 dígitos state]-[3 dígitos paquete]
  const generateCode = (nombre, calidad, state, paquete) => {
    // Extrae los 3 primeros caracteres del nombre, convertidos en mayúsculas
    const prefijo = nombre.substring(0, 3).toUpperCase();
    // Calidad y estado convertidos a números de 2 dígitos
    const calidadStr = calidad.toString().padStart(2, '0');
    const stateStr = state.toString().padStart(2, '0');
    // Paquete como número de 3 dígitos
    const paqueteStr = paquete.toString().padStart(3, '0');
    
    return `${prefijo}-${calidadStr}-${stateStr}-${paqueteStr}`;
  };
  
  // Función para validar un código según formato
  const validateCode = (codigo, nombre, calidad, state, paquete) => {
    const expectedCode = generateCode(nombre, calidad, state, paquete);
    return codigo === expectedCode;
  };
  
  // Simulamos una base de datos de variantes de productos
  let productVariants = [
    { 
      id: 1, 
      productId: 1, 
      nombre: "Martillo Profesional", 
      state: 1, 
      calidad: 1, 
      medida: "0", 
      paquete: 1, 
      codigo: "MAR-01-01-001", 
      margen: 0.25, 
      priceIn: 80, 
      sector: "Ferretería", 
      local: "Principal", 
      stock: 15, 
      precio: 100 
    },
    { 
      id: 2, 
      productId: 1, 
      nombre: "Martillo Profesional", 
      state: 2, 
      calidad: 2, 
      medida: "0", 
      paquete: 2, 
      codigo: "MAR-02-02-002", 
      margen: 0.30, 
      priceIn: 100, 
      sector: "Ferretería", 
      local: "Sucursal", 
      stock: 8, 
      precio: 130 
    },
    { 
      id: 3, 
      productId: 2, 
      nombre: "Madera de Pino", 
      state: 1, 
      calidad: 1, 
      medida: "1M", 
      paquete: 1, 
      codigo: "MAD-01-01-001", 
      margen: 0.30, 
      priceIn: 1538.46, 
      sector: "Construcción", 
      local: "Principal", 
      stock: 20, 
      precio: 2000 
    },
    { 
      id: 4, 
      productId: 2, 
      nombre: "Madera de Pino", 
      state: 1, 
      calidad: 1, 
      medida: "2M", 
      paquete: 2, 
      codigo: "MAD-01-01-002", 
      margen: 0.30, 
      priceIn: 3076.92, 
      sector: "Construcción", 
      local: "Principal", 
      stock: 12, 
      precio: 4000 
    },
    { 
      id: 5, 
      productId: 2, 
      nombre: "Madera de Pino", 
      state: 0, 
      calidad: 2, 
      medida: "1M", 
      paquete: 3, 
      codigo: "MAD-02-00-003", 
      margen: 0.35, 
      priceIn: 1700, 
      sector: "Construcción", 
      local: "Sucursal", 
      stock: 0, 
      precio: 2295 
    },
    { 
      id: 6, 
      productId: 3, 
      nombre: "Tornillos Galvanizados", 
      state: 1, 
      calidad: 1, 
      medida: "0", 
      paquete: 1, 
      codigo: "TOR-01-01-001", 
      margen: 0.20, 
      priceIn: 250, 
      sector: "Ferretería", 
      local: "Principal", 
      stock: 50, 
      precio: 300 
    },
    { 
      id: 7, 
      productId: 3, 
      nombre: "Tornillos Galvanizados", 
      state: 2, 
      calidad: 2, 
      medida: "0", 
      paquete: 2, 
      codigo: "TOR-02-02-002", 
      margen: 0.25, 
      priceIn: 280, 
      sector: "Ferretería", 
      local: "Principal", 
      stock: 32, 
      precio: 350 
    },
    { 
      id: 8, 
      productId: 4, 
      nombre: "Cemento Portland", 
      state: 1, 
      calidad: 1, 
      medida: "0", 
      paquete: 1, 
      codigo: "CEM-01-01-001", 
      margen: 0.15, 
      priceIn: 70, 
      sector: "Construcción", 
      local: "Principal", 
      stock: 100, 
      precio: 80.5 
    },
    { 
      id: 9, 
      productId: 4, 
      nombre: "Cemento Portland", 
      state: 1, 
      calidad: 2, 
      medida: "0", 
      paquete: 2, 
      codigo: "CEM-02-01-002", 
      margen: 0.20, 
      priceIn: 90, 
      sector: "Construcción", 
      local: "Principal", 
      stock: 75, 
      precio: 108 
    },
    { 
      id: 10, 
      productId: 4, 
      nombre: "Cemento Portland", 
      state: 0, 
      calidad: 3, 
      medida: "0", 
      paquete: 3, 
      codigo: "CEM-03-00-003", 
      margen: 0.25, 
      priceIn: 100, 
      sector: "Construcción", 
      local: "Sucursal", 
      stock: 0, 
      precio: 125 
    },
    { 
      id: 11, 
      productId: 3, 
      nombre: "Tornillos Galvanizados", 
      state: 1, 
      calidad: 3, 
      medida: "0", 
      paquete: 3, 
      codigo: "TOR-03-01-003", 
      margen: 0.30, 
      priceIn: 300, 
      sector: "Ferretería", 
      local: "Sucursal", 
      stock: 45, 
      precio: 390 
    },
    { 
      id: 12, 
      productId: 1, 
      nombre: "Martillo Profesional", 
      state: 0, 
      calidad: 3, 
      medida: "0", 
      paquete: 3, 
      codigo: "MAR-03-00-003", 
      margen: 0.35, 
      priceIn: 120, 
      sector: "Ferretería", 
      local: "Principal", 
      stock: 5, 
      precio: 162 
    }
  ];
  
  // Obtener todas las variantes de productos
  exports.getProductVariants = (req, res) => {
    res.status(200).json(productVariants);
    console.log("Variantes de productos enviadas: ", productVariants);
  };
  
  // Obtener una variante de producto por ID
  exports.getProductVariantById = (req, res) => {
    const { id } = req.params;
    const productVariant = productVariants.find((variant) => variant.id === parseInt(id));
    
    if (!productVariant) {
      return res.status(404).json({ message: "Variante de producto no encontrada." });
    }
    
    res.status(200).json(productVariant);
    console.log("Variante de producto enviada: ", productVariant);
  };
  
  // Obtener variantes de producto por productId
  exports.getVariantsByProductId = (req, res) => {
    const { productId } = req.params;
    const parsedProductId = parseInt(productId);
    
    // Verificar si el productId existe en nuestro diccionario
    if (!baseProducts[parsedProductId]) {
      return res.status(404).json({ message: "ID de producto no válido." });
    }
    
    const variants = productVariants.filter((variant) => variant.productId === parsedProductId);
    
    if (variants.length === 0) {
      return res.status(404).json({ message: "No se encontraron variantes para este producto." });
    }
    
    res.status(200).json(variants);
    console.log("Variantes del producto enviadas: ", variants);
  };
  
  // Agregar una variante de producto
  exports.addProductVariant = (req, res) => {
    const { 
      productId, 
      nombre,
      state, 
      calidad, 
      medida, 
      paquete, 
      margen, 
      priceIn, 
      sector, 
      local, 
      stock, 
      precio 
    } = req.body;
    
    // Validación del productId
    const parsedProductId = parseInt(productId);
    if (!baseProducts[parsedProductId]) {
      return res.status(400).json({
        message: "ID de producto no válido. Debe ser uno de los productos existentes (1-4)."
      });
    }
    
    // Validar que el nombre coincida con el productId
    const expectedNombre = baseProducts[parsedProductId];
    if (nombre !== expectedNombre) {
      return res.status(400).json({
        message: `El nombre debe coincidir con el producto seleccionado. Para productId ${productId}, el nombre debe ser "${expectedNombre}".`
      });
    }
    
    // Validaciones básicas
    if (!productId || state === undefined || calidad === undefined || paquete === undefined || stock === undefined) {
      return res.status(400).json({
        message: "Datos inválidos. Asegúrate de completar todos los campos obligatorios."
      });
    }
    
    // Validación del estado
    const parsedState = parseInt(state);
    if (![0, 1, 2].includes(parsedState)) {
      return res.status(400).json({
        message: "El estado debe ser 0, 1 o 2."
      });
    }
    
    // Generar código según el nuevo formato
    const parsedCalidad = parseInt(calidad);
    const parsedPaquete = parseInt(paquete);
    const generatedCode = generateCode(nombre, parsedCalidad, parsedState, parsedPaquete);
    
    // Verificar si el código ya existe
    const codeExists = productVariants.some(variant => variant.codigo === generatedCode);
    if (codeExists) {
      return res.status(400).json({
        message: "Ya existe una variante con este código. El código debe ser único."
      });
    }
    
    const newProductVariant = {
      id: productVariants.length + 1,
      productId: parsedProductId,
      nombre: expectedNombre,
      state: parsedState,
      calidad: parsedCalidad,
      medida,
      paquete: parsedPaquete,
      codigo: generatedCode,
      margen: parseFloat(margen),
      priceIn: parseFloat(priceIn),
      sector,
      local,
      stock: parseInt(stock),
      precio: parseFloat(precio) || parseFloat(priceIn) * (1 + parseFloat(margen)) // Calcula el precio si no se proporciona
    };
    
    productVariants.push(newProductVariant);
    
    res.status(201).json(newProductVariant);
    console.log("Variante de producto agregada:", newProductVariant);
  };
  
  // Actualizar una variante de producto
  exports.updateProductVariant = (req, res) => {
    const { id } = req.params;
    const variantIndex = productVariants.findIndex((variant) => variant.id === parseInt(id));
    
    if (variantIndex === -1) {
      return res.status(404).json({ message: "Variante de producto no encontrada." });
    }
    
    const currentVariant = productVariants[variantIndex];
    let updatedVariant = { ...currentVariant };
    
    // Si se actualiza productId, validar que exista y actualizar el nombre
    if (req.body.productId) {
      const parsedProductId = parseInt(req.body.productId);
      if (!baseProducts[parsedProductId]) {
        return res.status(400).json({
          message: "ID de producto no válido. Debe ser uno de los productos existentes (1-4)."
        });
      }
      updatedVariant.productId = parsedProductId;
      updatedVariant.nombre = baseProducts[parsedProductId];
    }
    
    // Actualizar otros campos
    if (req.body.state !== undefined) {
      const parsedState = parseInt(req.body.state);
      if (![0, 1, 2].includes(parsedState)) {
        return res.status(400).json({
          message: "El estado debe ser 0, 1 o 2."
        });
      }
      updatedVariant.state = parsedState;
    }
    
    if (req.body.calidad !== undefined) {
      updatedVariant.calidad = parseInt(req.body.calidad);
    }
    
    if (req.body.paquete !== undefined) {
      updatedVariant.paquete = parseInt(req.body.paquete);
    }
    
    if (req.body.medida !== undefined) {
      updatedVariant.medida = req.body.medida;
    }
    
    if (req.body.margen !== undefined) {
      updatedVariant.margen = parseFloat(req.body.margen);
    }
    
    if (req.body.priceIn !== undefined) {
      updatedVariant.priceIn = parseFloat(req.body.priceIn);
    }
    
    if (req.body.sector !== undefined) {
      updatedVariant.sector = req.body.sector;
    }
    
    if (req.body.local !== undefined) {
      updatedVariant.local = req.body.local;
    }
    
    if (req.body.stock !== undefined) {
      updatedVariant.stock = parseInt(req.body.stock);
    }
    
    if (req.body.precio !== undefined) {
      updatedVariant.precio = parseFloat(req.body.precio);
    } else if (req.body.margen !== undefined || req.body.priceIn !== undefined) {
      // Recalcular precio si se cambió margen o priceIn pero no el precio directamente
      updatedVariant.precio = updatedVariant.priceIn * (1 + updatedVariant.margen);
    }
    
    // Regenerar el código si alguno de los componentes ha cambiado
    if (
      req.body.calidad !== undefined || 
      req.body.state !== undefined || 
      req.body.paquete !== undefined ||
      req.body.productId !== undefined // Esto cambia el nombre también
    ) {
      updatedVariant.codigo = generateCode(
        updatedVariant.nombre, 
        updatedVariant.calidad, 
        updatedVariant.state, 
        updatedVariant.paquete
      );
      
      // Verificar que el nuevo código no colisione con otros existentes (excepto el propio)
      const codeExists = productVariants.some(variant => 
        variant.codigo === updatedVariant.codigo && variant.id !== parseInt(id)
      );
      
      if (codeExists) {
        return res.status(400).json({
          message: "Ya existe otra variante con este código. Los cambios generarían un código duplicado."
        });
      }
    }
    
    // Actualizar la variante
    productVariants[variantIndex] = updatedVariant;
    
    res.status(200).json(updatedVariant);
    console.log("Variante de producto actualizada:", updatedVariant);
  };
  
  // Eliminar una variante de producto
  exports.deleteProductVariant = (req, res) => {
    const { id } = req.params;
    const variantIndex = productVariants.findIndex((variant) => variant.id === parseInt(id));
    
    if (variantIndex === -1) {
      return res.status(404).json({ message: "Variante de producto no encontrada." });
    }
    
    const deletedVariant = productVariants.splice(variantIndex, 1);
    res.status(200).json(deletedVariant[0]);
    console.log("Variante de producto eliminada:", deletedVariant[0]);
  };
  
  // Obtener las variantes de productos más vendidas
  exports.getTopProductVariants = (req, res) => {
    // Simulamos variantes más vendidas (por ahora son las primeras 5)
    const topVariants = productVariants.filter(variant => variant.state === 1).slice(0, 5);
    res.status(200).json(topVariants);
    console.log("Lista de variantes más vendidas enviada: ", topVariants);
  };
  
  // Obtener variantes de productos con bajo stock
  exports.getLowStockVariants = (req, res) => {
    const lowStockThreshold = 10;
    const lowStockVariants = productVariants.filter(variant => 
      variant.stock < lowStockThreshold && variant.stock > 0 && variant.state !== 0
    );
    
    res.status(200).json(lowStockVariants);
    console.log("Variantes con bajo stock enviadas: ", lowStockVariants);
  };
  
  // Obtener variantes de productos sin stock
  exports.getOutOfStockVariants = (req, res) => {
    const outOfStockVariants = productVariants.filter(variant => variant.stock === 0);
    
    res.status(200).json(outOfStockVariants);
    console.log("Variantes sin stock enviadas: ", outOfStockVariants);
  };
  
  // Obtener variantes por estado
  exports.getVariantsByState = (req, res) => {
    const { state } = req.params;
    const parsedState = parseInt(state);
    
    if (![0, 1, 2].includes(parsedState)) {
      return res.status(400).json({
        message: "El estado debe ser 0, 1 o 2."
      });
    }
    
    const stateVariants = productVariants.filter(variant => variant.state === parsedState);
    
    res.status(200).json(stateVariants);
    console.log(`Variantes con estado ${state} enviadas: `, stateVariants);
  };