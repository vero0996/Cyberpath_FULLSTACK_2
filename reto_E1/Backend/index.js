const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // es para encriptar contraseñas de los usuarios
const pool = require('./db/db');
const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// ruta de prueba para verificar conexión a DB
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ruta para registrar usuarios
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // validaciones
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Campos vacíos' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password muy corta' });
  }

  try {
    // verificar si ya existe
    const exists = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }

    // encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    // guardar en DB
    await pool.query(
      'INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashed]
    );

    res.status(201).json({ message: 'Usuario creado' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ruta para login de usuarios
app.post('/login', async (req, res) => {

  if (!req.body) {
    return res.status(400).json({ error: 'No body received' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Campos vacíos' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    res.json({ message: 'Login exitoso' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// levantar servidor
app.listen(3000, () => {
  console.log('http://localhost:3000');
});