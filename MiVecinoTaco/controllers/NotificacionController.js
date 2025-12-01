import { getNotificacionesPorUsuario, deleteNotificacion, deleteAllNotificaciones } from '../database/Database';
import { Notificacion } from '../models/Notificacion';

export class NotificacionController {
  async obtenerMisNotificaciones(usuarioId) {
    try {
      const data = await getNotificacionesPorUsuario(usuarioId);
      return data.map(
        (n) => new Notificacion(n.id, n.tipo, n.titulo, n.descripcion, n.tiempo)
      );
    } catch (e) {
      return [];
    }
  }

  async eliminar(id) {
    try {
      await deleteNotificacion(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async limpiarTodas(usuarioId) {
    try {
      await deleteAllNotificaciones(usuarioId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
