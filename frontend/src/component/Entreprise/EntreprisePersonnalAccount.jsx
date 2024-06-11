import UpdateEmail from "../Form/UpdateEmail";
import UpdateLogo from "../Form/UpdateLogo";
import UpdatePassword from "../Form/UpdatePassword";
import { deleteCompany } from "../../libs/delete";
import { useState } from "react";

export default function EntrepriseAccount(user){
    const [isDelete, setisDelete]= useState(null);
    const [ChangeEmail, setChangeEmail]= useState("hidden");
    const [ChangePassword, setChangePassword]= useState("hidden");
    const [errorMessage, setErrorMessage] = useState(null);
    
    const Logo = () => {
        if(ChangeLogo === "visible"){
          setChangeLogo("hidden");
        }
        else{
          setChangeLogo("visible");
        }
      }


const Email = () => {
  if(ChangeEmail === "visible"){
    setChangeEmail("hidden");
  }
  else{
    setChangeEmail("visible");
  }
}

const Password = () => {
  if(ChangePassword === "visible"){
    setChangePassword("hidden");
  }
  else{
    setChangePassword("visible");
  }
}

const handlecompany = async () => {
  let response = await deleteCompany();
  if (response.message === "suppresion réussit") {
    localStorage.clear();
    window.location.href = "/";
  }
  else{
    setErrorMessage(response.message)
    setTimeout(() => {
        setErrorMessage(null)
    }, 3000);
  }  
}
    return (
        <>
         
            <div className=" flex flex-col border-2 border-black mx-5 pl-4 py-10 md:mx-10 my-10 gap-8 bg-white">
                <h1 className="text-2xl font-semibold py-5 px-5  ">Information personnel</h1>
                <div className="flex flex-col items-center sm:flex-row sm:justify-between mx-10  border-b-2 pb-10">
                <UpdateLogo logo={user.logo}/>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center mx-10 gap-5   border-b-2 pb-10">
                    <h3 className="text-regular">Email</h3>
                    <h3>{user.email}</h3>
                    <h3 className="text-sm font-bold text-button md:text-base cursor-pointer" onClick={Email}> Modifier mon email</h3>
                </div>
                <UpdateEmail role={user.role} email={ChangeEmail}/>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center mx-10 gap-5   border-b-2 pb-10">
                    <h3 className=" text-regular">Mot de passe</h3>
                    <h3>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</h3>
                    <h3 className="text-sm font-bold text-button md:text-base cursor-pointer" onClick={Password}> Modifier mon mot de passe</h3>
                </div>
                <UpdatePassword role={user.role} password={ChangePassword}/>
                <div className=" w-full flex justify-end pr-10 mb-10 sm:pr-5">
                <button className="flex items-center justify-center py-4 px-6 bg-button w-fit rounded-sm font-regular text-white active:scale-90" onClick={handlecompany}>supprimez le compte</button>
                {errorMessage && (
        <div className=" flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
          {errorMessage}
        </div>
      )}
                </div>
            </div>
        </>
    );
}