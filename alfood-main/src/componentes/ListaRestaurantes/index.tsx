import axios from "axios";
import React from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import * as Mui from "@mui/material";

const ListaRestaurantes = () => {
  const [itemPesquisado, setItemPesquisado] = React.useState<string>("");
  const [restaurantes, setRestaurantes] = React.useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = React.useState("");

  React.useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const restaurantesFinais = React.useMemo(() => {
    return restaurantes?.map(
      (item) =>
        item.nome.toLowerCase().startsWith(itemPesquisado.toLowerCase()) && (
          <Restaurante restaurante={item} key={item.id} />
        )
    );
  }, [itemPesquisado, restaurantes]);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resposta) => {
        setRestaurantes([...restaurantes, ...resposta.data.results]);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  return (
    <section className={style.ListaRestaurantes}>
      <Mui.TextField
        value={itemPesquisado}
        onChange={(evento) => setItemPesquisado(evento.target.value)}
        label="Pesquisar por restaurante"
        variant="standard"
      />
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantesFinais}

      {proximaPagina && <button onClick={verMais}>ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
