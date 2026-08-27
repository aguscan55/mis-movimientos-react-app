require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 2. Endpoint GET: Leer desde la tabla 'movements'
app.get('/api/movements', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM movements');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los movimientos de la base de datos' });
  }
});

// 3. Endpoint POST: Insertar en la tabla 'movements'
app.post('/api/movements', async (req, res) => {
  // 1. Agregamos 'date' a la extracción de datos
  const { title, date, amount, type } = req.body;
  
  try {
    // 2. Agregamos 'date' a las columnas y un signo de interrogación (?) extra
    const [result] = await pool.query(
      'INSERT INTO movements (title, date, amount, type) VALUES (?, ?, ?, ?)',
      [title, date, amount, type]
    );
    
    // Devolvemos el objeto completo
    res.status(201).json({ 
      id: result.insertId, 
      title, 
      date,
      amount, 
      type 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el movimiento' });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});