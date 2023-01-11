const { useState, useEffect, createContext } = require("react");
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const KioscoContext = createContext();

const KioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  const [qr, setQr] = useState(false);

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
    if (pedido.length === 0) {
      setQr(false);
    }
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };
  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //actualizar cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("Guardado Correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al Pedido", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setModal(false);
  };

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };

  const colocarOrden = async (e) => {
    e.preventDefault();

    setQr(true);

    setTimeout(() => {
      toast.success("Pago recibido! Retira tu ticket y espera a ser llamado");
    }, 4000);
    setTimeout(() => {
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);
      router.push("/");
    }, 8000);

    // try {
    //   await axios.post("/api/ordenes", {
    //     pedido,
    //     nombre,
    //     total,
    //     fecha: Date.now().toString(),
    //   });
    //   //resetear la App

    //   setCategoriaActual(categorias[0]);
    //   setPedido([]);
    //   setNombre("");
    //   setTotal(0);
    //   toast.success("Pedido Realizado Correctamente");
    //   setTimeout(() => {
    //     router.push("/");
    //   }, 3000);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <KioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
        qr,
      }}
    >
      {children}
    </KioscoContext.Provider>
  );
};

export { KioscoProvider };

export default KioscoContext;
