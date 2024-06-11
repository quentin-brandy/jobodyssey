import { useState } from "react";
import { changeCompanyBanner} from "../../libs/post";


export default function UpdateBanner({banner}) {
    const [isBanner, setisBanner]= useState(`/uploads/${banner}`);
    const [confirmBanner, setConfirmBanner] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [validMessage, setValidMessage] = useState(null);
    const [acceptedFile, setAccceptedFile] = useState(false);
    const [isBannerfile, setisBannerfile] = useState(null);
    const handlechangeBanner = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 2 * 1024 * 1024) {
            setisBanner(URL.createObjectURL(file));
            setisBannerfile(file);
          setConfirmBanner(true);
          setAccceptedFile(true);
        } else {
          setisBanner("file.svg");
          setConfirmBanner(false);
          setErrorMessage("La taille de l'image ne doit pas dépasser 2 Mo");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("banner", isBannerfile , isBannerfile.name);
           const response = await changeCompanyBanner(formData);
           if (response.message === "mise à jour réussis") {
            setAccceptedFile(false);
            setValidMessage(response.message);
            setTimeout(() => {
              setValidMessage(null)
          }, 3000);
          }
          else{
           setErrorMessage(response.message)
           setTimeout(() => {
            setErrorMessage(null)
        }, 3000);
          }
    };

return(
    <>
    <div className="flex flex-col gap-2 items-center justify-center ">
        <p className="font-sm w-full flex justify-start">Pour modifier l'image elle doit avoir des dimensions minimum de ... et maximum de ....</p>
    <label className="w-full cursor-pointer relative hover:brightness-50" htmlFor="banner">
            
            <img className="w-full rounded-lg" src={`${isBanner}`} alt="" />
            <img className="absolute w-10 top-1/4 md:top-1/2 right-1/2"  src="file.svg" alt="" /></label>
    <input className="absolute appearance-none opacity-0" id="banner" name="banner" type="file" onChange={handlechangeBanner} />
    {acceptedFile && (
          <button
          type="submit"
          aria-disabled="true"
          className={`text-lg text-white font-semibold rounded-full bg-button px-5 py-4 `}
       onClick={handleSubmit} >Changer de bannière </button>
    ) }
  {validMessage && (
    <div className="text-green-500 mb-10">
      {validMessage}
    </div>
  )}
 </div>
   {!confirmBanner && (
      <div className="text-red-500 mb-10">
        La taille de l'image ne doit pas dépasser 2 Mo
      </div>
    )}
   </>
);
}

