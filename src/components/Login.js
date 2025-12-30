import Header from './Header'
import { useState, useRef } from 'react';
// import { checkValidData } from '../utils/validate';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const email=useRef(null);
    const password=useRef(null);

    const handleButtonClick = (e) => {
        //const message=checkValidData(email,password);

        console.log(email);
        console.log(password);
        
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
            <input type="text" placeholder="Full Name" 
            className='p-4 my-2 w-full bg-gray-800' />} 

            <input ref={email} type="text" placeholder="Email Address" 
            className='p-4 my-2 w-full bg-gray-800' />
 

            <input ref={password} type="password" placeholder="Password" 
            className='p-4 my-2 w-full bg-gray-800' />

            <button className='p-4 my-6 bg-red-700 w-full' type="submit" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix?  Sign In Now" : "Already Registered  Sign Up Now"}</p>
        </form>
        
    </div>
  )
}


export default Login
