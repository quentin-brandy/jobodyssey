import { useState } from "react";
import { changeCompany } from "../../libs/post";
import { changeUser } from "../../libs/post";
export default function UpdateLink({ link, logo , id , role }) {
        const [modifiyLink, setModifiyLink] = useState(false);
        const [updatedlink, setupdatedtLink] = useState("");
        const [formData, setFormData] = useState({});
        const [islink, setisLink] = useState(link);
        const [errorMessage, setErrorMessage] = useState(null);
        const [ValidMessage, setValidMessage] = useState(null);

        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;


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
            let testlink = urlRegex.test(islink);
           
            if (!testlink) {
              setErrorMessage("Le lien n'est pas valide");
              setTimeout(() => {
                setErrorMessage(null)
            }, 3000);
            }
            else{
             
                if(role === "Role_User"){
                let response = await changeUser(formData);
                
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
            }
            else if(role === "Role_Company"){
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
            }

        };
    };
        const handleModifyLink = () => {
            setModifiyLink(true);
        };

        return (
            <li className="flex flex-col gap-10 mx-20 md:mx-0 md:border-b-0 border-black md:py-0 py-6 border-b-2 md:flex-row md:justify-between items-center">
                <img className="w-10 h-10" src={`/${logo}`} alt="" />
                {modifiyLink ? (
                    <input
                        type="text"
                        name={id}
                        id={id}
                        className="w-full mx-20 py-2 px-2 border-[1px] border-black outline-none rounded-md"
                        value={islink}
                        onChange={handleChange} 
                    />
                ) : (
                    <>
                        {link !== "a définir" ? (
                            <a href={islink} target="_blank" className="border-b-2 border-black">
                                {islink}
                            </a>
                        ) : (
                            <span className="border-b-2 border-black">{islink}</span>
                        )}
                    </>
                )}
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
            </li>
        );
    };        