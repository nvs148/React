
import {useState,useEffect  } from "react";
import  {Auth} from "../fire/fireb"
import {useAuthState} from "react-firebase-hooks/auth"
import { collection, onSnapshot ,deleteDoc,doc} from "firebase/firestore";
import { db } from "../fire/fireb";
import "firebase/compat/firestore"
import "../App.css"
import { useData } from './data';
//import {Style} from  "./styles"
export const Cart=()=>{
     const [username]=useAuthState(Auth);
    // console.log("1")
     const [posts, setposts] = useState([]);
     const { data, setData } = useData([]);
    // console.log(1+data+2)
  
     useEffect(()=>{
      const getposts=[];
      const unsubscribe = onSnapshot(collection(db, "collector"), (snapshot) => {
        console.log("Snapshot data:", snapshot.docs.map((doc) => doc.data()));
        snapshot.forEach((doc) => {
          getposts.push({ ...doc.data(), key: doc.id });
          console.log(posts.key)
          
          
        
          
          console.log(3+data+4)
       
        });
        setposts(getposts);
          
          setData(getposts);

      })
      
      return ()=>unsubscribe();

     

     },[])
    
    // console.log("2")
     //console.log(posts)
     
     posts.forEach((obj)=>{
      console.log( obj.id);
      })
      data.forEach((obj)=>{
        console.log("fine"+ obj.id+obj.title);
        
        })
    
    
      const cartremove=async(post)=>{
        const refer=doc(db,'collector',post.key);
       await  deleteDoc(refer).then(()=>{
        // deletedid(post.key)
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