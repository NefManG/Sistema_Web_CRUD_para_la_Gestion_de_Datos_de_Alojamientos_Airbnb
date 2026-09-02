import {Box,IconButton,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Tooltip,} from "@mui/material";
import {Delete as DeleteIcon,Edit as EditIcon,Visibility as VisibilityIcon,} from "@mui/icons-material";
function AlojamientoTable({
  alojamientos,
  onVer,
  onEditar,
  onEliminar,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Tipo de propiedad</TableCell>
            <TableCell>Tipo de habitación</TableCell>
            <TableCell align="center">Huéspedes</TableCell>
            <TableCell align="center">Dormitorios</TableCell>
            <TableCell align="center">Camas</TableCell>
            <TableCell align="right">Precio</TableCell>

            <TableCell align="center">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {alojamientos.map((alojamiento) => (
            <TableRow key={alojamiento._id}>

              <TableCell
                sx={{
                  maxWidth: 220,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {alojamiento.name}
              </TableCell>

              <TableCell  sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {alojamiento.property_type}
              </TableCell>

              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {alojamiento.room_type}
              </TableCell>

              <TableCell align="center">
                {alojamiento.accommodates}
              </TableCell>

              <TableCell align="center">
                {alojamiento.bedrooms}
              </TableCell>

              <TableCell align="center">
                {alojamiento.beds}
              </TableCell>

              <TableCell align="right">
                {Number(alojamiento.price).toFixed(2)}
              </TableCell>

              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: 0.5,
                  }}
                >
                  <Tooltip title="Ver">
                    <IconButton
                      size="small"
                      onClick={() => onVer(alojamiento)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      onClick={() => onEditar(alojamiento)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      onClick={() => onEliminar(alojamiento)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default AlojamientoTable;