import axios from 'axios'
import {useState} from 'react' 
import {addDoc, collection} from "firebase/firestore"
import {db,Auth } from "../fire/fireb"
import {useAuthState} from "react-firebase-hooks/auth"
import "../App.css"
const baseurl="https://fakestoreapi.com/products/category";

export const Main=()=>{
    const [user]=useAuthState(Auth);
    const [arr,arrfun]=useState([]);
    const [tog,toggler]=useState(true);
    //const [cate,catsetter]=useState("");
    const Trigger=(value)=>{
       // catsetter(value);
        console.log(value);
        axios.get(baseurl+"/"+value)
        .then((data)=>{arrfun(data.data)
            console.log(value);
        })
        .catch((error)=>(console.log(error)))
    }
    const posting=collection(db,"collector");
    const cartadd=async(obj)=>{
        await addDoc(posting,{
            title:obj.title,
            category:obj.category,
            id:obj.id,
            price:obj.price,
            url:obj.image,
            user:user?.displayName,
            uid:user?.uid
        })
        console.log("cart"+obj.title);
    }
        
    
    
    console.log(arr);
    
    return <div> 
        <div class="try"> welcome to the Mainpage</div>
        <div className='typesclass'>
        <button className="mainbutton" onClick={()=>Trigger("jewelery")}>jewelery</button>
        <button className="mainbutton" onClick={()=>Trigger("men's clothing")}>mensclothing</button>
        <button className="mainbutton" onClick={()=>Trigger("women's clothing")}>womens clothing</button>
        <button  className="mainbutton" onClick={()=>Trigger("electronics")}>electronics</button>
        </div>
        <div className='maincart'>
        {arr.map((obj) =>(
            <div className='cartcontainer'>
            <img className='cartim' src={obj.image} alt=''></img>
            <h1 className='carttitle'>{obj.title}</h1>
            <h2 className='cartprice'>${obj.price}</h2>
            <button  className='cartbutton' onClick={()=>cartadd(obj)}>{tog?"cart":"discard"}</button>
            </div>
        ))

        }
        </div>
        
        </div>
}