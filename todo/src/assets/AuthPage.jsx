/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
 // Create a CSS file for styling
import './loggin.css';
import { Loginform } from './loginform';
import { Signupform } from './signupform';

 export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
   <div>
   <div className='container'>
      </div>
      <div className='positioning'>
            <div className='TodoWrapper-login'>


<div className={` ${isLogin ? 'login' : 'signup'}`}>
          {isLogin ? <Loginform /> : <Signupform />}
       
          <button className="todo-btn-switch" onClick={toggleForm}>
            {isLogin ? 'you are new here ?Switch to Sign Up' : 'you have an account ?Switch to Login'}
          </button>
          </div>
          </div>
       </div>
  </div>    

 
  );
}

export default AuthPage;
