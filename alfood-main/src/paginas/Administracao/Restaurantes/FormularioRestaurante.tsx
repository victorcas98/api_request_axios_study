import * as Mui from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";

const FormularioRestaurante = () => {
  const parametros = useParams();

  React.useEffect(() => {
    if (parametros.id) {
      http
        .get(`restaurantes/${parametros.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = React.useState("");
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso!");
        });
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
        });
    }
  };
  return (
    <Mui.Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Mui.Typography component="h1" variant="h6">
        {parametros.id ? "Editar " : "Cadastrar "}Restaurante
      </Mui.Typography>
      <Mui.Box
        component="form"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        onSubmit={aoSubmeterForm}
      >
        <Mui.TextField
          fullWidth
          sx={{ display: "flex", textAlign: "center" }}
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          label="Nome do restaurante"
          variant="standard"
        />
        <Mui.Button fullWidth type="submit" variant="outlined">
          Salvar
        </Mui.Button>
      </Mui.Box>
    </Mui.Box>
  );
};
export default FormularioRestaurante;
