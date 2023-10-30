import {Navigate} from "./components/nav"
import './App.css';
import {Main} from "./pages/Main"
import {Signin} from "./pages/Sign"
import {Cart} from "./pages/cart"
//import {Admin} from "./pages/Admin"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Router >
     <Navigate/>
     <Routes >
      <Route  path="/" element={<Main/>}/>
      <Route path="/Signin" element={<Signin/>}/>
      <Route path="/cart" element={<Cart/>}/>
     
     </Routes>
     </Router>
     
    </div>
  );
}

export default App;
