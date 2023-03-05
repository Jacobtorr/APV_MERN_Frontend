import { useEffect, useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

const AuthContext = createContext();

function AuthProvider ({children}) {

    const location = useLocation();

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            //Obetenr el token del LocalStorage
            const token = localStorage.getItem('token');
            // No hay un token, se deja de ejecutar el codigo
            if(!token) {
                setCargando(false);
                return;
            }

            // Si hay un token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = '/veterinarios/perfil'
                const { data } = await clienteAxios(url, config);

                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({});
            }

            setCargando(false);
        }
        autenticarUsuario();
    }, []);

    function cerrarSesion() {
        localStorage.removeItem('token')
        setAuth({});
    }

    async function editarPerfil (datos) {
          //Obetener el token del LocalStorage
          const token = localStorage.getItem('token');
          // No hay un token, se deja de ejecutar el codigo
          if(!token) {
              setCargando(false);
              return;
          }

          // Si hay un token
          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }

          try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos, config)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Datos Guardados Correctamente!',
                showConfirmButton: false,
                timer: 1000
              })

          } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'El email ya está en uso',
                showConfirmButton: true
              })
          }
    }

    async function guardarPassword (datos) {
           //Obetenr el token del LocalStorage
           const token = localStorage.getItem('token');
           // No hay un token, se deja de ejecutar el codigo
           if(!token) {
               setCargando(false);
               return;
           }

           // Si hay un token
           const config = {
               headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
               }
           }

           try {
                const url = '/veterinarios/password-perfil';
                const { data } = await clienteAxios.put(url, datos, config);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password Guardado Correctamente!',
                    showConfirmButton: false,
                    timer: 1000
                  })
           } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'El password actual es incorrecto!',
                showConfirmButton: true
              })
           }
    }

    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                editarPerfil,
                guardarPassword,
                alerta,
                setAlerta
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;