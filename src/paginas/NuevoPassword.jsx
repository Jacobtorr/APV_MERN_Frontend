import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function NuevoPassword() {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const nuevoPassword = async () => {
      try {
        const url = `/veterinarios/olvide-password/${token}`;
        await clienteAxios(url);
        setAlerta({msg: 'Coloca tu Nuevo Password'});
        setTokenValido(true);
      } catch (error) {
        setAlerta({msg: 'Hubo un error con el enlace', error: true });
      }
    }
    nuevoPassword();
  }, []);

  async function handleSubmit (e) {
    e.preventDefault();

    if(password === '') {
      setAlerta({msg: 'El password es Obligatorio', error: true});
      return;
    }

    if(password.length < 6) {
      setAlerta({msg: 'El password debe tener al menos 6 caracteres', error: true});
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({ msg: data.msg });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
            Reestablece tu password y no pierdas acceso a tus
            <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

      {msg && <Alerta 
        alerta={alerta}
      />}

      {tokenValido && (
        <>
          <form 
            onSubmit={handleSubmit}
         >
            <div className="my-5">
              <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo Password
              </label>
            
              <input 
                  type="password"
                  placeholder="Tu Password" 
                  className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                  id="password" 
                  onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <input 
                  type="submit" 
                  value="Guardar Password" 
                  className="bg-indigo-700 hover:bg-indigo-900 w-full py-3 px-10 rounded-xl text-white uppercase font-bold cursor-pointer mt-3 transition-all md:w-auto"
              />
              </div>
          </form>
          
              {passwordModificado && <Link 
              className="block text-center my-5 text-xl text-gray-500 hover:text-gray-700 transition-all"
              to="/">Inicia Sesion
              </Link>}
          </>
        )}

        
      </div>
    </>
  )
}
export default NuevoPassword;