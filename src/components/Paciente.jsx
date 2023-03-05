import usePacientes from "../hooks/usePacientes";

function Paciente({paciente}) {

    const { editarPaciente, eliminarPaciente } = usePacientes();

    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

    function formatearFecha(fecha) {
        const nuevaFecha = new Date()
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);
    }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-7 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-2">Nombre:
            <span className="font-normal normal-case text-black"> {nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">propietario:
            <span className="font-normal normal-case text-black"> {propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Email:
            <span className="font-normal normal-case text-black"> {email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Fecha de Alta:
            <span className="font-normal normal-case text-black"> {formatearFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Sintomas:
            <span className="font-normal normal-case text-black"> {sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
                type="button"
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-800 text-white uppercase rounded-xl font-bold transition-all"
                onClick={() => editarPaciente(paciente)}
            >Editar</button>
             <button
                type="button"
                className="py-2 px-5 bg-red-600 hover:bg-red-800 text-white uppercase rounded-xl font-bold transition-all"
                onClick={() => eliminarPaciente(_id)}
            >Eliminar</button>
        </div>
    </div>
  )
}
export default Paciente;