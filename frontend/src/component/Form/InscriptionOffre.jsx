import { useState } from "react";
import { addOffers } from "../../libs/post";
import PageOffrePrévisualisation from "../Offre/PageOffre";
export default function CréationOffre(data){
  
  const [formData, setFormData] = useState({
  contrat : "CDD",
  télétravail : "Interdit",
  domaine : "Technologie de l'information"
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [Prévisualisation , setPrévisualisation] = useState(false);

  
  const handleChange = (e) => {
    setFormData({ ...formData,  [e.target.name]: e.target.value });
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrévisualisation(true);
};

const handleCreateoffer = async (e) => {

  e.preventDefault();
  const response = await addOffers(formData);
  if (response.message === "Offre créée avec succès") {
    setPrévisualisation(false);
    window.location.href = "/";
  }
  else{
    setErrorMessage("Il y a une une erreur, veuillez réessayer.");
  }
}
    return (
      <>
      {errorMessage && (
        <div className=" flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
          {errorMessage}
        </div>
      )}
      <div className='my-10'>
        <h1 className='text-3xl xl:text-4xl font-bold flex justify-center mb-10'>Création d'une offre</h1>
        <form className='flex flex-wrap justify-center item-center md:mx-40 xl:mx-80 gap-20 px-10 border-2 rounded-lg bg-white mx-auto border-brown py-10' onSubmit={handleSubmit}>
          <div className=" flex flex-col items-start ">
            <label htmlFor="name" className='text-lg font-semibold pb-2 pl-2'> Nom de l'offre </label>
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
          <div className=" flex flex-col items-start ">
            <label htmlFor="lieu" className='text-lg font-semibold pb-2 pl-2'> Lieu de l'offre </label>
            <input
              className="border-[1px] px-4 py-2  w-64 md:w-80  focus:outline-none border-black"
              type="text"
              required="required"
              aria-required="true"
              name="lieu"
              placeholder="Lieu de l'offre"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col items-start ">
            <label htmlFor="description" className='text-lg font-semibold pb-2 pl-2'> Description du poste </label>
            <textarea
              id="description"
              name="description"
              placeholder="Saisissez la description de l'offre ici..."
              className='border-[1px] px-4 py-2  w-64 md:w-80  focus:outline-none border-black'
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className=" flex flex-col items-start ">
            <label htmlFor="compétences" className='text-lg font-semibold pb-2 pl-2'> Compétence requise </label>
            <textarea
              id="compétences"
              name="compétences"
              placeholder="Saisissez les compétences requises..."
              className='border-[1px] px-4 py-2  w-64 md:w-80  focus:outline-none border-black'
              value={formData.compétence}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className=" flex flex-col items-start ">
            <label htmlFor="salaire" className='text-lg font-semibold pb-2 pl-2'> Salaire </label>
            <input
              className="border-[1px] px-4 py-2  w-64 md:w-80  focus:outline-none border-black"
              type="text"
              required="required"
              aria-required="true"
              name="salaire"
              placeholder="Salaire"
              value={formData.salaire}
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col items-start ">
            <label htmlFor="contrat" className='text-lg font-semibold pb-2 pl-2'> Type de contrat </label>
            <select className='border-[1px] px-4 py-2 w-64 md:w-80 focus:outline-none border-black' name="contrat" id="contrat" value={formData.contrat} onChange={handleChange}>
              <option value="CDD">CDD</option>
              <option value="CDI">CDI</option>
              <option value="Stage">Stage</option>
              <option value="Alterance">Alterance</option>
              <option value="Freelance">Freelance</option>
              <option value="Temps partielle">Temps partielle</option>
            </select>
          </div>
          <div className=" flex flex-col items-start ">
            <label htmlFor="domaine" className='text-lg font-semibold pb-2 pl-2'> Domaine d'emploie </label>
            <select className='border-[1px] px-4 py-2 w-64 md:w-80 focus:outline-none border-black' name="domaine" id="domaine" value={formData.domaine} onChange={handleChange}>
                            {data.secteurs.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.nom}
                              </option>
                            ))}
            </select>
          </div>
          <div className=" flex flex-col items-start ">
            <label htmlFor="télétravail" className='text-lg font-semibold pb-2 pl-2'> Télétravail </label>
            <select className='border-[1px] px-4 py-2 w-64 md:w-80 focus:outline-none border-black' name="télétravail" id="télétravail" value={formData.télétravail} onChange={handleChange}>
              <option value="Interdit">Interdit</option>
              <option value="Autorisé">Autorisé</option>
              <option value="Partielle">Partielle</option>
              <option value="Négociable">Négociable</option>
            </select>
          </div>
          <div className=" flex flex-col items-start ">
            <label htmlFor="adresse" className='text-lg font-semibold pb-2 pl-2'> Adresse </label>
            <input
              className="border-[1px] px-4 py-2  w-64 md:w-80  focus:outline-none border-black"
              type="text"
              required="required"
              aria-required="true"
              name="adresse"
              placeholder="Adresse"
              value={formData.adresse}
              onChange={handleChange}
            />
          </div>
          
          <button className={`text-lg text-white font-semibold rounded-full px-10 md:px-16 py-4 ${formData.name === '' || formData.city === '' || formData.description === '' || formData.compétence === '' || formData.salaire === '' || formData.contrat === '' || formData.télétravail === '' || formData.adresse === '' ? 'bg-gray-400' : 'bg-button'}`} type='submit'>Prévisualisé</button>

        
        </form>
        {Prévisualisation ? (
          <PageOffrePrévisualisation data={formData} />
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex items-center justify-center pb-10">
      <button className={`w-fit flex items-center justify-center text-lg text-white font-semibold rounded-full px-32 md:px-16 py-4 ${formData.name === '' || formData.city === '' || formData.description === '' || formData.compétence === '' || formData.salaire === '' || formData.contrat === '' || formData.télétravail === '' || formData.adresse === '' ? 'bg-gray-400' : 'bg-button'}`} onClick={handleCreateoffer}>Crée l'offre</button>
      </div>
      </>
    );
};

