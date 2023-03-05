import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

const PacientesContext = createContext();

function PacientesProvider ({children}) {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    // Effect para Obtener los Pacientes
    useEffect(() => {
        async function obtenerPacientes () {

            try {
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const url = '/pacientes';
                const { data } = await clienteAxios(url, config)
                setPacientes(data);
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, []);

    // Funcion para registrar o actualizar Pacientes
    async function registrarPacientes (paciente) {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id) {
            // EDITAR PACIENTE
            try {
                const url = `/pacientes/${paciente.id}`;
                const { data } = await clienteAxios.put(url, paciente, config);

                // Actualizar el State (PANTALLA) al actualizar el paciente
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Actualizado Correctamente!',
                    showConfirmButton: false,
                    timer: 1000
                  })
            } catch (error) {
                console.log(error);
            }
        } else {
            // REGISTRAR NUEVO PACIENTE
            try {
                const url = '/pacientes';
                const { data } = await clienteAxios.post(url, paciente, config)
                
                const { createdAt, updatedAt , __v, ...pacienteAlmacenado} = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registrado Correctamente!',
                    showConfirmButton: false,
                    timer: 1000
                  })
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }  
    }

    function editarPaciente (paciente) {
        setPaciente(paciente);
    }

    async function eliminarPaciente(id) {
        const confirmar = true;
        
        if(confirmar) {

            Swal.fire({
                title: '¿Estas seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4f46e5',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    (async() => {
                        try {
                            const token = localStorage.getItem('token')
                            const config = {
                                headers: {
                                    "Content-type": "application/json",
                                    Authorization: `Bearer ${token}`
                                }
                            }
            
                            const url = `/pacientes/${id}`;
                            const {data} = await clienteAxios.delete(url, config);
                            
                            // Actualizar el State (PANTALLA) al eliminar el paciente
                            const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);
                            setPacientes(pacientesActualizado);
                        } catch (error) {
                            console.log(error);
                        }
                      })()
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Eliminado Correctamente!',
                    showConfirmButton: false,
                    timer: 800
                  })
                  }
                })
            
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                registrarPacientes,
                editarPaciente,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}

export default PacientesContext;