import axios from 'axios'
import { useData } from './data';
import {useState,useEffect} from 'react' 
import {addDoc, collection} from "firebase/firestore"
import {db,Auth } from "../fire/fireb"
import {useAuthState} from "react-firebase-hooks/auth"
import "../App.css"
const baseurl="https://fakestoreapi.com/products/category";


export const Main=()=>{
    const [user]=useAuthState(Auth);
    const [arr,arrfun]=useState([]);
    //const [tog,toggler]=useState([]);
    //const [cate,catsetter]=useState("");
    const { data ,setData} = useData();
    
//


    const Trigger=(value)=>{
       // catsetter(value);
        console.log(value);
        axios.get(baseurl+"/"+value)
        .then((data)=>{arrfun(data.data)
           // console.log(value);
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
       // console.log("cart"+obj.title);
       console.log("Cart updated:", [...data, obj]);
        setData((prevData) => {
            const newData = [...prevData, obj];
            console.log("Cart updated:", newData);
            return newData;
        });
        
    }
   // console.log("revanth")
  
    // data.forEach((obj)=>{
      //   console.log("fine"+ obj.id);
  
    // })
    // useEffect(() => {
    //     // This useEffect hook will run whenever data changes
    //     console.log("Data updated:", data);
    //   }, [data]);
  
    const isPresent=(obj)=>{
        // console.log("Data Array:", data);
        // console.log("Checking for ID:", obj.id);
        console.log("Checking for:", obj.title);
        return data.some((element) => (element.id === obj.id && user?.displayName===element.user) );
    }
    // console.log(1+tog+2);
    // console.log(arr);
    
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
            {isPresent(obj)?(<button>added to cart</button>):(<button  className='cartbutton' onClick={()=>cartadd(obj)}>cart</button>)
            
            }
            </div>
        ))

        }
        </div>
        
        </div>
}