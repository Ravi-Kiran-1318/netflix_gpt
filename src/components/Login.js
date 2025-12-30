import Header from './Header'
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] =  useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name=useRef(null);
    const email=useRef(null);
    const password=useRef(null);


    const handleButtonClick = (e) => {
        const message=checkValidData(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return; 
        
        //Sign In // Sign Up Logic

        if(!isSignInForm){  
          //Sign Up Logic

          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed up 

            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value, photoURL: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
            }).then(() => {
              const {uid, displayName, email, photoURL} = auth.currentUser;
                dispatch(addUser({email: email,uid: uid, displayName: displayName, photoURL: photoURL}))
              navigate("/browse");
            }).catch((error) => {
              setErrorMessage(error.message);
            });
            console.log("User Signed Up: ", user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " -" + errorMessage);
            // ..
          });

        }
        else{
          //Sign In Logic

          signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User Signed In: ", user);
            navigate("/browse");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " -" + errorMessage);
          });
        }

        
    }

    const toggleSignInForm = () => { setIsSignInForm(!isSignInForm); }

  return (
    <div>
        <Header />
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9ddb442a-aca7-4d85-9cd1-dbed62f18f26/web/IN-en-20251222-TRIFECTA-perspective_a882efaa-75c8-4143-9dc1-4f9932a791ac_large.jpg"
         alt="Netflix GPT Logo" />
        </div>
        <form onSubmit={(e)=>{e.preventDefault()}} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>

            <h1 className='text-3xl font-bold mb-6'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            
            {!isSignInForm && 
            <input ref={name} type="text" placeholder="Full Name" 
            className='p-4 my-2 w-full bg-gray-800' />} 

            <input ref={email} type="text" placeholder="Email Address" 
            className='p-4 my-2 w-full bg-gray-800' />
 

            <input ref={password} type="password" placeholder="Password" 
            className='p-4 my-2 w-full bg-gray-800' />

            <p className='text-red-500 font-bold text-lg'>{errorMessage}</p>

            <button className='p-4 my-6 bg-red-700 w-full' type="submit" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix?  Sign In Now" : "Already Registered  Sign Up Now"}</p>
        </form>
        
    </div>
  )
}


export default Login
