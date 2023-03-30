import {useNavigate} from "react-router-dom";
import * as Icons from '../icons';


export default function TopNavNextBtn() {

    let historyControl = useNavigate()

    return (
        <button className="NextBtn" onClick={() => {
            historyControl.goForward()
        }}>
            <Icons.Nextpage />
        </button>
    )
}