export class Comentario {
    constructor(id, usuarioNombre, texto, fecha, likes) {
        this.id = id;
        this.usuarioNombre = usuarioNombre;
        this.texto = texto;
        this.fecha = fecha;
        this.likes = likes;
    }
}