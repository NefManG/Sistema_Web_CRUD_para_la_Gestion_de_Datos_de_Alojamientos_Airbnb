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

  // =========================================================
  // DATOS
  // =========================================================

  const [alojamientos, setAlojamientos] = useState([]);


  // =========================================================
  // PAGINACIÓN
  // =========================================================

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);


  // =========================================================
  // CARGA Y ERRORES
  // =========================================================

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  // =========================================================
  // CREAR / EDITAR
  // =========================================================

  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const [alojamientoEditar, setAlojamientoEditar] = useState(null);


  // =========================================================
  // VER DETALLE
  // =========================================================

  const [alojamientoDetalle, setAlojamientoDetalle] = useState(null);
  const [detailDialogAbierto, setDetailDialogAbierto] = useState(false);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);


  // =========================================================
  // ELIMINAR
  // =========================================================

  const [alojamientoEliminar, setAlojamientoEliminar] = useState(null);

  const [deleteDialogAbierto, setDeleteDialogAbierto] =
    useState(false);

  const [eliminando, setEliminando] = useState(false);


  // =========================================================
  // MENSAJES
  // =========================================================

  const [mensaje, setMensaje] = useState({
    open: false,
    texto: "",
    tipo: "success",
  });


  // =========================================================
  // LISTAR ALOJAMIENTOS
  // =========================================================

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


  // =========================================================
  // CARGAR AL INICIAR O CAMBIAR DE PÁGINA
  // =========================================================

  useEffect(() => {

    cargarAlojamientos();

  }, [cargarAlojamientos]);


  // =========================================================
  // NUEVO ALOJAMIENTO
  // =========================================================

  function abrirDialogo() {

    setAlojamientoEditar(null);

    setDialogAbierto(true);

  }


  // =========================================================
  // EDITAR ALOJAMIENTO
  // =========================================================

  function abrirEditar(alojamiento) {

    setAlojamientoEditar(alojamiento);

    setDialogAbierto(true);

  }


  // =========================================================
  // CERRAR FORMULARIO
  // =========================================================

  function cerrarDialogo() {

    if (guardando) {
      return;
    }

    setDialogAbierto(false);

    setAlojamientoEditar(null);

  }


  // =========================================================
  // GUARDAR: CREAR O EDITAR
  // =========================================================

  async function manejarGuardarAlojamiento(datosAlojamiento) {

    try {

      setGuardando(true);

      setError(null);


      // EDITAR
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

      // CREAR
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


      // Refrescar tabla
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


  // =========================================================
  // VER DETALLE
  // =========================================================

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


  // =========================================================
  // ABRIR CONFIRMACIÓN ELIMINAR
  // =========================================================

  function abrirEliminar(alojamiento) {

    setAlojamientoEliminar(alojamiento);

    setDeleteDialogAbierto(true);

  }


  // =========================================================
  // CERRAR CONFIRMACIÓN ELIMINAR
  // =========================================================

  function cerrarEliminar() {

    if (eliminando) {
      return;
    }

    setDeleteDialogAbierto(false);

    setAlojamientoEliminar(null);

  }


  // =========================================================
  // ELIMINAR ALOJAMIENTO
  // =========================================================

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


      // Si eliminamos el único registro de la página actual,
      // retrocedemos a la página anterior.

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


  // =========================================================
  // PAGINACIÓN
  // =========================================================

  function manejarCambioPagina(event, nuevaPagina) {

    setPagina(nuevaPagina);

  }


  // =========================================================
  // CERRAR MENSAJE
  // =========================================================

  function cerrarMensaje() {

    setMensaje((mensajeActual) => ({
      ...mensajeActual,
      open: false,
    }));

  }


  // =========================================================
  // INTERFAZ
  // =========================================================

  return (
    <>

      <AppHeader />


      <Container maxWidth="lg">


        {/* ===================================================
            ENCABEZADO
        =================================================== */}

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


        {/* ===================================================
            TOTAL DE REGISTROS
        =================================================== */}

        {!cargando && !error && (

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            Total de alojamientos: {totalRegistros}
          </Typography>

        )}


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (

          <Alert
            severity="error"
            sx={{ mt: 3 }}
          >
            {error}
          </Alert>

        )}


        {/* ===================================================
            CARGANDO
        =================================================== */}

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


        {/* ===================================================
            TABLA
        =================================================== */}

        {!cargando && !error && (

          <AlojamientoTable
            alojamientos={alojamientos}
            onVer={abrirDetalle}
            onEditar={abrirEditar}
            onEliminar={abrirEliminar}
          />

        )}


        {/* ===================================================
            PAGINACIÓN
        =================================================== */}

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


      {/* =====================================================
          FORMULARIO CREAR / EDITAR
      ===================================================== */}

      <AlojamientoFormDialog
        open={dialogAbierto}
        onClose={cerrarDialogo}
        onGuardar={manejarGuardarAlojamiento}
        guardando={guardando}
        alojamiento={alojamientoEditar}
      />


      {/* =====================================================
          DETALLE DEL ALOJAMIENTO
      ===================================================== */}

      <AlojamientoDetailDialog
        open={detailDialogAbierto}
        alojamiento={alojamientoDetalle}
        onClose={cerrarDetalle}
        cargando={cargandoDetalle}
      />


      {/* =====================================================
          CONFIRMACIÓN ELIMINAR
      ===================================================== */}

      <DeleteDialog
        open={deleteDialogAbierto}
        alojamiento={alojamientoEliminar}
        onClose={cerrarEliminar}
        onConfirmar={manejarEliminarAlojamiento}
        eliminando={eliminando}
      />


      {/* =====================================================
          MENSAJES
      ===================================================== */}

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