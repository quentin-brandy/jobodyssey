import { useState } from "react";
import { changeCompany } from "../../libs/post";
export default function UpdatePresentation({ presentation , id}) {
        const [modifiyLink, setModifiyLink] = useState(false);
        const [updatedlink, setupdatedtLink] = useState("");
        const [formData, setFormData] = useState({});
        const [islink, setisLink] = useState(presentation);
        const [errorMessage, setErrorMessage] = useState(null);
        const [ValidMessage, setValidMessage] = useState(null);


        const handleChange = (e) => {

            setisLink(e.target.value);
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setModifiyLink(false);
           
               
                let response = await changeCompany(formData);
                
                   if (response.message === "mise à jour réussi") {
                       setValidMessage("mise à jour réussi");   
                       setTimeout(() => {
                           setValidMessage(null);
                       }, 3000);
                     }
                     else{
                       setErrorMessage(response.message)
                       setTimeout(() => {
                           setErrorMessage(null)
                       }, 3000);
                     }  
        };

        const handleModifyLink = () => {
            setModifiyLink(true);
        };

        return (
            <div className="flex flex-col gap-6 mx-5 mt-20 sm:mx-10">
            <div className="flex justify-between flex-wrap gap-5">
                <h2 className="font-semibold">Texte de présentation de l'entreprise</h2>
                {modifiyLink ? (
                    <button type="submit" className="w-fit text-nowrap text-sm text-white font-semibold rounded-full bg-button mt-4 px-4 py-2" onClick={handleSubmit}>
                        modifier
                    </button>
                ) : (
                    <>
                        <h3 className="font-semibold text-button cursor-pointer" onClick={handleModifyLink}>
                            modifier le lien
                        </h3>
                        {ValidMessage !== null && <p className="text-green-500">{ValidMessage}</p>}
                        {errorMessage !== null && <p className="text-red-500 font-semibold">{errorMessage}</p>}
                    </>
                )}
            </div>
            {modifiyLink ? (
                    <textarea
                        type="text"
                        name={id}
                        id={id}
                        className="w-full mx-20 py-2 px-2 border-[1px] border-black outline-none rounded-md"
                        value={islink}
                        onChange={handleChange} 
                    />
                ) : (
                        <p>{islink}</p>
                )}
        </div>     
        );
    };        