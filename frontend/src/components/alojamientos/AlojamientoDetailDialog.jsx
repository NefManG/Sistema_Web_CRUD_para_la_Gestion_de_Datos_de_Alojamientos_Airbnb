import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";


function AlojamientoDetailDialog({
  open,
  alojamiento,
  onClose,
  cargando,
}) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        Detalle del alojamiento
      </DialogTitle>


      <Divider />


      <DialogContent>

        {/* CARGANDO */}

        {cargando && (
          <Box
            sx={{
              py: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}


        {/* INFORMACIÓN DEL ALOJAMIENTO */}

        {!cargando && alojamiento && (

          <Grid
            container
            spacing={3}
            sx={{ mt: 0.5 }}
          >

            {/* NOMBRE */}

            <Grid size={12}>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Nombre
              </Typography>

              <Typography variant="body1">
                {alojamiento.name}
              </Typography>

            </Grid>


            {/* TIPO DE PROPIEDAD */}

            <Grid size={6}>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Tipo de propiedad
              </Typography>

              <Typography variant="body1">
                {alojamiento.property_type}
              </Typography>

            </Grid>


            {/* TIPO DE HABITACIÓN */}

            <Grid size={6}>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Tipo de habitación
              </Typography>

              <Typography variant="body1">
                {alojamiento.room_type}
              </Typography>

            </Grid>


            {/* HUÉSPEDES */}

            <Grid size={4}>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Huéspedes
              </Typography>

              <Typography variant="body1">
                {alojamiento.accommodates}
              </Typography>

            </Grid>


            {/* DORMITORIOS */}

            <Grid size={4}>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Dormitorios
              </Typography>

              <Typography variant="body1">
                {alojamiento.bedrooms}
              </Typography>

            </Grid>


            {/* CAMAS */}

            <Grid size={4}>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Camas
              </Typography>

              <Typography variant="body1">
                {alojamiento.beds}
              </Typography>

            </Grid>


            {/* PRECIO */}

            <Grid size={12}>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Precio
              </Typography>

              <Typography
                variant="h6"
              >
                {Number(alojamiento.price).toFixed(2)}
              </Typography>

            </Grid>


            {/* ID */}

            <Grid size={12}>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Identificador
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all",
                }}
              >
                {alojamiento._id}
              </Typography>

            </Grid>

          </Grid>

        )}

      </DialogContent>


      <DialogActions>

        <Button
          variant="contained"
          onClick={onClose}
          disabled={cargando}
        >
          Cerrar
        </Button>

      </DialogActions>

    </Dialog>
  );

}


export default AlojamientoDetailDialog;