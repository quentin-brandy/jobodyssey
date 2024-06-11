import React, { useState } from 'react';
import { changeCompanyLogo } from '../../libs/post';
export default function UpdateLogo({logo}) {
    const [isLogo, setisLogo] = useState(`/uploads/${logo}`);
    const [isLogofile, setisLogofile] = useState(null);
    const [confirmLogo, setConfirmLogo] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [acceptedFile, setAccceptedFile] = useState(false);
    
    const handleLogoChange =  (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 2 * 1024 * 1024) {
          setisLogo(URL.createObjectURL(file));
          setisLogofile(file);
          setConfirmLogo(true);
          setAccceptedFile(true);
   
        } else {
          setConfirmLogo(false);
        }
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("logo", isLogofile , isLogofile.name);
        try {
           const response = await changeCompanyLogo(formData);
          if (response.ok == true) {
            window.location.href = "/profile";
          }
        } catch (error) {
          console.error(error);
          setErrorMessage("Il y a une une erreur, veuillez réessayer.");
        }
     
    };

    


    return (
      <>
      <div className="flex flex-col md:flex-row w-full  items-center md:justify-between justify-center ">
        <div className='flex flex-col md:flex-row md:gap-5 items-center w-fit'>
          <p className="font-sm w-full flex justify-start md:text-wrap md:w-40 mb-5 text-center">Cliquez sur le logo pour le modifier</p>
      <label className="flex w-fit cursor-pointer relative hover:brightness-50 border-2 rounded-full border-black mb-5" htmlFor="logo">
              
              <img className="w-20 md:w-32 p-4 rounded-full" src={`${isLogo}`} alt="logo" /></label> 
      <input className="absolute appearance-none opacity-0 " accept="image/*" id="logo" name="logo" type="file" onChange={handleLogoChange} />
      {errorMessage && (
        <div className="text-red-500 mb-10 text-wrap w-52 text-center ">
         {errorMessage} 
        </div>
      )}
      </div>  
      {acceptedFile && (
            <button
            type="submit"
            aria-disabled="true"
            className={`text-lg text-white font-semibold rounded-full bg-button px-5 py-4 `}
         onClick={handleSubmit} >Changer de logo </button>
      ) }
  {!confirmLogo && (
        <div className="text-red-500 mb-10 text-wrap w-52 text-center ">
          La taille de l'image ne doit pas dépasser 2 Mo
        </div>
      )}
   </div>
     
     </>
    );
    }
