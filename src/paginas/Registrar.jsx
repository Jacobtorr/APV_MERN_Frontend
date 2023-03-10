import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function Registrar() {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        
        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg: 'Hay campos vacios', error: true});
            return;
        }

        if(password !== repetirPassword) {
            setAlerta({msg: 'Los Passwords no son iguales', error: true});
            return;
        }

        if(password.length < 6) {
            setAlerta({msg: 'El Password debe tener al menos 6 caracteres', error: true});
            return;
        }

        setAlerta({});

        // Crear el usuario en la api
        try {
            const url = `/veterinarios`;
            await clienteAxios.post(url, { nombre, email, password })
            setAlerta({msg: 'Creado Correctamente, revisa tu email', error: false})
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true});
        }
    }

    const { msg } = alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
              Crea tu Cuenta y Administra tus
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
                    <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">
                        Nombre
                    </label>
                    <input 
                        type="text"
                        placeholder="Tu Nombre" 
                        className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} 
                    /> 
              </div>
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

              <div className="my-5">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">
                        Password
                    </label>
                   
                    <input 
                        type="password"
                        placeholder="Tu Password" 
                        className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                        id="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">
                        Repetir Password
                    </label>
                   
                    <input 
                        type="password"
                        placeholder="Repite tu Password" 
                        className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                        id="password2" 
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)} 
                    />
                </div>

              <div className="flex justify-center">
                    <input 
                        type="submit" 
                        value="Crear Cuenta" 
                        className="bg-indigo-700 hover:bg-indigo-900 w-full py-3 px-10 rounded-xl text-white uppercase font-bold cursor-pointer mt-3 transition-all md:w-auto"
                    />
                </div>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-5 text-gray-500 hover:text-gray-700 transition-all"
                    to="/">??Ya tienes una cuenta? Inicia Sesion
                </Link>
                <Link 
                    className="block text-center my-5 text-gray-500 hover:text-gray-700 transition-all"
                    to="/olvide-password">Olvide mi Password
                </Link>
            </nav>
        </div>
  
  </>
  )
}
export default Registrar