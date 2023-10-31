import React, { useState,useRef } from 'react'
import Header from './Header';
import { CheckValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import {USER_AVATAR} from '../utils/constants';

const Login = () => {

    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    

    const email = useRef(null);

    const password = useRef(null);

    const name = useRef(null);
// change the value singup/signin
    const handleSignInForm = () =>{
        setIsSignInForm(!isSignInForm);
    }

    const handleSubmitButton = () =>{
        const result = CheckValidData(email.current.value,password.current.value);
        setErrorMessage(result);
        if(result){
          return;
        }
        if(!isSignInForm){
          createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up logic
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: USER_AVATAR,
    }).then(() => {
      // Profile updated!
      // ...
      const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
      
    }).catch((error) => {
      // An error occurred
      // ...
      setErrorMessage(error.result);
    });
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" "+errorMessage);
    // ..
  });
        }
        else{
//sign in logic
signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" "+errorMessage);
  });
        }
    }
  return (
    <div >
      <Header/>
      <div className='absolute'>
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg"
       alt="bg-image"/>
      
       </div>
       <div className="flex items-center justify-center min-h-screen">
  <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 p-8 absolute bg-black rounded-lg shadow-lg bg-opacity-80">
    <h1 className="text-2xl font-bold text-center text-white mb-4">{isSignInForm?"Sign In": "Sign Up"}</h1>
    {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name" 
    className="w-full p-2 my-2 rounded border focus:outline-none focus:ring focus:border-blue-400 bg-gray-700" />)}
    <input ref={email} type="text" placeholder="Email Address" 
    className="w-full p-2 my-2 rounded border focus:outline-none focus:ring focus:border-blue-400 bg-gray-700" />
    <input ref={password} type="password" placeholder="Password" 
    className="w-full p-2 my-2 rounded border focus:outline-none focus:ring focus:border-blue-400  bg-gray-700" />
    <p className=' bg-red-700'>{errorMessage}</p>
    <button onClick={handleSubmitButton}
    className="w-full p-2 my-4 text-white font-semibold rounded-lg hover:bg-blue-700 
    focus:outline-none focus:ring focus:ring-blue-400 bg-red-700">
     {isSignInForm?"Sign In": "Sign Up"}
    </button>
    <p onClick={handleSignInForm}
    className="text-white font-semibold">{isSignInForm?"New to Netflix? Sign Up Now": "Already Registered? SignIn Now"}</p>
  </form>
</div>
   </div>
  )
}

export default Login;