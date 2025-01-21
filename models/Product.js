// Ejemplo nada más
// No se utiliza porque tenemos la data hardcodeada
// Si se usa una base de datos, se debería revisar los esquemas a construir
class Product {
    constructor(id, name, price, stock) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.stock = stock;
    }
  }
  
  module.exports = Product;
  