import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header1() {

  const { auth, cerrarSesion } = useAuth();
  const location = useLocation();

  function formatearFecha(fecha) {
    const nuevaFecha = new Date()
    return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);
}

  return (
    <header className="py-10 bg-indigo-600">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de 
                <span className="text-white font-black"> Veterinaria</span>
            </h1>


            <div className="flex flex-col gap-4">
              <div className="flex gap-6 text-white">
                <p>Hola, {auth.nombre}</p>
                <p>Hoy es {formatearFecha(Date.now())}</p>
              </div>
              <nav className="flex flex-col items-center md:flex-row gap-3 mt-5 lg:mt-0">

                  <Link to="/admin" className={`${location.pathname === '/admin' ? 'bg-indigo-100 text-indigo-800 hover:text-indigo-800 rounded-md' : 'text-white'} p-1 text-md uppercase font-bold transition-all duration-300`}>Pacientes</Link>
                  <Link to="/admin/perfil" className={`${location.pathname === '/admin/perfil' ? 'bg-indigo-100 text-indigo-800 hover:text-indigo-800 rounded-md' : 'text-white hover:text-indigo-200'} py-1 px-3 text-md uppercase font-bold transition-all duration-300`}>Perfil</Link>

                  <button
                  type="button"
                  className="text-white hover:text-indigo-200 text-md uppercase font-bold transition-all duration-300"
                  onClick={cerrarSesion}
                  >Cerrar Sesion</button>
              </nav>
            </div>
        </div>
    </header>
  )
}
export default Header1