import {
  insertUsuario,
  loginUsuario,
  insertNotificacion
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
        
        
        if (error.message && error.message.includes('UNIQUE constraint failed')) {
            
            return { success: false, msg: 'El correo electrónico ya está registrado.' };
        }

        
        console.error('Error durante el registro (Verificar tablas de la DB):', error.message); 
        
        return { success: false, msg: 'Error de la base de datos al registrar el usuario. Por favor, intenta de nuevo o revisa tu entorno de desarrollo.' };
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

  getUsuarioActivo() {
    return UsuarioController.usuarioActivo;
  }

  cerrarSesion() {
    UsuarioController.usuarioActivo = null;
  }
}