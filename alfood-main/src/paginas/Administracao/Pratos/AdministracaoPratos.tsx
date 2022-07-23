import * as Mui from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = React.useState<IPrato[]>([]);

  React.useEffect(() => {
    http.get<IPrato[]>("pratos/").then((resposta) => setPratos(resposta.data));
  }, []);

  const excluir = (restauranteClicado: IPrato) => {
    http.delete(`pratos/${restauranteClicado.id}/`).then(() => {
      const listaRestaurante = pratos.filter(
        (restaurante) => restaurante.id !== restauranteClicado.id
      );
      setPratos([...listaRestaurante]);
    });
  };

  return (
    <Mui.TableContainer>
      <Mui.Table>
        <Mui.TableHead>
          <Mui.TableRow>
            <Mui.TableCell>Nome</Mui.TableCell>
            <Mui.TableCell>Descrição</Mui.TableCell>
            <Mui.TableCell>Tag</Mui.TableCell>
            <Mui.TableCell>Imagem</Mui.TableCell>
            <Mui.TableCell />
            <Mui.TableCell />
          </Mui.TableRow>
        </Mui.TableHead>

        <Mui.TableBody>
          {pratos?.map((prato) => (
            <Mui.TableRow key={prato.id}>
              <Mui.TableCell>{prato.nome}</Mui.TableCell>
              <Mui.TableCell>{prato.descricao}</Mui.TableCell>
              <Mui.TableCell>{prato.tag}</Mui.TableCell>
              <Mui.TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  {prato.imagem}
                </a>
              </Mui.TableCell>
              <Mui.TableCell>
                <Link to={`/admin/pratos/${prato.id}`}>
                  <Mui.Button variant="outlined">Editar</Mui.Button>
                </Link>
              </Mui.TableCell>
              <Mui.TableCell>
                <Mui.Button
                  onClick={() => excluir(prato)}
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
export default AdministracaoPratos;
