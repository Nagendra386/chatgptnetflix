import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
import { useEffect,useState } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO,SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch);
  const dispatch = useDispatch();
  const [isSignIn,setIsSignIn] = useState(false);
  const handleGptSearchView=()=>{
    dispatch(toggleGptSearchView())
  }
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        // ...
        navigate("/browse")
        setIsSignIn(true);
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/")
      }
    });
    // unsubscribe when component unmounts
return ()=> unsubscribe();
  },[])

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

 
  const user = useSelector(store=>store.user);
  
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }
  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between '>
        <div>
        <img className='w-40' src={LOGO}  alt="logo"/>
        </div>
        { isSignIn &&
 <div className='flex p-2'>
   {showGptSearch && (<select onChange={handleLanguageChange}
              className="p-2 m-2 bg-gray-900 text-white"
             
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>)};
  <button onClick={handleGptSearchView}  className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg">{showGptSearch?"HomePage":"GPT Search"}</button>
 <img src={user?.photoURL}
 className='w-12 h-12' alt="usericon"/>
 <button onClick={handleSignOut} className="font-bold text-white " >Sign Out</button>
</div>
        }
       
      
    </div>
  )
}

export default Header;

