import {
  getProductos,
  insertPedido,
  getPedidosPorUsuario,
  insertNotificacion
} from '../database/Database';

import { Pedido } from '../models/Pedido';

export class PedidoController {
  async obtenerMenu() {
    try {
      return await getProductos();
    } catch (e) {
      return [];
    }
  }

  async realizarPedido(usuarioId, nombreProducto) {
    const fecha = new Date().toLocaleDateString();

    try {
      await insertPedido(usuarioId, nombreProducto, fecha);

      await insertNotificacion(
        usuarioId,
        'pedido',
        'Pedido Confirmado',
        `Tu orden de ${nombreProducto} ha sido recibida y se está preparando.`,
        'Hace un momento'
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async obtenerHistorial(usuarioId) {
    try {
      const data = await getPedidosPorUsuario(usuarioId);
      return data.map(
        (p) => new Pedido(p.id, p.nombre_producto, p.fecha, p.estado)
      );
    } catch (e) {
      return [];
    }
  }
}
