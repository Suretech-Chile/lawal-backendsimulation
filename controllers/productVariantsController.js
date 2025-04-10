// productData.productVariantsController.js
const productData = require('./../models/productData');

  // Obtener todas las variantes de productos
  exports.getProductVariants = (req, res) => {
    res.status(200).json(productData.productVariants);
    console.log("Variantes de productos enviadas: ", productData.productVariants);
  };
  
  // Obtener una variante de producto por ID
  exports.getProductVariantById = (req, res) => {
    const { id } = req.params;
    const productVariant = productData.productVariants.find((variant) => variant.id === parseInt(id));
    
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
    
    const variants = productData.productVariants.filter((variant) => variant.productId === parsedProductId);
    
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
    const codeExists = productData.productVariants.some(variant => variant.codigo === generatedCode);
    if (codeExists) {
      return res.status(400).json({
        message: "Ya existe una variante con este código. El código debe ser único."
      });
    }
    
    const newProductVariant = {
      id: productData.productVariants.length + 1,
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
    
    productData.productVariants.push(newProductVariant);
    
    res.status(201).json(newProductVariant);
    console.log("Variante de producto agregada:", newProductVariant);
  };
  
  // Actualizar una variante de producto
  exports.updateProductVariant = (req, res) => {
    const { id } = req.params;
    const variantIndex = productData.productVariants.findIndex((variant) => variant.id === parseInt(id));
    
    if (variantIndex === -1) {
      return res.status(404).json({ message: "Variante de producto no encontrada." });
    }
    
    const currentVariant = productData.productVariants[variantIndex];
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
      const codeExists = productData.productVariants.some(variant => 
        variant.codigo === updatedVariant.codigo && variant.id !== parseInt(id)
      );
      
      if (codeExists) {
        return res.status(400).json({
          message: "Ya existe otra variante con este código. Los cambios generarían un código duplicado."
        });
      }
    }
    
    // Actualizar la variante
    productData.productVariants[variantIndex] = updatedVariant;
    
    res.status(200).json(updatedVariant);
    console.log("Variante de producto actualizada:", updatedVariant);
  };
  
  // Eliminar una variante de producto
  exports.deleteProductVariant = (req, res) => {
    const { id } = req.params;
    const variantIndex = productData.productVariants.findIndex((variant) => variant.id === parseInt(id));
    
    if (variantIndex === -1) {
      return res.status(404).json({ message: "Variante de producto no encontrada." });
    }
    
    const deletedVariant = productData.productVariants.splice(variantIndex, 1);
    res.status(200).json(deletedVariant[0]);
    console.log("Variante de producto eliminada:", deletedVariant[0]);
  };
  
  // Obtener las variantes de productos más vendidas
  exports.getTopProductVariants = (req, res) => {
    // Simulamos variantes más vendidas (por ahora son las primeras 5)
    const topVariants = productData.productVariants.filter(variant => variant.state === 1).slice(0, 5);
    res.status(200).json(topVariants);
    console.log("Lista de variantes más vendidas enviada: ", topVariants);
  };
  
  // Obtener variantes de productos con bajo stock
  exports.getLowStockVariants = (req, res) => {
    const lowStockThreshold = 10;
    const lowStockVariants = productData.productVariants.filter(variant => 
      variant.stock < lowStockThreshold && variant.stock > 0 && variant.state !== 0
    );
    
    res.status(200).json(lowStockVariants);
    console.log("Variantes con bajo stock enviadas: ", lowStockVariants);
  };
  
  // Obtener variantes de productos sin stock
  exports.getOutOfStockVariants = (req, res) => {
    const outOfStockVariants = productData.productVariants.filter(variant => variant.stock === 0);
    
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
    
    const stateVariants = productData.productVariants.filter(variant => variant.state === parsedState);
    
    res.status(200).json(stateVariants);
    console.log(`Variantes con estado ${state} enviadas: `, stateVariants);
  };
  
  // Versión actualizada de endpoint de legado usando la función de utilidad
  exports.getVariantsGroupedByNameStateAndMedida = (req, res) => {
    console.log("Solicitud recibida en /grouped");
    try {
      const result = {};
      
      productData.productVariants.forEach(variant => {
        // Utilizar la función de utilidad para generar el nombre compuesto
        const compoundName = productData.generateCompoundName(variant);
        
        // Inicializar la estructura si no existe
        if (!result[compoundName]) {
          result[compoundName] = {};
        }
        
        // Agregar el objeto asociada a cada código con {id,precio,stock}
        result[compoundName][variant.codigo] = {
          id: variant.id, 
          precio: variant.precio, 
          stock: variant.stock
        };
      });
      
      console.log("Variantes agrupadas enviadas:", Object.keys(result).length, "grupos");
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error al obtener variantes agrupadas:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
// Endpoint antiguo, obtener las variantes más vendidas agrupadas por nombre, estado y medida
exports.getTopVariantsGroupedByNameStateAndMedida = (req, res) => {
  try {
    const result = {};

    // Simulamos que las "más vendidas" son las primeras 5 con state === 1
    const topVariants = productData.productVariants.filter(variant => variant.state === 1).slice(0, 5);

    topVariants.forEach(variant => {
      // Usar la función utilitaria para generar el nombre compuesto
      const compoundName = productData.generateCompoundName(variant);

      // Inicializar la estructura si no existe
      if (!result[compoundName]) {
        result[compoundName] = {};
      }

      // Agregar el objeto asociada a cada código con {id,precio,stock}
      result[compoundName][variant.codigo] = {id: variant.id, precio: variant.precio, stock: variant.stock};
    });

    console.log(result);
    console.log("Variantes más vendidas agrupadas enviadas:", Object.keys(result).length, "grupos");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener variantes más vendidas agrupadas:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener variantes con mismo Estado y Medidas para mostrar en Frontend Ventas FALTA AGREGAR AL ROUTER
exports.getVariantsForVentasFrontend = (req, res) => {
  console.log("Solicitud recibida en /variantsVentasFrontend");
  try {
    const result = {};
    
    //Simulamos que las variantes más vendidas son las primeras 5
    const topVariants = productData.productVariants.filter(variant => variant.state === 1).slice(0, 5);
  
    topVariants.forEach(variant => {
      // Generar nombre compuesto utilizando la función de utilidad
      const compoundName = productData.generateCompoundName(variant);
      
      // Crear el objeto en el formato requerido
      result[variant.id] = {
        codigo: variant.codigo,
        nombre: compoundName,
        precio: variant.precio,
        stock: variant.stock,
        local: variant.local
      };
    });
    
    console.log("Variantes más vendidas formateadas enviadas:", Object.keys(result).length, "variantes");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener variantes para frontend:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener variantes con mismo Estado y Medidas para mostrar en Frontend Ventas FALTA AGREGAR AL ROUTER
exports.getTopVariantsForVentasFrontend = (req, res) => {
  console.log("Solicitud recibida en /topSales/VentasFrontend");
  try {
    const result = {};
    
    productData.productVariants.forEach(variant => {
      // Generar nombre compuesto utilizando la función de utilidad
      const compoundName = productData.generateCompoundName(variant);
      
      // Crear el objeto en el formato requerido
      result[variant.id] = {
        codigo: variant.codigo,
        nombre: compoundName,
        precio: variant.precio,
        stock: variant.stock,
        local: variant.local
      };
    });
    
    console.log("Variantes formateadas enviadas:", Object.keys(result).length, "variantes");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener variantes más vendidas para frontend:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
