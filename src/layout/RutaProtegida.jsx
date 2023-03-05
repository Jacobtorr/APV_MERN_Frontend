import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header1 from "../components/Header1";
import Footer from "../components/Footer";


function RutaProtegida() {

    const { auth, cargando } = useAuth();
    if(cargando) return 'Cargando...'
    
  return (
    <>
        
        <Header1 />
            {auth?._id ? ( 
              <main className="container mx-auto mt-10">
                <Outlet /> 
              </main>
            ): <Navigate to="/" />}
        <Footer />
    </>
  )
}
export default RutaProtegida