import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

function CambiarPassword() {

  const { guardarPassword, alerta, setAlerta } = useAuth();
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  function handleSubmit(e) {
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')) {
      setAlerta({msg: 'Todos los campos son obligatorios', error: true})
      return;
    }

    if(password.pwd_nuevo.length < 6) {
      setAlerta({msg: 'El Password debe tener al menos 6 caracteres', error: true})
      return;
    }

    // Pasamos la validacion
    guardarPassword(password);
  }

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
        <span className="text-indigo-600 font-bold">Password aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
          <form 
            onSubmit={handleSubmit}
          >
            {msg && <Alerta alerta={alerta} />}

              <div className="my-3">
                <label htmlFor="password" className="uppercase font-bold text-gray-600">
                  Password Actual
                </label>

                <input 
                  type="password" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="pwd_actual" 
                  id="password"
                  placeholder="Escribe tu password actual"
                  onChange={e => setPassword({
                    ...password,
                    [e.target.name] : e.target.value
                  })}
                  
                />
              </div>

              <div className="my-3">
                <label htmlFor="password2" className="uppercase font-bold text-gray-600">
                  Password Nueva
                </label>

                <input 
                  type="password" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="pwd_nuevo" 
                  id="password2"
                  placeholder="Escribe tu nuevo password"
                  onChange={e => setPassword({
                    ...password,
                    [e.target.name] : e.target.value
                  })}
                  
                />
              </div>

            <div className="flex justify-center">
              <input 
                type="submit" 
                value="Actualizar Password" 
                className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer text-white py-3 px-10 rounded-lg font-bold uppercase w-full lg:w-auto mt-5"
              />

            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default CambiarPassword