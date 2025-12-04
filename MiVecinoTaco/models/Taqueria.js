
export default class Taqueria {
  constructor(id, nombre, direccion, telefono, horario, usuario_id) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.horario = horario;
    this.usuario_id = usuario_id; 
  }

  
  static fromDatabase(data) {
    if (!data) return null;
    return new Taqueria(
      data.id,
      data.nombre,
      data.direccion,
      data.telefono,
      data.horario,
      data.usuario_id
    );
  }
}