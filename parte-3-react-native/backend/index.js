const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const authMiddleware = require('./authMiddleware');
const userController = require('./controllers/userController');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, has_investor_profile) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, 'active', false]
    );
    const user = { id: result.insertId, name, email, role: 'active', has_investor_profile: false };
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (error) {
    console.error('ERROR EN REGISTER:', error); // <-- AGREGÁ ESTA LÍNEA
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });
    
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    const userData = { 
      id: user.id, name: user.name, email: user.email, 
      role: user.role, has_investor_profile: !!user.has_investor_profile 
    };
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

app.get('/api/user/config', authMiddleware, userController.getNavigationConfig);
app.post('/api/user/investor-profile', authMiddleware, userController.submitInvestorTest);

// Endpoints de movimientos y tarjetas que ya tenías
app.get('/api/movements', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movements WHERE user_id = ? ORDER BY date DESC', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
});

app.get('/api/cards', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cards WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tarjetas' });
  }
});

app.post('/api/cards', authMiddleware, async (req, res) => {
  try {
    const { holder, number, expiry } = req.body;
    const [result] = await db.query(
      'INSERT INTO cards (user_id, holder, number, expiry) VALUES (?, ?, ?, ?)',
      [req.user.id, holder, number, expiry]
    );
    res.json({ id: result.insertId, holder, number, expiry });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar tarjeta' });
  }
});
  
app.post('/api/movements', authMiddleware, async (req, res) => {
  try {
    const { title, amount, type } = req.body;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const [result] = await db.query(
      'INSERT INTO movements (user_id, title, date, amount, type) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, date, amount, type || 'ingreso']
    );

    res.json({ id: result.insertId, user_id: req.user.id, title, date, amount, type });
  } catch (error) {
    console.error('Error al insertar movimiento:', error);
    res.status(500).json({ error: 'Error al registrar el movimiento', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});