import axios from "axios";
import React from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import IPrato from "../../../interfaces/IPrato";
import Prato from "../Prato";
import estilos from "./Restaurante.module.scss";
import http from "../../../http";

interface RestauranteProps {
  restaurante: IRestaurante;
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [pratos, setPratos] = React.useState<IPrato[]>([]);

  React.useEffect(() => {
    http
      .get<IPrato[]>("pratos/")
      .then((resposta) => {
        setPratos(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);
  return (
    <section className={estilos.Restaurante}>
      <div className={estilos.Titulo}>
        <h2>{restaurante.nome}</h2>
      </div>
      <div>
        {pratos?.map(
          (item) =>
            restaurante.id === item.restaurante && (
              <Prato prato={item} key={item.id} />
            )
        )}
      </div>
    </section>
  );
};

export default Restaurante;
