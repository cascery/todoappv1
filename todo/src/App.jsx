

/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Todos } from './assets/todos';
import { Loginform } from './assets/loginform';
import { Signupform } from './assets/signupform'
import { AuthPage} from './assets/AuthPage'

import { Loading } from './assets/loading';
function App() {

 
return (

   <Router>
   <Routes>
     <Route path="/todos" element={<Todos/>} />
     {/* Define your route for the Loginform component */}
     <Route path="/" exact element={<AuthPage/>} />
<Route     path="/loading"    element ={<Loading/>}/>

   </Routes>
 </Router>
 
 );

  }
  
  

export default App;

