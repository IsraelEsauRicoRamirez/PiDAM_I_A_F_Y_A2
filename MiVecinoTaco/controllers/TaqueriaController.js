import { insertTaqueria, getAllTaquerias, getTaqueriaById } from '../database/Database';
import Taqueria from '../models/Taqueria';


export const registrarTaqueria = async (nombre, direccion, telefono, horario, usuarioId) => {
  if (!nombre || !direccion || !usuarioId) {
    return { error: true, mensaje: 'El nombre, dirección y el ID de usuario son obligatorios.' };
  }

  try {
    const result = await insertTaqueria(nombre, direccion, telefono, horario, usuarioId);

    
    if (result && result.lastInsertRowId) {
      return { 
        error: false, 
        mensaje: 'Taquería registrada exitosamente.', 
        id: result.lastInsertRowId 
      };
    } else {
      return { error: true, mensaje: 'Error desconocido al registrar la taquería.' };
    }
  } catch (e) {
    console.error('Error al registrar taquería:', e);
    
    return { error: true, mensaje: `Hubo un error en la base de datos: ${e.message}` };
  }
};


export const obtenerTodasLasTaquerias = async () => {
  try {
    const taqueriasData = await getAllTaquerias();

    
    const taquerias = taqueriasData.map(data => Taqueria.fromDatabase(data));
    
    return taquerias;

  } catch (e) {
    console.error('Error al obtener taquerías:', e);
    return []; 
  }
};


export const obtenerTaqueriaPorId = async (id) => {
    try {
        const taqueriaData = await getTaqueriaById(id);
        
        
        return Taqueria.fromDatabase(taqueriaData); 
        
    } catch (e) {
        console.error(`Error al obtener taquería con ID ${id}:`, e);
        return null;
    }
};

