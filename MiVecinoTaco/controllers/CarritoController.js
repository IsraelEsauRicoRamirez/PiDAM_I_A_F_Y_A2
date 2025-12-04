export class CarritoController {
  static items = [];

  agregarProducto(producto) {
    const itemConId = { ...producto, cartId: Date.now().toString() };
    CarritoController.items.push(itemConId);
  }

  eliminarProducto(cartId) {
    CarritoController.items = CarritoController.items.filter(
      (item) => item.cartId !== cartId
    );
  }

  obtenerCarrito() {
    return CarritoController.items;
  }

  limpiarCarrito() {
    CarritoController.items = [];
  }

  obtenerTotal() {
    return CarritoController.items.reduce((total, item) => {
      // Asume precio tipo "$17", quita el $
      const precioNumerico = parseFloat(item.precio.replace('$', ''));
      return total + precioNumerico;
    }, 0);
  }
}