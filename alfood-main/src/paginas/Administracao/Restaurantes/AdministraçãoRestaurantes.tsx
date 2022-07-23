import * as Mui from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setrestaurantes] = React.useState<IRestaurante[]>([]);

  React.useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setrestaurantes(resposta.data));
  }, []);

  const excluir = (restauranteClicado: IRestaurante) => {
    http.delete(`restaurantes/${restauranteClicado.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(
        (restaurante) => restaurante.id !== restauranteClicado.id
      );
      setrestaurantes([...listaRestaurante]);
    });
  };

  return (
    <Mui.TableContainer>
      <Mui.Table>
        <Mui.TableHead>
          <Mui.TableRow>
            <Mui.TableCell>Nome</Mui.TableCell>
            <Mui.TableCell />
            <Mui.TableCell />
          </Mui.TableRow>
        </Mui.TableHead>

        <Mui.TableBody>
          {restaurantes?.map((restaurante) => (
            <Mui.TableRow key={restaurante.id}>
              <Mui.TableCell>{restaurante.nome}</Mui.TableCell>
              <Mui.TableCell>
                <Link to={`/admin/restaurantes/${restaurante.id}`}>
                  <Mui.Button variant="outlined">Editar</Mui.Button>
                </Link>
              </Mui.TableCell>
              <Mui.TableCell>
                <Mui.Button
                  onClick={() => excluir(restaurante)}
                  variant="contained"
                  color="error"
                >
                  Excluir
                </Mui.Button>
              </Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>
  );
};
export default AdministracaoRestaurantes;
