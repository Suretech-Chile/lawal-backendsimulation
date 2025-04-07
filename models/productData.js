// Diccionario de productos base
const baseProducts = {
    1: "Martillo Profesional",
    2: "Madera de Pino",
    3: "Tornillos Galvanizados",
    4: "Cemento Portland"
};

// Simulamos una base de datos de variantes de productos
const productVariants = [
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

// Funciones de utilidad

const generateCode = (nombre, calidad, state, paquete) => { // Función para generar código según el nuevo formato
    // [3 primeros caracteres del nombre]-[2 dígitos calidad]-[2 dígitos state]-[3 dígitos paquete]

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

module.exports = {
  baseProducts,
  productVariants,
  generateCode,
  validateCode
};