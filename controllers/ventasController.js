// Import data from mock database
const { productVariants, baseProducts } = require('../models/productData');

// Simulamos una base de datos de preventas activas con nuevo formato
let preventas = {
  "abcd1": {
    "4": {
      nombre: "Madera de Pino Cepillado 2M",
      cantidad: 1,
      precio: 4000
    },
    "6": {
      nombre: "Tornillos Galvanizados Cepillado",
      cantidad: 2,
      precio: 300
    }
  },
  "abcd2": {
    "3": {
      nombre: "Madera de Pino Cepillado 1M",
      cantidad: 3,
      precio: 2000
    },
    "7": {
      nombre: "Tornillos Galvanizados Otra Transformación",
      cantidad: 1,
      precio: 350
    }
  }
};

// Obtener la lista de preventas
exports.getPreventas = (req, res) => {
  res.status(200).json(preventas);
  console.log("Preventas enviadas: ", preventas);
};

// Añadir una nueva preventa
exports.addPreventa = (req, res) => {
  const preventaPayload = req.body.preventa;
  
  // Validar que el payload no venga vacío
  if (!preventaPayload || Object.keys(preventaPayload).length === 0) {
    return res.status(400).json({
      success: false,
      details: "La preventa no puede estar vacía."
    });
  }
  
  // Generar ID único para la preventa
  const preventaId = 'abcd' + (Object.keys(preventas).length + 1);
  
  // Validar stock de los productos
  for (const [productVariantId, item] of Object.entries(preventaPayload)) {
    // Encontrar la variante de producto
    const variant = productVariants.find(v => v.id === parseInt(productVariantId));
    
    // Verificar que la variante existe
    if (!variant) {
      return res.status(400).json({
        success: false,
        details: `Variante de producto con ID ${productVariantId} no encontrada.`
      });
    }
    
    // Verificar que el stock sea suficiente
    if (variant.stock < item.cantidad) {
      return res.status(400).json({
        success: false,
        details: `Stock insuficiente para ${item.nombre}. Stock disponible: ${variant.stock}, Cantidad solicitada: ${item.cantidad}`
      });
    }
  }
  
  try {
    // Añadir la preventa al objeto de preventas
    preventas[preventaId] = preventaPayload;
    
    // Importar el módulo fs para leer el archivo PDF
    const fs = require('fs');
    const path = require('path');
    
    // Ruta al archivo PDF de muestra
    const pdfPath = path.join(__dirname, '../models/sample.pdf');
    
    // Leer el archivo PDF
    const pdfData = fs.readFileSync(pdfPath);
    
    // Establecer el tipo de contenido como PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=preventa-${preventaId}.pdf`);
    
    // Enviar el PDF como respuesta
    res.status(201).send(pdfData);
    
    console.log("Preventa agregada:", { id: preventaId, items: preventas[preventaId] });
  } catch (error) {
    console.error("Error al procesar la preventa:", error);
    return res.status(500).json({
      success: false,
      details: "Problema al hacer la preventa"
    });
  }
};

// Editar una preventa
exports.updatePreventa = (req, res) => {
  const { id } = req.params;
  const preventaPayload = req.body.preventa;
  
  console.log("ID de la preventa a editar: ", id);
  console.log("Datos recibidos para actualizar:", {
    params: req.params,
    body: req.body,
  });
  
  // Validar que el payload no venga vacío
  if (!preventaPayload || Object.keys(preventaPayload).length === 0) {
    return res.status(400).json({
      message: "La preventa no puede estar vacía."
    });
  }

  // Verificar que la preventa existe
  if (!preventas[id]) {
    return res.status(404).json({ message: "Preventa no encontrada." });
  }

  // Validar stock de los productos
  for (const [productVariantId, item] of Object.entries(preventaPayload)) {
    // Encontrar la variante de producto
    const variant = productVariants.find(v => v.id === parseInt(productVariantId));
    
    // Verificar que la variante existe
    if (!variant) {
      return res.status(400).json({
        message: `Variante de producto con ID ${productVariantId} no encontrada.`
      });
    }

    // Verificar que el stock sea suficiente
    if (variant.stock < item.cantidad) {
      return res.status(400).json({
        message: `Stock insuficiente para ${item.nombre}. Stock disponible: ${variant.stock}, Cantidad solicitada: ${item.cantidad}`
      });
    }
  }

  // Actualizar la preventa
  preventas[id] = preventaPayload;
  
  res.status(200).json({ id: id, items: preventas[id] });
  console.log("Preventa actualizada:", { id: id, items: preventas[id] });
};

// Eliminar una preventa
exports.deletePreventa = (req, res) => {
  const { id } = req.params;
  
  // Verificar que la preventa existe
  if (!preventas[id]) {
    return res.status(404).json({ message: "Preventa no encontrada." });
  }
  
  // Eliminar la preventa
  delete preventas[id];
  
  res.status(200).json({ message: "Preventa eliminada correctamente." });
  console.log("Preventa eliminada:", id);
};