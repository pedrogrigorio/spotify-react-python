import {useNavigate} from "react-router-dom";
import * as Icons from '../icons';

// Verifica como funciona o UseNavigate pois não está funcionando o alternar entre páginas
export default function TopNavPrevBtn() {

    let historyControl = useNavigate()

    return (
        <button className="PrevBtn" onClick={() => {
            historyControl.goBack()
        }}>
            <Icons.Prevpage />
        </button>
    )
}