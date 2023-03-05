import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

function AdministrarPacientes() {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className='bg-indigo-600 hover:bg-indigo-800 text-white font-bold uppercase mx-10 rounded-xl p-2 mb-10 md:hidden'
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>

    </div>
  )
}
export default AdministrarPacientes