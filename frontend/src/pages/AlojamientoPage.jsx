import { useCallback, useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Pagination,
  Snackbar,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import AppHeader from "../components/layout/AppHeader.jsx";
import AlojamientoTable from "../components/alojamientos/AlojamientoTable.jsx";
import AlojamientoFormDialog from "../components/alojamientos/AlojamientoFormDialog.jsx";
import AlojamientoDetailDialog from "../components/alojamientos/AlojamientoDetailDialog.jsx";
import DeleteDialog from "../components/alojamientos/DeleteDialog.jsx";

import {
  listarAlojamientos,
  obtenerAlojamiento,
  crearAlojamiento,
  actualizarAlojamiento,
  eliminarAlojamiento,
} from "../services/alojamientoService.js";

const LIMITE_POR_PAGINA = 5;

function AlojamientosPage() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [alojamientoEditar, setAlojamientoEditar] = useState(null);
  const [alojamientoDetalle, setAlojamientoDetalle] = useState(null);
  const [detailDialogAbierto, setDetailDialogAbierto] = useState(false);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [alojamientoEliminar, setAlojamientoEliminar] = useState(null);
  const [deleteDialogAbierto, setDeleteDialogAbierto] =
    useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [mensaje, setMensaje] = useState({
    open: false,
    texto: "",
    tipo: "success",
  });
  const cargarAlojamientos = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const respuesta = await listarAlojamientos(
        pagina,
        LIMITE_POR_PAGINA
      );
      setAlojamientos(respuesta.items);
      setTotalPaginas(respuesta.total_pages);
      setTotalRegistros(respuesta.total);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }, [pagina]);

  useEffect(() => {
    cargarAlojamientos();
  }, [cargarAlojamientos]);

  function abrirDialogo() {
    setAlojamientoEditar(null);
    setDialogAbierto(true);
  }

  function abrirEditar(alojamiento) {
    setAlojamientoEditar(alojamiento);
    setDialogAbierto(true);
  }

  function cerrarDialogo() {
    if (guardando) {
      return;
    }
    setDialogAbierto(false);
    setAlojamientoEditar(null);
  }

  async function manejarGuardarAlojamiento(datosAlojamiento) {
    try {
      setGuardando(true);
      setError(null);
      if (alojamientoEditar) {
        await actualizarAlojamiento(
          alojamientoEditar._id,
          datosAlojamiento
        );
        setMensaje({
          open: true,
          texto: "Alojamiento actualizado correctamente",
          tipo: "success",
        });
      }
      else {
        await crearAlojamiento(datosAlojamiento);
        setMensaje({
          open: true,
          texto: "Alojamiento creado correctamente",
          tipo: "success",
        });
      }
      setDialogAbierto(false);
      setAlojamientoEditar(null);
      await cargarAlojamientos();
    } catch (error) {
      setMensaje({
        open: true,
        texto: error.message,
        tipo: "error",
      });
    } finally {
      setGuardando(false);
    }
  }

  async function abrirDetalle(alojamiento) {
    try {
      setCargandoDetalle(true);
      const detalle = await obtenerAlojamiento(
        alojamiento._id
      );
      setAlojamientoDetalle(detalle);
      setDetailDialogAbierto(true);
    } catch (error) {
      setMensaje({
        open: true,
        texto: error.message,
        tipo: "error",
      });
    } finally {

      setCargandoDetalle(false);
    }
  }

  function cerrarDetalle() {
    setDetailDialogAbierto(false);
    setAlojamientoDetalle(null);
  }

  function abrirEliminar(alojamiento) {
    setAlojamientoEliminar(alojamiento);
    setDeleteDialogAbierto(true);
  }

  function cerrarEliminar() {
    if (eliminando) {
      return;
    }
    setDeleteDialogAbierto(false);
    setAlojamientoEliminar(null);
  }

  async function manejarEliminarAlojamiento() {

    if (!alojamientoEliminar) {
      return;
    }
    try {
      setEliminando(true);
      await eliminarAlojamiento(
        alojamientoEliminar._id
      );
      setDeleteDialogAbierto(false);
      setAlojamientoEliminar(null);
      setMensaje({
        open: true,
        texto: "Alojamiento eliminado correctamente",
        tipo: "success",
      });
      if (
        alojamientos.length === 1 &&
        pagina > 1
      ) {

        setPagina(
          (paginaActual) => paginaActual - 1
        );

      } else {

        await cargarAlojamientos();

      }

    } catch (error) {

      setMensaje({
        open: true,
        texto: error.message,
        tipo: "error",
      });

    } finally {

      setEliminando(false);

    }

  }

  function manejarCambioPagina(event, nuevaPagina) {

    setPagina(nuevaPagina);

  }

  function cerrarMensaje() {

    setMensaje((mensajeActual) => ({
      ...mensajeActual,
      open: false,
    }));

  }

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>

            <Typography variant="h4">
              Alojamientos
            </Typography>
            <Typography color="text.secondary">
              Administración de alojamientos registrados
            </Typography>

          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={abrirDialogo}
          >
            Nuevo alojamiento
          </Button>

        </Box>
        {!cargando && !error && (

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            Total de alojamientos: {totalRegistros}
          </Typography>

        )}

        {error && (

          <Alert
            severity="error"
            sx={{ mt: 3 }}
          >
            {error}
          </Alert>

        )}

        {cargando && (

          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >

            <CircularProgress />

          </Box>

        )}

        {!cargando && !error && (

          <AlojamientoTable
            alojamientos={alojamientos}
            onVer={abrirDetalle}
            onEditar={abrirEditar}
            onEliminar={abrirEliminar}
          />

        )}

        {!cargando &&
          !error &&
          totalPaginas > 1 && (

            <Box
              sx={{
                mt: 3,
                mb: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >

              <Pagination
                count={totalPaginas}
                page={pagina}
                onChange={manejarCambioPagina}
                color="primary"
                showFirstButton
                showLastButton
              />

            </Box>

          )}

      </Container>

      <AlojamientoFormDialog
        open={dialogAbierto}
        onClose={cerrarDialogo}
        onGuardar={manejarGuardarAlojamiento}
        guardando={guardando}
        alojamiento={alojamientoEditar}
      />

      <AlojamientoDetailDialog
        open={detailDialogAbierto}
        alojamiento={alojamientoDetalle}
        onClose={cerrarDetalle}
        cargando={cargandoDetalle}
      />

      <DeleteDialog
        open={deleteDialogAbierto}
        alojamiento={alojamientoEliminar}
        onClose={cerrarEliminar}
        onConfirmar={manejarEliminarAlojamiento}
        eliminando={eliminando}
      />

      <Snackbar
        open={mensaje.open}
        autoHideDuration={4000}
        onClose={cerrarMensaje}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >

        <Alert
          onClose={cerrarMensaje}
          severity={mensaje.tipo}
          variant="filled"
        >
          {mensaje.texto}
        </Alert>

      </Snackbar>

    </>
  );

}
export default AlojamientosPage;