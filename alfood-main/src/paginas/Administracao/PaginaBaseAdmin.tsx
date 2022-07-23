import * as Mui from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

const PaginaBaseAdmin = () => {
  return (
    <>
      <Mui.AppBar position="static">
        <Mui.Container maxWidth="xl">
          <Mui.Toolbar>
            <Mui.Typography variant="h6">Administração |</Mui.Typography>
            <Mui.Box sx={{ display: "flex", flexGrow: "1" }}>
              <Mui.Link component={RouterLink} to="/admin/restaurantes">
                <Mui.Button sx={{ my: "2", color: "white" }}>
                  Restaurantes
                </Mui.Button>
              </Mui.Link>
              <Mui.Link component={RouterLink} to="/admin/restaurantes/novo">
                <Mui.Button sx={{ my: "2", color: "white" }}>
                  Novo restaurante
                </Mui.Button>
              </Mui.Link>
              <Mui.Link component={RouterLink} to="/admin/pratos">
                <Mui.Button sx={{ my: "2", color: "white" }}>Pratos</Mui.Button>
              </Mui.Link>
              <Mui.Link component={RouterLink} to="/admin/pratos/novo">
                <Mui.Button sx={{ my: "2", color: "white" }}>
                  Novo Prato
                </Mui.Button>
              </Mui.Link>
            </Mui.Box>
          </Mui.Toolbar>
        </Mui.Container>
      </Mui.AppBar>

      <Mui.Box sx={{ margin: "30px" }}>
        <Mui.Container maxWidth="lg" sx={{ mt: "1" }}>
          <Mui.Paper sx={{ p: "2" }}>
            <Outlet />
          </Mui.Paper>
        </Mui.Container>
      </Mui.Box>
    </>
  );
};
export default PaginaBaseAdmin;
