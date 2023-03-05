import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

function Login() {

    const { setAuth } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    async function handleSubmit (e) {
        e.preventDefault();
        
        if([email, password].includes('')) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            return;
        }

        setAlerta({});

        try {
            const url = '/veterinarios/login';
            const { data } = await clienteAxios.post(url, {email, password})
            
            // Enviar el token al LocalStorage Para usarlo en el Provider
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/admin');
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true});
        }
    }

    const { msg } = alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Inicia Sesion y Administra tus 
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

                <div className="flex justify-center">
                    <input 
                        type="submit" 
                        value="Iniciar Sesion" 
                        className="bg-indigo-700 hover:bg-indigo-900 w-full py-3 px-10 rounded-xl text-white uppercase font-bold cursor-pointer mt-3 transition-all md:w-auto"
                    />
                </div>

            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-5 text-gray-500 hover:text-gray-700 transition-all"
                    to="/registrar">¿No tienes una cuenta? Regístrate
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
export default Login