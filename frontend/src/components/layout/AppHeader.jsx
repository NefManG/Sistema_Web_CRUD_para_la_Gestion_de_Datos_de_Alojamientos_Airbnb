import { AppBar, Toolbar, Typography,} from "@mui/material";
function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Gestión de Alojamientos Airbnb
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default AppHeader;