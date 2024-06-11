import { useState } from "react";
import { CreateExperience } from "../../libs/post";
export default function AddExperience({open , handleGetExperience}) {
    const[formData, setFormData] = useState({ });
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorDateMessage, setErrorDateMessage] = useState(null);


    const handleChange = (e) => {
        if(e.target.name === "dateDebut" || e.target.name === "dateFin"){
            let date = Date.now();
        
            if(date < Date.parse(e.target.value)){
                setErrorDateMessage("la date ne peut pas être supérieur à la date actuelle");
                setTimeout(() => {
                    setErrorDateMessage(null);
                }, 3000);
            }
            else{
                setFormData({ ...formData,  [e.target.name]: e.target.value });
          
            }
        }
        else{
        setFormData({ ...formData,  [e.target.name]: e.target.value });

        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await CreateExperience(formData);
        if(response.message === "Experience created successfully"){
            setFormData({
                nomJob: "",
                nomEntreprise: "",
                ville: "",
                contrat: "",
                dateDebut: "",
                dateFin: "",
                description: "",
            });
        
            handleGetExperience(formData);
         
        }
        else{
            setErrorMessage(response.message);
        }
    };

    return (
        
        <>
        <div className={`flex flex-col gap-4 pr-5 sm:pr-0 sm:px-5 ${open ? "block" : "hidden"} w-full`}>
        {errorMessage && ( 
                <div className="flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
                    {errorMessage}
                </div>
            )}
            <form className="flex flex-col gap-10 justify-end sm:pr-20 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 sm:items-start sm:gap-4 sm:justify-start">
                <label className=" sm:text-lg" htmlFor="nomJob">nom de l'emploi ou de la mission: <span className="text-red-500">*</span></label>
                <input className="border-2 w-full border-black  p-2 rounded-lg" type="text" required="required" name="nomJob" id="nomJob" value={formData.nomJob} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2 sm:items-start sm:gap-4 sm:justify-start">
                <label className=" sm:text-lg" htmlFor="nomEntreprise">nom de l'entreprise : <span className="text-red-500">*</span></label>
                <input className="border-2 w-full border-black  p-2 rounded-lg" type="text" required="required" name="nomEntreprise" id="nomEntreprise" value={formData.nomEntreprise} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2 sm:items-start sm:gap-4 sm:justify-start">
                <label className=" sm:text-lg" htmlFor="ville">ville : <span className="text-red-500">*</span></label>
                <input className="border-2 w-full border-black  p-2 rounded-lg" type="text" required="required" name="ville" id="ville" value={formData.ville} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-5">
                <label className=" sm:text-lg" htmlFor="contrat">contrat <span className="text-red-500">*</span></label>
                <input className="border-2 w-full border-black  p-2 rounded-lg" type="text" required="required" name="contrat" id="contrat" value={formData.contrat} onChange={handleChange}/>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start sm:justify-between w-full">
                <div className="flex gap-4 md:gap-8 flex-col sm:flex-row items-center w-full">
                <label className=" sm:text-lg sm:min-w-fit flex-nowrap" htmlFor="dateDebut">date de début : <span className="text-red-500">*</span></label>
                <input className="border-2 w-full border-black  p-2 rounded-lg" type="date" required="required" name="dateDebut" id="dateDebut" value={formData.dateDebut} onChange={handleChange}/>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-8 items-center w-full">
                <label className=" sm:text-lg items-center flex-nowrap sm:min-w-fit" htmlFor="dateFin">date de fin : <span className="text-red-500">*</span></label>
                <input className="border-2 w-full border-black p-2 rounded-lg" type="date" required="required" name="dateFin" id="dateFin" value={formData.dateFin} onChange={handleChange}/>
                </div>
                </div>
                {errorDateMessage && ( 
                <div className="flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
                    {errorDateMessage}
                </div>
            )}
                <div className="flex flex-col gap-5">
                <label className=" sm:text-lg" htmlFor="description">description : <span className="text-red-500">*</span></label>
                <textarea className="border-2 border-black rounded-lg p-2" rows="5" required="required" name="description" id="description" value={formData.description} onChange={handleChange}/>
                </div>
               <div className="w-full flex items-center justify-center">
               <button type="submit" className={`w-fit flex items-center justify-center text-lg text-white font-semibold rounded-full px-32 md:px-16 py-4 ${formData.nomJob && formData.nomEntreprise && formData.ville && formData.contrat && formData.description && formData.dateDebut && formData.dateFin ? 'bg-button' : 'bg-gray-400'}`} >Ajouter l'expérience</button>

                </div>                 
            </form>
        </div>
       </>
    )
}