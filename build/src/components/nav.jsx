 import {Link,useNavigate} from "react-router-dom"
 import "../App.css"
 import  {Auth} from "../fire/fireb"
import {signOut} from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"

 export const Navigate = ()=>{
  const Navigate=useNavigate();
    const [user]=useAuthState(Auth);
    const logout=async()=>{
        await signOut(Auth);
      Navigate("/");

    }
    return (
    <nav className="mainnav">
        <div className="nav1"><Link to="/">Home</Link></div>
        <div className="nav1"><Link to="/cart">Cart</Link></div>
        
        <div className="userclass">{user?.displayName}</div>
      {!user?<div id="navid" className="nav1"><Link to="/Signin">Signin</Link></div>:<div id="navid" className="nav1"><button onClick={logout}>Signout</button></div>}
    </nav>
     )
}