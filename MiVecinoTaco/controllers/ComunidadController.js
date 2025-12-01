import {
  getComentarios,
  insertComentario,
  updateComentarioLikes,
} from '../database/Database';
import { Comentario } from '../models/Comentario';

export class ComunidadController {
  async obtenerComentarios() {
    try {
      const datos = await getComentarios();
      return datos.map(
        (c) => new Comentario(c.id, c.usuario_nombre, c.texto, c.fecha, c.likes)
      );
    } catch (error) {
      return [];
    }
  }

  async publicar(usuarioNombre, texto) {
    const fecha = 'Hace un momento';

    try {
      await insertComentario(usuarioNombre, texto, fecha);
      return true;
    } catch (error) {
      return false;
    }
  }

  async darLike(comentarioId, likesActuales) {
    try {
      const nuevosLikes = likesActuales + 1;
      await updateComentarioLikes(comentarioId, nuevosLikes);
      return true;
    } catch (error) {
      return false;
    }
  }
}
