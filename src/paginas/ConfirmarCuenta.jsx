import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function ConfirmarCuenta() {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setCargando(false)
    }
    confirmarCuenta();
}, [])

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
              Confirma tu cuenta y Comienza a Administrar tus
              <span className="text-black"> Pacientes</span>
          </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {/* Una vez que cargando este como false, se imprime la alerta */}
        {!cargando &&  
                  <Alerta 
                    alerta={alerta}
                  />}

                  {cuentaConfirmada && (
                     <Link 
                     className="block text-center my-5 text-gray-500 hover:text-gray-700 transition-all"
                     to="/">Iniciar Sesion
                 </Link>
                  )}
       
        </div>
    </>
  )
}
export default ConfirmarCuenta