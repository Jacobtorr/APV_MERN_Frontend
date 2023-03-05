import { Link } from "react-router-dom"

function AdminNav() {
  return (
    <nav className="flex gap-4 px-5">
        <Link
            to='/admin/perfil'
            className="font-bold uppercase text-gray-500 hover:text-gray-700 transition-all"
        >Perfil</Link>
         <Link
            to='/admin/cambiar-password'
            className="font-bold uppercase text-gray-500 hover:text-gray-700 transition-all"
        >Cambiar Password</Link>
    </nav>
  )
}
export default AdminNav