const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const pool = require("./db/db");
const settingsRoutes = require("./routes/settings");
const userRoutes = require("./routes/usuarios");
const kpiRoutes = require("./routes/kpi");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(cors());

/* =========================
   ROUTES
========================= */
app.use("/settings", settingsRoutes);
app.use("/usuarios", userRoutes);
app.use("/kpi", kpiRoutes);

console.log("🚀 INDEX CARGADO CORRECTAMENTE");

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  console.log("📍 GET /");
  res.send("Backend funcionando");
});

/* =========================
   REGISTER
========================= */
app.post("/register", async (req, res) => {
  console.log("📍 POST /register", req.body);

  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    console.log("⚠️ Campos vacíos en register");
    return res.status(400).json({ error: "Campos vacíos" });
  }

  try {
    const exists = await pool.query(
      `SELECT * FROM usuario WHERE correo = $1`,
      [email]
    );

    if (exists.rows.length > 0) {
      console.log("⚠️ Usuario ya existe:", email);
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const hashed = await bcrypt.hash(password, 10);

    let roleId = 4;
    if (role === "employee") roleId = 2;
    if (role === "client") roleId = 3;

    const newUser = await pool.query(
  `
  INSERT INTO usuario
  (username, correo, password_hash, fecha_registro, estado, id_rol)
  VALUES ($1, $2, $3, CURRENT_DATE, 'Activo', $4)
  RETURNING id_usuario, username, correo, id_rol
  `,
  [username, email, hashed, roleId]
);

    const user = newUser.rows[0];

    let roleName = "guest";
    if (roleId === 2) roleName = "employee";
    if (roleId === 3) roleName = "client";

    console.log("✅ Usuario creado:", email);
    res.status(201).json({
      message: "Usuario creado",
      user: {
        id: user.id_usuario,
        username: user.username,
        email: user.correo,
        role: roleName
      }
    });
    } catch (err) {
      console.error("❌ ERROR REGISTER:", err);
      res.status(500).json({ error: err.message });
    }
});

/* =========================
   LOGIN
========================= */
app.post("/login", async (req, res) => {
  console.log("📍 POST /login", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("⚠️ Campos vacíos login");
    return res.status(400).json({ error: "Campos vacíos" });
  }

  try {
    const result = await pool.query(
      `
      SELECT u.*, r.nombre_rol
      FROM usuario u
      JOIN rol r ON u.id_rol = r.id_rol
      WHERE u.correo = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      console.log("⚠️ Usuario no encontrado:", email);
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      console.log("⚠️ Password incorrecto:", email);
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    let role = "guest";
    if (user.nombre_rol === "Empleado") role = "employee";
    if (user.nombre_rol === "Cliente") role = "client";
    if (user.nombre_rol === "Administrador") role = "admin";

    console.log("✅ LOGIN OK:", email);

    res.json({
      message: "Login exitoso",
      user: {
        id: user.id_usuario,
        username: user.username,
        email: user.correo,
        role
      }
    });
  } catch (err) {
    console.error("❌ ERROR LOGIN:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   UPDATE PROFILE
========================= */
app.put("/user/:id", async (req, res) => {
  console.log("📍 PUT /user/:id", req.params.id, req.body);

  const { id } = req.params;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "Campos vacíos" });
  }

  try {
    const exists = await pool.query(
      `SELECT * FROM usuario WHERE correo = $1 AND id_usuario != $2`,
      [email, id]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ error: "El correo ya está en uso" });
    }

    await pool.query(
      `UPDATE usuario SET username = $1, correo = $2 WHERE id_usuario = $3`,
      [username, email, id]
    );

    console.log("✅ Perfil actualizado:", id);
    res.json({ message: "Perfil actualizado correctamente" });
  } catch (err) {
    console.error("❌ ERROR UPDATE PROFILE:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   UPDATE PASSWORD
========================= */
app.put("/user/:id/password", async (req, res) => {
  console.log("📍 PUT /user/:id/password", req.params.id);

  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Campos vacíos" });
  }

  try {
    const result = await pool.query(
      `SELECT password_hash FROM usuario WHERE id_usuario = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(currentPassword, user.password_hash);

    if (!valid) {
      console.log("⚠️ Contraseña actual incorrecta:", id);
      return res.status(400).json({ error: "Contraseña actual incorrecta" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE usuario SET password_hash = $1 WHERE id_usuario = $2`,
      [hashed, id]
    );

    console.log("✅ Contraseña actualizada:", id);
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error("❌ ERROR UPDATE PASSWORD:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   UPDATE ROLE
========================= */
app.put("/user/:id/role", async (req, res) => {
  console.log("📍 PUT /user/:id/role", req.params.id, req.body);

  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: "Role requerido" });
  }

  let roleId = 4;
  if (role === "employee") roleId = 2;
  if (role === "client") roleId = 3;
  if (role === "admin") roleId = 1;

  try {
    await pool.query(
      `UPDATE usuario SET id_rol = $1 WHERE id_usuario = $2`,
      [roleId, id]
    );

    console.log("✅ Rol actualizado:", id, role);
    res.json({ message: "Rol actualizado correctamente" });
  } catch (err) {
    console.error("❌ ERROR UPDATE ROLE:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   KPI POST
========================= */
app.post("/kpi", async (req, res) => {
  console.log("📍 POST /kpi", req.body);

  const { id_usuario, tiempo_jugado, amenazas_detectadas, progreso, tasa_retencion } = req.body;

  if (!id_usuario) {
    console.log("⚠️ Falta id_usuario");
    return res.status(400).json({ error: "id_usuario requerido" });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO KPI_Usuario
      (id_usuario, tiempo_jugado, amenazas_detectadas, progreso, tasa_retencion, fecha_registro)
      VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
      RETURNING *
      `,
      [id_usuario, tiempo_jugado, amenazas_detectadas, progreso, tasa_retencion]
    );

    console.log("✅ KPI guardado:", result.rows[0]);
    res.status(201).json({ message: "KPI guardado", data: result.rows[0] });
  } catch (err) {
    console.error("❌ ERROR KPI:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   KPI GET BY USER
========================= */
app.get("/kpi/:id", async (req, res) => {
  console.log("📍 GET /kpi/:id", req.params.id);

  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT *
      FROM KPI_Usuario
      WHERE id_usuario = $1
      ORDER BY fecha_registro DESC
      `,
      [id]
    );

    console.log(`📊 KPI encontrados: ${result.rows.length}`);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ ERROR GET KPI:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   SERVER START
========================= */
app.listen(3000, () => {
  console.log("🌐 Servidor en http://localhost:3000");
});