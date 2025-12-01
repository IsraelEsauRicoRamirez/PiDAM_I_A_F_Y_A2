import { addFavorito, removeFavorito, getFavoritos } from '../database/Database';

export class FavoritoController {
  async obtenerMisFavoritos(usuarioId) {
    try {
      const result = await getFavoritos(usuarioId);
      return result.map((r) => r.taqueria_nombre);
    } catch (e) {
      return [];
    }
  }

  async toggleFavorito(usuarioId, nombreTaqueria, esFavoritoActualmente) {
    try {
      if (esFavoritoActualmente) {
        await removeFavorito(usuarioId, nombreTaqueria);
        return false;
      } else {
        await addFavorito(usuarioId, nombreTaqueria);
        return true;
      }
    } catch (e) {
      console.log(e);
      return esFavoritoActualmente;
    }
  }
}
