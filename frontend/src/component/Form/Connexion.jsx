import React, { useState , useEffect} from 'react';
import { login } from '../../libs/post';
const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const searchParams = new URLSearchParams(window.location.search);


        useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
    }, []);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = {
            email: email,
            password: password,
        };
   let data = await login(formData);
    if(data.message === "Email ou mot de passe incorrect"){
    setErrorMessage(data.message);
   }
   else{
    setErrorMessage(data.message);
    const expirationTime = new Date().getTime() + 3600000; 
    localStorage.setItem("token", data.token);
    localStorage.setItem("tokenExpiration", expirationTime);
    if(searchParams.has('link')){
        window.location.href = `${searchParams.get('link')}`
    }
    else{
   window.location.href = "/";
}
   }
    };

    return (
        <div>
            {errorMessage && (
                <div className="flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
                    {errorMessage}
                </div>
            )}
            <h1 className='text-3xl font-semibold flex justify-center my-10'>Connexion</h1>
            <form className='flex flex-col px-10 items-center justify-center w-full gap-10 mb-10' onSubmit={handleSubmit}>
                <label className='flex flex-col font-semibold gap-3'>
                    Email:
                    <input className='border-[1px] px-4 py-2 xl:w-96 focus:border-border focus:outline-none border-black' placeholder='email' required='true' type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label className='flex flex-col font-semibold gap-3 mb-10'>
                    Mot de passe:
                    <input className='border-[1px] px-4 py-2 xl:w-96 focus:border-border focus:outline-none border-black' placeholder='password' required='true' type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button className={`text-lg text-white font-semibold rounded-full bg-button px-10 md:px-16 py-4 ${email === '' || password === '' ? 'bg-gray-400' : ''}`} type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Connexion;