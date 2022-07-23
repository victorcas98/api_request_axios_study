import * as Mui from "@mui/material";
import React from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITags from "../../../interfaces/ITags";
import { useParams } from "react-router-dom";

const FormularioPrato = () => {
  const parametros = useParams();

  const [nomePrato, setNomePrato] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [restaurante, setrestaurante] = React.useState("");
  const [imagem, setImagem] = React.useState<File | null>(null);

  const [restaurantes, setrestaurantes] = React.useState<IRestaurante[]>([]);
  const [tags, setTags] = React.useState<ITags[]>([]);
  React.useEffect(() => {
    if (parametros.id) {
      http.get(`pratos/${parametros.id}/`).then((resposta) => {
        setNomePrato(resposta.data.nome);
        setDescricao(resposta.data.descricao);
        setTag(resposta.data.tag);
        setrestaurante(resposta.data.restaurante);
        setImagem(resposta.data.imagem);
      });
    }
  }, [parametros]);

  React.useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setrestaurantes(resposta.data));
  }, []);

  React.useEffect(() => {
    http
      .get<{ tags: ITags[] }>("/tags/")
      .then((resposta) => setTags(resposta.data.tags));
  }, []);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    if (parametros.id) {
      http
        .request({
          url: `pratos/${parametros.id}/`,
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => alert("Prato Cadastroado com sucesso!"))
        .catch((erro) => console.log(erro));
    } else {
      http
        .request({
          url: "pratos/",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => alert("Prato Cadastroado com sucesso!"))
        .catch((erro) => console.log(erro));
    }
  };

  const selecionarImagem = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
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
        Prato
        {/* {parametros.id ? "Editar " : "Cadastrar "}Prato */}
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
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Nome do Prato"
          variant="standard"
          required
          margin="dense"
        />
        <Mui.TextField
          fullWidth
          sx={{ display: "flex", textAlign: "center" }}
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          label="Descrição do Prato"
          variant="standard"
          required
          margin="dense"
        />

        <Mui.FormControl margin="dense" fullWidth>
          <Mui.InputLabel id="select-tag">Tag</Mui.InputLabel>
          <Mui.Select
            margin="dense"
            labelId="select-tag"
            value={tag}
            onChange={(evento) => setTag(evento.target.value)}
          >
            {tags.map((tag) => (
              <Mui.MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>

        <Mui.FormControl margin="dense" fullWidth>
          <Mui.InputLabel id="select-tag">Restaurante</Mui.InputLabel>
          <Mui.Select
            margin="dense"
            labelId="select-tag"
            value={restaurante}
            onChange={(evento) => setrestaurante(evento.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <Mui.MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </Mui.MenuItem>
            ))}
          </Mui.Select>

          <input
            style={{ margin: "20px 0" }}
            type="file"
            onChange={(evento) => selecionarImagem(evento)}
          />
        </Mui.FormControl>

        <Mui.Button fullWidth type="submit" variant="outlined">
          Salvar
        </Mui.Button>
      </Mui.Box>
    </Mui.Box>
  );
};
export default FormularioPrato;
