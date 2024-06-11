import { useState } from "react";
import { useEffect } from "react";
import { UpdateOffer } from "../../libs/post";

export default function PageOffreModification({data , secteur}){
const [formData, setFormData] = useState({    });
const [errorMessage, setErrorMessage] = useState(null);
let offre = data.offres;

useEffect(() => {
    setFormData(offre);
}, [offre]
);


const regex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*/;
const [, date, time] = regex.exec(offre.
    createdAt);
const formattedDate = `${date} à ${time}`;



  
const handleChange = (e) => {
    setFormData({ ...formData,  [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await UpdateOffer(formData);
    
       if (response.message === "mise à jour réussi") {
        window.location.href = "/profile/company";
           
         }
         else{
           setErrorMessage(response.message)
           setTimeout(() => {
               setErrorMessage(null)
           }, 10000);
         }  
   
};

const handledisable = async () => {
    formData.active = 0;
    let response = await UpdateOffer(formData);

    if (response.message === "mise à jour réussi") {
         window.location.href = "/profile/company";
    }
    else{
        setErrorMessage(response.message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000);
    }
}

return(
    <>
    {errorMessage && ( <div className=" flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
        {errorMessage}
        </div>
    )}
    <div className="flex justify-end mt-5 mx-5 md:mx-20">
    <button className="text-lg w-fit font-semibold bg-button px-6 py-4 md:px-10 md:py-4 rounded-md mx-16 text-white" onClick={handledisable}>
                    désactiver l'offre
                </button>
                </div>
<form className="border-2 bg-white border-black px-5 md:px-10 mx-5 md:mx-10 lg:mx-28 my-10 py-10" onSubmit={handleSubmit}>
    <div className="flex flex-col mb-40">
    <div className="flex mb-2 justify-between items-center w-full">
    <div className="flex flex-col ">
    <label htmlFor="name" className='text-lg flex font-semibold pb-2 pl-2'> Nom de l'offre </label>
            <input
              className="border-[1px] px-4 py-2 w-64 md:w-80 focus:border-black focus:outline-none border-black"
              type="text"
              required="required"
              aria-required="true"
              name="name"
              placeholder="Nom de l'offre"
              value={formData.name}
              onChange={handleChange}
            />
             </div>
    <img className="flex items-end justify-end w-10 md:w-10" src="/iconelike.svg" alt="like" />
    <img className="absolute hidden md:block right-1/3 top-[25rem] w-20" src="/star.svg" alt="" />
    <img className="absolute hidden md:block left-1/2 w-20" src="/star.svg" alt="" />
  </div>
  <div className="flex flex-col pb-5">

            <label htmlFor="domaine" className='text-lg font-semibold pb-2 pl-2'> Domaine d'emploie </label>
               <select className='border-[1px] px-4 py-2 w-64 md:w-80 focus:outline-none border-black' name="domaine" id="domaine" value={formData.domaine} onChange={handleChange}>
                            {secteur.secteurs.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.nom}
                              </option>
                            ))}
            </select> 
          </div>
  <div className="flex flex-col pb-10">
    <label htmlFor="adresse" className='text-lg flex font-semibold pb-2 pl-2'> Adresse de l'offre </label>
            <input
              className="border-[1px] px-4 py-2 w-64 md:w-80 focus:border-black focus:outline-none border-black"
              type="text"
              required="required"
              aria-required="true"
              name="adresse"
              placeholder="Nom de l'offre"
              value={formData.adresse}
              onChange={handleChange}
            />
             </div>
    <div className="flex flex-col gap-4">
    <p className="font-regular text-lg md:text-xl">Résumer du poste : </p>
    <div className="flex flex-col sm:flex-row justify-center items-center md:justify-between w-full md:items-end mb-10">
    <div className='text-black flex gap-3  md:gap-6 lg:gap-20 flex-wrap pb-8 items-center justify-start'>
        <div>
    <label htmlFor="contrat" className='text-lg flex font-semibold pb-2 pl-2'> Type de contrat </label>
    <select className='border-[1px] px-4 py-2 w-64 md:w-80 focus:outline-none border-black' name="contrat" id="contrat" value={formData.contrat} onChange={handleChange}>
              <option value="CDD">CDD</option>
              <option value="CDI">CDI</option>
              <option value="Stage">Stage</option>
              <option value="Alterance">Alterance</option>
              <option value="Freelance">Freelance</option>
              <option value="Temps partielle">Temps partielle</option>
            </select>
            </div>
            <div>
     <label htmlFor="lieu" className='text-lg flex font-semibold pb-2 pl-2'> Ville de l'offre </label>
            <input
              className="border-[1px] px-4 py-2 w-64 md:w-80 focus:border-black focus:outline-none border-black"
              type="text"
              required="required"
              aria-required="true"
              name="lieu"
              placeholder="Nom de l'offre"
              value={formData.lieu}
              onChange={handleChange}
            />
            </div>
            <div>
     <label htmlFor="salaire" className='text-lg flex font-semibold pb-2 pl-2 text-wrap w-80'> Salaire pour l'offre (en euros et par an)</label>
            <input
              className="border-[1px] px-4 py-2 w-64 md:w-80 focus:border-black focus:outline-none border-black"
              type="number"
              required="required"
              aria-required="true"
              name="salaire"
              placeholder="Salaire de l'offre"
              value={`${formData.salaire}`}
              onChange={handleChange}
            />
            </div>
            <div>
    <label htmlFor="télétravail" className='text-lg flex font-semibold pb-2 pl-2'> Adresse de l'offre </label>
    <select className='border-[1px] px-4 py-2 w-64 md:w-80 focus:outline-none border-black' name="télétravail" id="télétravail" value={formData.télétravail} onChange={handleChange}>
              <option value="Interdit">Interdit</option>
              <option value="Autorisé">Autorisé</option>
              <option value="Partielle">Partielle</option>
              <option value="Négociable">Négociable</option>
            </select>
            </div>
</div>
    <button className="bg-button px-4 py-2 text-white rounded-xl sm:px-8 sm:py-4 sm:text-xl  active:scale-90">Postuler à l'offre</button>
    </div>
    </div>
    <p>publié le {formattedDate}</p>
    
    </div>
    <div className="flex flex-col w-full">
    <img className="absolute hidden lg:block right-10 -bottom-[30rem] w-32 md:w-auto " src="/rocket.png" alt="" />
    <h2 className="text-xl font-regular pb-2 mb-10 border-black border-b-2 md:text-3xl">Détail de l'offre</h2>   

    <h3 className="text-xl md:text-2xl font-semibold mb-4">Description du post</h3>
    <textarea
              id="description"
              name="description"
              placeholder="Saisissez la descriptions de l'formData..."
              className='border-[1px] px-4 py-2 w-full mb-20 focus:outline-none border-black'
              value={formData.description}
              onChange={handleChange}
            ></textarea>
    <h3 className="text-xl md:text-2xl font-semibold mb-4">Compétences requises pour le poste</h3>
    <textarea
              id="compétences"
              name="compétences"
              placeholder="Saisissez les compétences requises..."
              className='border-[1px] px-4 py-2 w-full  focus:outline-none border-black'
              value={formData.compétences}
              onChange={handleChange}
            ></textarea>
    <div className="flex justify-center w-full mt-10">
    <button type="submit" className="w-fit flex items-center bg-button justify-center text-lg text-white font-semibold rounded-full px-32 md:px-16 py-4">Mettre à jour l'offre</button>
    </div>
    </div>
    
</form>
</>
)

}