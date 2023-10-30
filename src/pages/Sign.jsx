import {signInWithPopup} from "firebase/auth"
import  {Auth,Provider} from "../fire/fireb"
import {useNavigate} from "react-router-dom"
//import {useAuthState} from "react-firebase-hooks/auth"

export const Signin=()=>{
    const navig=useNavigate(); 
   // const [user]=useAuthState(Auth);
    const authen= async ()=>{
       const res=await signInWithPopup(Auth,Provider);
        console.log(res);
        navig("/");
    }

return (
    <div>
    <button onClick={authen}>Signin</button>
    </div>
    )
}