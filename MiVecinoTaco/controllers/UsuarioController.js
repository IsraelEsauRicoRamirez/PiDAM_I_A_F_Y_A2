import {
  insertUsuario,
  loginUsuario,
  insertNotificacion,
  getContrasenaPorCorreo,
  updateUsuario
} from '../database/Database';

import { Usuario } from '../models/Usuario';

export class UsuarioController {
  static usuarioActivo = null;

  async registrar(nombre, correo, telefono, contrasena) {
    if (!nombre || !correo || !contrasena) {
      return { success: false, msg: 'Faltan datos.' };
    }

    try {
      const res = await insertUsuario(
        nombre,
        correo.toLowerCase(),
        telefono,
        contrasena
      );
      if (res.lastInsertRowId) {
        await insertNotificacion(
          res.lastInsertRowId,
          'mensaje',
          '¡Bienvenido a Mi Vecino el Taco!',
          'Gracias por registrarte. Revisa nuestro menú y pide tus tacos favoritos.',
          'Ahora'
        );
      }
      return { success: true };
    } catch (error) {
      return { success: false, msg: 'El correo ya existe.' };
    }
  }

  async validarLogin(correo, contrasena) {
    try {
      const data = await loginUsuario(
        correo.toLowerCase(),
        contrasena
      );
      if (data) {
        const userObj = new Usuario(
          data.id,
          data.nombre,
          data.correo,
          data.telefono,
          data.contrasena
        );
        UsuarioController.usuarioActivo = userObj;
        return userObj;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // --- NUEVO: Recuperar Contraseña ---
  async recuperarContrasena(correo) {
    try {
      const res = await getContrasenaPorCorreo(correo.toLowerCase());
      if (res) {
        return { success: true, password: res.contrasena };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  }

  // --- NUEVO: Editar Usuario ---
  async editarDatos(id, nombre, telefono, contrasena) {
    try {
      await updateUsuario(id, nombre, telefono, contrasena);
      if (UsuarioController.usuarioActivo) {
        UsuarioController.usuarioActivo.nombre = nombre;
        UsuarioController.usuarioActivo.telefono = telefono;
        UsuarioController.usuarioActivo.contrasena = contrasena;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  getUsuarioActivo() {
    return UsuarioController.usuarioActivo;
  }

  cerrarSesion() {
    UsuarioController.usuarioActivo = null;
  }
}