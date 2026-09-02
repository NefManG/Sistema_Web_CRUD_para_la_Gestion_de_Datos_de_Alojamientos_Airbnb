import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

const valoresIniciales = {
  name: "",
  property_type: "",
  room_type: "",
  accommodates: "",
  bedrooms: "",
  beds: "",
  price: "",
};

function AlojamientoFormDialog({
  open,
  onClose,
  onGuardar,
  guardando,
  alojamiento,
}) {
  const [formulario, setFormulario] = useState(valoresIniciales);

useEffect(() => {
  if (!open) {
    return;
  }
  if (alojamiento) {
    setFormulario({
      name: alojamiento.name ?? "",
      property_type: alojamiento.property_type ?? "",
      room_type: alojamiento.room_type ?? "",
      accommodates: alojamiento.accommodates ?? "",
      bedrooms: alojamiento.bedrooms ?? "",
      beds: alojamiento.beds ?? "",
      price: alojamiento.price ?? "",
    });
  } else {
    setFormulario(valoresIniciales);
  }
}, [open, alojamiento]);
  function manejarCambio(event) {
    const { name, value } = event.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  function manejarEnvio(event) {
    event.preventDefault();
    const datosAlojamiento = {
      name: formulario.name,
      property_type: formulario.property_type,
      room_type: formulario.room_type,
      accommodates: Number(formulario.accommodates),
      bedrooms: Number(formulario.bedrooms),
      beds: Number(formulario.beds),
      price: formulario.price,
    };

    onGuardar(datosAlojamiento);
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={manejarEnvio}>
        <DialogTitle>
          {alojamiento ? "Editar alojamiento" : "Nuevo alojamiento"}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{ mt: 0.5 }}
          >
            <Grid size={12}>
              <TextField
                name="name"
                label="Nombre"
                value={formulario.name}
                onChange={manejarCambio}
                fullWidth
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                name="property_type"
                label="Tipo de propiedad"
                value={formulario.property_type}
                onChange={manejarCambio}
                fullWidth
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                name="room_type"
                label="Tipo de habitación"
                value={formulario.room_type}
                onChange={manejarCambio}
                fullWidth
                required
              />
            </Grid>

            <Grid size={4}>
              <TextField
                name="accommodates"
                label="Huéspedes"
                type="number"
                value={formulario.accommodates}
                onChange={manejarCambio}
                fullWidth
                required
                inputProps={{
                  min: 1,
                }}
              />
            </Grid>

            <Grid size={4}>
              <TextField
                name="bedrooms"
                label="Dormitorios"
                type="number"
                value={formulario.bedrooms}
                onChange={manejarCambio}
                fullWidth
                required
                inputProps={{
                  min: 0,
                }}
              />
            </Grid>

            <Grid size={4}>
              <TextField
                name="beds"
                label="Camas"
                type="number"
                value={formulario.beds}
                onChange={manejarCambio}
                fullWidth
                required
                inputProps={{
                  min: 0,
                }}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                name="price"
                label="Precio"
                type="number"
                value={formulario.price}
                onChange={manejarCambio}
                fullWidth
                required
                inputProps={{
                  min: 0,
                  step: "0.01",
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            disabled={guardando}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={guardando}
          >
            {guardando
              ? alojamiento
                ? "Actualizando..."
                : "Guardando..."
              : alojamiento
                ? "Actualizar"
                : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
export default AlojamientoFormDialog;