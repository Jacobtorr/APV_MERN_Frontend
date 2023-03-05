import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";
import Swal from 'sweetalert2'

function Formulario() {

    const { registrarPacientes, paciente } = usePacientes();

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    // Effects
    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);

    // Funciones
    function handleSubmit (e) {
        e.preventDefault();
        
        // Validar Formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Hay campos vacios!',
                showConfirmButton: false,
                timer: 1000
              })
            return;
        }

        setAlerta({});

        // Registrar el paciente
        registrarPacientes({nombre, propietario, email, fecha, sintomas, id})

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');
    }

    const { msg } = alerta;

  return (
    <>
        <h2 className="font-black text-3xl text-center">Registrar Paciente</h2>

         <p className="text-xl mt-5 mb-10 text-center">Añade tus pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          
            </p>

        <form 
            className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-xl rounded-xl"
            onSubmit={handleSubmit}
        >

            {msg && <Alerta 
                alerta={alerta}
            />}

            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
                    Nombre Mascota
                </label>
                <input 
                    type="text" 
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
                    id="nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">
                    Nombre Propietario
                </label>
                <input 
                    type="text" 
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
                    id="propietario"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)} 
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold">
                    Email
                </label>
                <input 
                    type="email" 
                    placeholder="Email del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
                    id="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
                    Fecha de Alta
                </label>
                <input 
                    type="date" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
                    id="fecha" 
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">
                    Sintomas
                </label>
               <textarea 
                id="sintomas" 
                placeholder="Describe los Sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
               ></textarea>
            </div>

            <input 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 w-full cursor-pointer p-3 font-bold rounded-xl text-white uppercase transition-all" 
                value= {id ? 'Guardar Cambios' : 'Agregar Paciente'}
            />
        </form>

    </>

  )
}
export default Formulario