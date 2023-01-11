import Image from "next/image";
import useKiosco from "../hooks/useKiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
  const { categorias } = useKiosco();

  return (
    <div>
      <Image
        width={150}
        height={50}
        src="/assets/img/logo.svg"
        alt="Imagen de logo"
      />
      <nav className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
