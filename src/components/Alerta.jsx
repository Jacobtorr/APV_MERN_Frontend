function Alerta({alerta}) {


  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center text-white p-3 rounded-xl uppercase font-bold text-sm mb-10`}>
        {alerta.msg}
    </div>
  )
}
export default Alerta