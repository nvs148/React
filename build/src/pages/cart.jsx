
import {useState,useEffect  } from "react";
import  {Auth} from "../fire/fireb"
import {useAuthState} from "react-firebase-hooks/auth"
import { collection, onSnapshot ,deleteDoc,doc} from "firebase/firestore";
import { db } from "../fire/fireb";
import "firebase/compat/firestore"
import "../App.css"
//import {Style} from  "./styles"
export const Cart=()=>{
     const [username]=useAuthState(Auth);
     console.log("1")
     const [posts, setposts] = useState([]);
     //const [deleted, deletedid] = useState("");
     // const [loadind,isloading]=useState(true);
     useEffect(()=>{
      const getposts=[];
      const unsubscribe = onSnapshot(collection(db, "collector"), (snapshot) => {
        snapshot.forEach((doc) => {
          getposts.push({ ...doc.data(), key: doc.id });
          console.log(posts.key)
        
          setposts(getposts);
         // isloading(false);
        });
       
      })
      
      return ()=>unsubscribe();

     

     },[])
    
     console.log("2")
     console.log(posts)
     
     posts.forEach((obj)=>{
      console.log( obj.id);
      })
    
      const cartremove=async(post)=>{
        const refer=doc(db,'collector',post.key);
       await  deleteDoc(refer).then(()=>{
        //  deletedid(post.key)
          console.log(post.key +"deleted");
         
         window.location.reload();
        
      }).catch(error=>{console.log(error)})
      };
      
   

  
    return <div>
      {username? <div> cartpage</div>:<div>Sign in first to see cart</div>}
      <>
      {/* <Style/> */}
      <div className="maincart">{posts.map((post)=>
      (username?.displayName===post.user)?(<div className="cartcontainer" key={post.key}>
        <p className="carttitle">{post.title}</p>
        <img className="cartim" src={post.url} alt=""></img>
       <button onClick={()=>cartremove(post)}> remove</button> 
        </div>):<p>{post.username}</p>
      )}</div>
      </>
        </div>
}