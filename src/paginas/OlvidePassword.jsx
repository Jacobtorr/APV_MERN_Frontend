import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function OlvidePassword() {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    async function handleSubmit (e) {
        e.preventDefault();

        if(email === '' || email.length < 6) {
            setAlerta({msg: 'El Email es obligatorio', error: true})
            return;
        }

        try {
            const url = '/veterinarios/olvide-password'
            const { data } = await clienteAxios.post(url, { email })
            setAlerta({ msg: data.msg})
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

    const { msg } = alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
              Recupera tu Acceso y no Pierdas tus
              <span className="text-black"> Pacientes</span>
          </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && <Alerta
                alerta={alerta}
            />}

            <form
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                        type="email"
                        placeholder="Email de Registro" 
                        className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                        id="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    
                </div>

                <div className="flex justify-center">
                    <input 
                        type="submit" 
                        value="Enviar Instrucciones" 
                        className="bg-indigo-700 hover:bg-indigo-900 w-full py-3 px-10 rounded-xl text-white uppercase font-bold cursor-pointer mt-3 transition-all md:w-auto"
                    />
                </div>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-5 text-gray-500 hover:text-gray-700 transition-all"
                    to="/">¿Ya tienes una cuenta? Inicia Sesion
                </Link>
                <Link 
                    className="block text-center my-5 text-gray-500 hover:text-gray-700 transition-all"
                    to="/registrar">¿No tienes una cuenta? Regístrate
                </Link>
            </nav>
        </div>
    
    </>
  )
}
export default OlvidePassword