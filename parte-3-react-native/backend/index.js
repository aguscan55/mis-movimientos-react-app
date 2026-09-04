const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = require('./authMiddleware');

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
// RUTAS DE AUTENTICACIÓN (Públicas)
// ==========================================

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const token = jwt.sign(
      { id: result.insertId, email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' } 
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      token,
      user: { id: result.insertId, name, email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

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
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// ==========================================
// RUTAS DE MOVIMIENTOS (Privadas)
// ==========================================

app.get('/api/movements', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM movements WHERE user_id = ? ORDER BY date DESC', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
});

app.post('/api/movements', verifyToken, async (req, res) => {
  const { title, date, amount, type } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO movements (user_id, title, date, amount, type) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, date, amount, type]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      user_id: req.user.id,
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
// RUTAS DE TARJETAS (Privadas)
// ==========================================

app.get('/api/cards', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cards WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener tarjetas' });
  }
});

app.post('/api/cards', verifyToken, async (req, res) => {
  const { holder, number, expiry } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO cards (user_id, holder, number, expiry) VALUES (?, ?, ?, ?)',
      [req.user.id, holder, number, expiry]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      user_id: req.user.id,
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