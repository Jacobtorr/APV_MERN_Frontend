import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2';

function EditarPerfil() {

  const { auth, editarPerfil, alerta, setAlerta } = useAuth();
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  function handleSubmit (e) {
    e.preventDefault();

    const { nombre, email } = perfil;
    
    if([nombre, email].includes('')) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'El email y el nombre son obligatorios!',
        showConfirmButton: true
      })
      return;
    } 

    // Pasamos la Validacion
    editarPerfil(perfil);
  }

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
        <span className="text-indigo-600 font-bold">Informacion aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
          <form 
            onSubmit={handleSubmit}
          >
            {msg && <Alerta alerta={alerta} />}

              <div className="my-3">
                <label htmlFor="nombre" className="uppercase font-bold text-gray-600">
                  Nombre
                </label>

                <input 
                  type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="nombre" 
                  id="nombre"
                  value={perfil.nombre || ''}
                  onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })}
                />
              </div>

              <div className="my-3">
                <label htmlFor="email" className="uppercase font-bold text-gray-600">
                  Email
                </label>

                <input 
                  type="email" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="email" 
                  id="email" 
                  value={perfil.email || ''}
                  onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })} 
                />
              </div>

              <div className="my-3">
                <label htmlFor="telefono" className="uppercase font-bold text-gray-600">
                  Telefono
                </label>

                <input 
                  type="tel" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="telefono" 
                  id="telefono"
                  value={perfil.telefono || ''}
                  onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })}  
                />
              </div>

              <div className="my-3">
                <label htmlFor="web" className="uppercase font-bold text-gray-600">
                  Sitio Web
                </label>

                <input 
                  type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="web" 
                  id="web"
                  value={perfil.web || ''}
                  onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })} 
                />
              </div>

            <div className="flex justify-center">
              <input 
                type="submit" 
                value="Guardar Cambios" 
                className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer text-white py-3 px-10 rounded-lg font-bold uppercase w-full lg:w-auto mt-5"
              />

            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default EditarPerfil