import Layout from "../layout/Layout";
import { useEffect, useCallback, useState } from "react";
import useKiosco from "../hooks/useKiosco";
import { formatearDinero } from "../helpers";
import QRCode from "react-qr-code";

export default function Total() {
  const { pedido, nombre, setNombre, colocarOrden, total, qr } = useKiosco();

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length <= 3;
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className=" text-4xl font-black">Total y confirmar pedido</h1>
      <p className=" text-2xl my-10">Confirma tu pedido a continuacion</p>
      <div className="shadow p-5 mb-3 flex gap-10 items-center">
        <form onSubmit={colocarOrden} className="md:w-3/6">
          <div>
            <label
              htmlFor="nombre"
              className="block uppercase text-slate-800 font-bold text-xl"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className="bg-gray-200 w-full lg:w-2/3 mt-3 p-2 rounded "
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mt-10 text-2xl">
            <p>
              Total a pagar: {""}{" "}
              <span className="font-bold"> {formatearDinero(total)}</span>
            </p>
          </div>
          <div className="mt-5">
            <input
              type="submit"
              className={` ${
                comprobarPedido()
                  ? "bg-indigo-100"
                  : "bg-indigo-600 hover:bg-indigo-800"
              }  w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
              value="Pagar"
              disabled={comprobarPedido()}
            />
          </div>
        </form>
        {qr ? (
          <div className="md:w-3/6">
            <h1 className="text-2xl font-bold mb-2">Escanea para pagar</h1>
            <QRCode value={`${total}`} level="H" viewBox={`0 0 256 256`} />
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}
