import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { lazy } from "react";
export default function NavBar(connected) {
  
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setisConnected] = useState(false);

    const Handlemenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
        <header className=" bg-white">
         <nav className="flex flex-col gap-4 py-4 px-5 md:px-10 sm:flex-row sm:items-center border-b-2">
              <div className="flex justify-between items-center">
                    {(isOpen ? <img onClick={Handlemenu} className=" z-50 w-8 h-8 bg-black sm:hidden" src="/burgerclose.svg" alt="" /> :  <img  onClick={Handlemenu} className="z-50 w-8 h-8 bg-black sm:hidden" src="/burgeropen.svg" alt="" />)}
           <Link to="/">   <img className="w-15 h-15 cursor-pointer" src="/logoblack.png" alt="logo" /></Link>
              </div>
         <div className={`z-40 absolute overflow-x-hidden flex items-center flex-col pt-24 w-full h-screen bg-white ${isOpen ? ' translate-x-0' : ' translate-x-full'} transition-transform duration-500 ease-in-out sm:relative sm:flex-row sm:translate-x-0 sm:pt-0 sm:h-fit`}>
        <ul className="flex flex-col gap-6  sm:flex-row sm:items-center sm:justify-between sm:w-full mr-6 overflow-x-hidden" onClick={Handlemenu}>
         <li className="flex flex-col gap-6 justify-center sm:flex-row sm:ml-10 ">
          <Link to="recherche/offre">
            <h2 className="cursor-pointer active:scale-90 text-center text-lg border-2 p-3 border-black rounded-lg font-medium sm:border-none">Offre d&lsquo;emploie</h2>
            </Link>
            <Link to="recherche/entreprise">
            <h2 className="cursor-pointer active:scale-90 text-center text-lg border-2 p-3 border-black rounded-lg font-medium sm:border-none">Entreprise</h2>
            </Link>
            </li>
            {connected.connected  ? (
                 <NavLink to={"/profile"}>
              <li className="flex flex-row gap-2  sm:justify-end active:scale-90 rounded-lg border-2 border-black sm:border-none">
               
                    <img className="w-10 cursor-pointer" src="/profile.svg" alt="" />
                  <h2 className="cursor-pointer active:scale-90 text-center text-lg  p-3  font-medium sm:border-none">Profile</h2>
              </li>
              </NavLink>
            ) : (
              <li className="flex flex-col gap-6 sm:flex-row sm:justify-end">
                <NavLink to={"/connexion"}>
                  <h2 className="cursor-pointer active:scale-90 text-center text-lg border-2 p-3 border-black rounded-lg font-medium sm:border-none">Connexion</h2>
                </NavLink>
                <NavLink to={"/inscription"}>
                  <h2 className="cursor-pointer active:scale-90 text-center text-lg border-2 p-3 border-black rounded-lg font-medium sm:border-none">Inscription</h2>
                </NavLink>
              </li>
            )}
        </ul>
            
            </div>
        </nav>
        </header>
        </> 
    )
}
