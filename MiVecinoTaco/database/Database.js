import * as SQLite from 'expo-sqlite';

const DB_NAME = 'mivecinoeltaco_pro.db';
let dbInstance = null;

const getDB = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
    await dbInstance.execAsync('PRAGMA journal_mode = WAL;');
    await initTables(dbInstance);
  }
  return dbInstance;
};

const initTables = async (db) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL UNIQUE,
      telefono TEXT,
      contrasena TEXT NOT NULL
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      precio TEXT,
      categoria TEXT
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY NOT NULL,
      usuario_id INTEGER,
      nombre_producto TEXT,
      fecha TEXT,
      estado TEXT
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS comentarios (
      id INTEGER PRIMARY KEY NOT NULL,
      usuario_nombre TEXT,
      texto TEXT,
      fecha TEXT,
      likes INTEGER
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notificaciones (
      id INTEGER PRIMARY KEY NOT NULL,
      usuario_id INTEGER,
      tipo TEXT,
      titulo TEXT,
      descripcion TEXT,
      tiempo TEXT
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS favoritos (
      id INTEGER PRIMARY KEY NOT NULL,
      usuario_id INTEGER,
      taqueria_nombre TEXT
    );
  `);

  const conteo = await db.getFirstAsync(
    'SELECT count(*) as count FROM productos'
  );
  if (conteo.count === 0) {
    await db.runAsync(`
      INSERT INTO productos (nombre, descripcion, precio, categoria) VALUES 
      ('TACOS DE BISTEC', 'Bistec con cebolla asada', '$17', 'tacos'),
      ('TACOS DE PASTOR', 'Cerdo adobado con piña', '$15', 'tacos'),
      ('TACOS DE SESOS', 'Mezcla de carnes', '$10', 'tacos'),
      ('AGUA DE HORCHATA', 'Vaso 500 ml', '$12', 'bebidas'),
      ('REFRESCO', 'Lata 355 ml', '$18', 'bebidas'),
      ('GUACAMOLE', 'Porción individual', '$10', 'extras');
    `);
  }
};

export const insertUsuario = async (nombre, correo, telefono, contrasena) => {
  const db = await getDB();
  return await db.runAsync(
    'INSERT INTO usuarios (nombre, correo, telefono, contrasena) VALUES (?, ?, ?, ?);',
    [nombre, correo, telefono, contrasena]
  );
};

export const loginUsuario = async (correo, contrasena) => {
  const db = await getDB();
  return await db.getFirstAsync(
    'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?;',
    [correo, contrasena]
  );
};

export const getProductos = async () => {
  const db = await getDB();
  return await db.getAllAsync('SELECT * FROM productos;');
};

export const insertPedido = async (usuarioId, nombreProducto, fecha) => {
  const db = await getDB();
  return await db.runAsync(
    'INSERT INTO pedidos (usuario_id, nombre_producto, fecha, estado) VALUES (?, ?, ?, ?);',
    [usuarioId, nombreProducto, fecha, 'En proceso']
  );
};

export const getPedidosPorUsuario = async (usuarioId) => {
  const db = await getDB();
  return await db.getAllAsync(
    'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY id DESC;',
    [usuarioId]
  );
};

export const insertComentario = async (usuarioNombre, texto, fecha) => {
  const db = await getDB();
  return await db.runAsync(
    'INSERT INTO comentarios (usuario_nombre, texto, fecha, likes) VALUES (?, ?, ?, ?);',
    [usuarioNombre, texto, fecha, 0]
  );
};

export const getComentarios = async () => {
  const db = await getDB();
  return await db.getAllAsync(
    'SELECT * FROM comentarios ORDER BY id DESC;'
  );
};

export const updateComentarioLikes = async (id, nuevosLikes) => {
  const db = await getDB();
  return await db.runAsync(
    'UPDATE comentarios SET likes = ? WHERE id = ?;',
    [nuevosLikes, id]
  );
};

export const insertNotificacion = async (usuarioId, tipo, titulo, descripcion, tiempo) => {
  const db = await getDB();
  return await db.runAsync(
    'INSERT INTO notificaciones (usuario_id, tipo, titulo, descripcion, tiempo) VALUES (?, ?, ?, ?, ?);',
    [usuarioId, tipo, titulo, descripcion, tiempo]
  );
};

export const getNotificacionesPorUsuario = async (usuarioId) => {
  const db = await getDB();
  return await db.getAllAsync(
    'SELECT * FROM notificaciones WHERE usuario_id = ? ORDER BY id DESC;',
    [usuarioId]
  );
};

export const deleteNotificacion = async (id) => {
  const db = await getDB();
  return await db.runAsync(
    'DELETE FROM notificaciones WHERE id = ?;',
    [id]
  );
};

export const deleteAllNotificaciones = async (usuarioId) => {
  const db = await getDB();
  return await db.runAsync(
    'DELETE FROM notificaciones WHERE usuario_id = ?;',
    [usuarioId]
  );
};

export const addFavorito = async (usuarioId, taqueriaNombre) => {
  const db = await getDB();
  const existe = await db.getFirstAsync(
    'SELECT * FROM favoritos WHERE usuario_id = ? AND taqueria_nombre = ?;',
    [usuarioId, taqueriaNombre]
  );
  if (!existe) {
    return await db.runAsync(
      'INSERT INTO favoritos (usuario_id, taqueria_nombre) VALUES (?, ?);',
      [usuarioId, taqueriaNombre]
    );
  }
};

export const removeFavorito = async (usuarioId, taqueriaNombre) => {
  const db = await getDB();
  return await db.runAsync(
    'DELETE FROM favoritos WHERE usuario_id = ? AND taqueria_nombre = ?;',
    [usuarioId, taqueriaNombre]
  );
};

export const getFavoritos = async (usuarioId) => {
  const db = await getDB();
  return await db.getAllAsync(
    'SELECT taqueria_nombre FROM favoritos WHERE usuario_id = ?;',
    [usuarioId]
  );
};

// --- NUEVAS FUNCIONES ---

export const getContrasenaPorCorreo = async (correo) => {
  const db = await getDB();
  return await db.getFirstAsync(
    'SELECT contrasena FROM usuarios WHERE correo = ?;',
    [correo]
  );
};

export const updateUsuario = async (id, nombre, telefono, contrasena) => {
  const db = await getDB();
  return await db.runAsync(
    'UPDATE usuarios SET nombre = ?, telefono = ?, contrasena = ? WHERE id = ?;',
    [nombre, telefono, contrasena, id]
  );
};