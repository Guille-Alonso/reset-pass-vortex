import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useParams } from "react-router-dom";

const ResetPasswordForm = () => {

  const { token } = useParams(); // Captura el token desde la URL


  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.password !== formData.confirmPassword) {
    //   setError("Las contraseñas no coinciden.");
    //   setSuccess("");
    //   return;
    // }

    try {
      const response = await fetch(
        "https://estadisticas.smt.gob.ar:6500/api/v0/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al cambiar la contraseña");
      }

      setSuccess("Contraseña cambiada correctamente.");
      setError("");
      setFormData({ password: "", confirmPassword: "" });
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Restablecer Contraseña
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Nueva Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Repetir Contraseña"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Enviar
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
