const express = require("express");
const router = express.Router();

const pool = require("../db/db");

router.post("/", async (req, res) => {
  const {
    id_usuario,
    tiempo_jugado,
    amenazas_detectadas,
    progreso,
    tasa_retencion
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO KPI_Usuario
      (id_usuario, tiempo_jugado, amenazas_detectadas, progreso, tasa_retencion, fecha_registro)
      VALUES ($1,$2,$3,$4,$5,CURRENT_DATE)
      RETURNING *`,
      [id_usuario, tiempo_jugado, amenazas_detectadas, progreso, tasa_retencion]
    );

    res.status(201).json({
      message: "KPI guardado",
      data: result.rows[0]
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats/global", async (req, res) => {
  try {

    const totalUsuarios = await pool.query(`
      SELECT COUNT(*) FROM usuario
    `);

    const totalPartidas = await pool.query(`
      SELECT COUNT(*) FROM kpi_usuario
    `);

    const promedioAmenazas = await pool.query(`
      SELECT AVG(amenazas_detectadas) as promedio
      FROM kpi_usuario
    `);

    const promedioTiempo = await pool.query(`
      SELECT AVG(tiempo_jugado) as promedio
      FROM kpi_usuario
    `);

    res.json({
      usuarios: totalUsuarios.rows[0].count,
      partidas: totalPartidas.rows[0].count,
      amenazas: promedioAmenazas.rows[0].promedio,
      tiempo: promedioTiempo.rows[0].promedio
    });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM KPI_Usuario WHERE id_usuario = $1 ORDER BY fecha_registro DESC`,
      [id]
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;