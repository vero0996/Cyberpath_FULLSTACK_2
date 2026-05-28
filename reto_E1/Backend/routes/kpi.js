const express = require("express");
const router = express.Router();

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