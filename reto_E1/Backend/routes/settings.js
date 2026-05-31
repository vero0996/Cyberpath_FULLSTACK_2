const express = require("express");
const bcrypt = require("bcrypt");

const pool = require("../db/db");

const router = express.Router();

/* =========================
   UPDATE PROFILE
========================= */
router.put("/user/:id", async (req, res) => {

  const { id } = req.params;

  const {
    username,
    email
  } = req.body;

  try {

    await pool.query(
      `
      CALL actualizar_usuario(
        $1,
        $2,
        $3
      )
      `,
      [
        id,
        username,
        email
      ]
    );

    res.json({
      message: "Perfil actualizado correctamente"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});

/* =========================
   CHANGE PASSWORD
========================= */
router.put("/user/:id/password", async (req, res) => {

  const { id } = req.params;

  const {
    currentPassword,
    newPassword
  } = req.body;

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM usuario
      WHERE id_usuario = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        error: "Usuario no encontrado"
      });

    }

    const user = result.rows[0];

    const validPassword =
      await bcrypt.compare(
        currentPassword,
        user.password_hash
      );

    if (!validPassword) {

      return res.status(400).json({
        error: "Contraseña actual incorrecta"
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await pool.query(
      `
      CALL cambiar_password(
        $1,
        $2
      )
      `,
      [
        id,
        hashedPassword
      ]
    );

    res.json({
      message: "Contraseña actualizada correctamente"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});

/* =========================
   CHANGE ROLE
========================= */
router.put("/user/:id/role", async (req, res) => {

  const { id } = req.params;

  const { role } = req.body;

  let roleId = 4;

  if (role === "employee") {
    roleId = 2;
  }

  if (role === "client") {
    roleId = 3;
  }

  if (role === "admin") {
    roleId = 1;
  }

  try {

    await pool.query(
      `
      CALL cambiar_rol(
        $1,
        $2
      )
      `,
      [
        id,
        roleId
      ]
    );

    res.json({
      message: "Rol actualizado correctamente"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;