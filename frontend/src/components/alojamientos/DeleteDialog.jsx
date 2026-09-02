import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";


function DeleteDialog({
  open,
  alojamiento,
  onClose,
  onConfirmar,
  eliminando,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Eliminar alojamiento
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          ¿Está seguro de eliminar el alojamiento{" "}
          <strong>{alojamiento?.name}</strong>?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={eliminando}
        >
          Cancelar
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirmar}
          disabled={eliminando}
        >
          {eliminando ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default DeleteDialog;