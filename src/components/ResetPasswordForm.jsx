import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { axios } from "../config/axios";

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
      axios.defaults.headers.common["Authorization"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njk3LCJpYXQiOjE3NDEyNTk2OTQsImV4cCI6MTc0MTM0NjA5NH0.QQSDJFJtKc0PaHBwn1VZJiyCp_1JKKjXHJud0UeqNc4";

      const response = await axios.post(
        "/api/v0/auth/reset-password",
        formData);
  
      if (response.status === 200) {
        setSuccess("Contraseña cambiada correctamente.");
        setError("");
        setFormData({ password: "", confirmPassword: "" });
      } else {
        throw new Error("Error al cambiar la contraseña");
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
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
