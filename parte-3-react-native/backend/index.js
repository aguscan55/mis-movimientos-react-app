const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar tokens
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================

// Endpoint: Registro de usuario
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // 1. Verificar si el email ya existe
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // 2. Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insertar en la BD
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // 4. Generar token
    const token = jwt.sign(
      { id: result.insertId, email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' } // El token durará 7 días
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      token,
      user: { id: result.insertId, name, email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor al registrar usuario' });
  }
});

// Endpoint: Inicio de sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 1. Buscar al usuario
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];

    // 2. Comparar la contraseña enviada con la encriptada
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 3. Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
  }
});


// ==========================================
// RUTAS DE MOVIMIENTOS
// ==========================================

app.get('/api/movements', async (req, res) => {
  try {
    // Mejoramos esto agregando ORDER BY date DESC
    const [rows] = await pool.query('SELECT * FROM movements ORDER BY date DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
});

app.post('/api/movements', async (req, res) => {
  const { title, date, amount, type } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO movements (title, date, amount, type) VALUES (?, ?, ?, ?)',
      [title, date, amount, type]
    );
    
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
// ==========================================
// RUTAS DE TARJETAS
// ==========================================

app.get('/api/cards', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cards ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener tarjetas' });
  }
});

app.post('/api/cards', async (req, res) => {
  const { holder, number, expiry } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO cards (holder, number, expiry) VALUES (?, ?, ?)',
      [holder, number, expiry]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      holder, 
      number, 
      expiry 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la tarjeta' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});