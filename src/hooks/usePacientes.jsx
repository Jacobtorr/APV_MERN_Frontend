import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

function usePacientes () {
    return useContext(PacientesContext);
}

export default usePacientes;