import { useState } from "react";
 import { CreateUser } from "../../libs/post";
import React from "react";
export default function InscriptionUser(data) {
 


  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorLinkMessage ,setErrorLinkMessage] = useState(null);
  const [islogo, setLogo] = useState(null);
  const [confirmLogoProfile, setConfirmLogoProfile] = useState(false);
  const [isCV, setCV] = useState(null);
  const [confirmCV, setConfirmCV] = useState(false);
  const [diplomesList, setDiplomesList] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  let formData2 = new FormData();
 
  const [formData, setFormData] = useState({
  diplomes: [], 
  });



  const handleInputBlur = () => {

    if (formData.email && !validateEmail(formData.email)) {
      setIsEmailValid(false);
    } else if (formData.email === "") {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }

    if (formData.password && !validatePassword(formData.password)) {
      setIsPasswordValid(false);
    } else if (formData.password === "") {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
 
  const validatePassword = (password) => {
    const re = /^.{6,}$/;
    return re.test(password);
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


 const handleLinkChange = (e) => {
  const urlre = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (urlre.test(e.target.value)) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  } else {
    setErrorLinkMessage(`Un lien n'est pas valide il ne sera pas pris en compte dans la création mais vous pourrez le modifier ultérieurement`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }
 }
const addDiplome = () => {
    const newSelect = (
        <select
            className='border-[1px] px-4 py-2 w-64 focus:outline-none border-black md:w-full'
            name={`diplomes`}
            id={`diplomes-${diplomesList.length + 1}`}
            onChange={handleChangeDiplome}
        >
          <option value="Aucun Diplomes">Aucun diplomes séléctionné</option>
          {data.diplomes.map((diplome) => (
            <option value={diplome}>{diplome}</option>
          ))}
        </select>
    );
    setDiplomesList([...diplomesList, newSelect]);
}

const removeDiplome = () => {
    const removedDiplome = diplomesList[diplomesList.length - 1];
    setDiplomesList(diplomesList.slice(0, -1));
    setSelectedValues(prevValues => {
        const { [removedDiplome.props.id]: removedValue, ...newValues } = prevValues;
        return newValues;
    });
  };

const handleChangeDiplome = (e) => {
    const diplome = e.target.value;
    setSelectedValues({ ...selectedValues, [e.target.id]: diplome });
};




  const handleLogoProfileChange =  (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setConfirmLogoProfile(true);
      setLogo(file);
      setFormData({ ...formData, photoprofile: file });
      formData2.append('photoprofile', file , file.name);
    } else {
      setConfirmLogoProfile(false);
    }
  };

   

  const handleCVChange =  (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setConfirmCV(true);
      setCV(file);
      setFormData({ ...formData, cv: file });
      formData2.append('cv', file , file.name);
    } else {
      setConfirmCV(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   setFormData({ ...formData, photoprofile: formData2.get('photoprofile') });
   setFormData({ ...formData, CV: formData2.get('cv') });
   let data = await CreateUser(formData , selectedValues);
  
   if(data.message === "Utilisateur ajoutée avec succès"){
    setErrorMessage(null);
     window.location.href = "/connexion";
   }
   else{
    setErrorMessage(data.message);
    setFormData({ ...formData, logo: islogo });
    setFormData({ ...formData, cv: isCV});
    setConfirmLogoProfile(true);
    setConfirmCV(true);
   }
  };

  return (
    <>
      {errorMessage && (
        <div className="flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
          {errorMessage}
        </div>
      )}
      <section className="flex  items-center justify-center bg-white border-2 border-[#B19494] rounded-xl pb-10 mx-10 px-10  md:mx-20 my-10 md:px-24 lg:px-52 pt-10 mb-10">
        <div className="w-full">
          <h1 className="text-3xl font-semibold mb-10 flex flex-wrap justify-center items-center gap-10">Je créer mon compte</h1>
          <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full items-center">
              <label htmlFor="email" className="w-full text-background">
              <h2 className="pl-2"> Email <span className="text-red-500">*</span></h2>
                <input
                  onBlur={handleInputBlur}
                 
                  className={`w-full border-[1px] p-3 rounded-lg border-black focus:outline-none `}
                  type="text"
                  required="required"
                  aria-required="true"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
            {!isEmailValid && <div className="text-red-500">L'email est invalide</div>}

            <div className="w-full flex items-center">
              <label htmlFor="password" className="w-full text-background">
              <h2 className="pl-2"> Mot de passe <span className="text-red-500">*</span></h2>
                <input
                  onBlur={handleInputBlur}
                  className={`w-full border-[1px] p-3 rounded-lg border-black focus:outline-none `}
                  type="password"
                  required="required"
                  aria-required="true"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
            </div>
            {!isPasswordValid && (
              <div className="text-red-500">Le mot de passe doit contenir au moins 6 caractères</div>
            )}
            <div className="flex items-center  w-full">
              <label htmlFor="confirmpassword" className="text-background w-full">
              <h2 className="pl-2"> Comfirmer le mot de passe <span className="text-red-500">*</span></h2>
                <input
                  onBlur={handleInputBlur}
               
                  className={`w-full border-[1px] p-3 rounded-lg border-black focus:outline-none `}
                  type="password"
                  required="required"
                  aria-required="true"
                  name="confirmpassword"
                  id="confirmpassword"
                  value={confirmPasswordValue}
                  onChange={handleConfirmPasswordChange}
                />
              </label>
            </div>
            {formData.password !== confirmPasswordValue && (
              <div className="text-red-500">Le mot de passe doit être le même</div>
            )}
            <div className="flex w-full justify-around flex-row gap-4">
            <div className="flex items-center w-full">
              <label htmlFor="nom" className="text-background w-full">
              <h2 className="pl-2"> Nom <span className="text-red-500">*</span></h2>
                <input
                  onBlur={handleInputBlur}
                  
                  className={`w-full border-[1px] p-3 rounded-lg  border-black focus:outline-none `}
                  type="text"
                  required="required"
                  aria-required="true"
                  name="nom"
                  id="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="flex items-center w-full">
              <label htmlFor="prénom" className="text-background w-full">
              <h2 className="pl-2"> Prénom <span className="text-red-500">*</span></h2>
                <input
                  onBlur={handleInputBlur}
                  
                  className={`w-full border-[1px] p-3 rounded-lg  border-black focus:outline-none `}
                  type="text"
                  required="required"
                  aria-required="true"
                  name="prenom"
                  id="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </label>
            </div>
            </div>
            <div className="flex items-center w-full">
              <label htmlFor="presentation" className="text-background w-full">
              <h2 className="pl-2"> Présentez-vous <span className="text-red-500">*</span></h2>
                <textarea
                  onBlur={handleInputBlur}
                  value={formData.presentation}
                  onChange={handleChange}
                  name="presentation"
                  required="required"
                  aria-required="true"
                  id="presentation"
                  className="w-full border-[1px] p-3 rounded-lg  focus:outline-none border-black"
                ></textarea>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="presentation" className="flex flex-col  gap-4 text-background w-full">
              <h2 className="pl-2"> photo de profil <span className="text-red-500">*</span></h2>
                <input type="file" accept="image/*" onChange={handleLogoProfileChange} />
                {!confirmLogoProfile && <div className="text-red-500">La taille de l'image ne doit pas dépasser 2 Mo</div>}
              </label>
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="presentation" className="flex flex-col  gap-4 text-background w-full">
              <h2 className="pl-2"> CV (en pdf)<span className="text-red-500">*</span></h2>
                <input type="file" accept=".pdf" onChange={handleCVChange} />
                {!confirmCV && <div className="text-red-500">La taille de l'image ne doit pas dépasser 2 Mo</div>}
              </label>
            </div>

            <div className=" flex flex-col  w-full items-center gap-4">
            <label htmlFor="diplomes" className='text-lg font-semibold pb-2 pl-2'> Diplomes acquis </label>
            <select className='border-[1px] px-4 py-2 w-64 focus:outline-none border-black md:w-full' name="diplomes" id="diplomes" onChange={handleChangeDiplome}>
            <option value="Aucun Diplomes">Aucun diplomes séléctionné</option>
          {data.diplomes.map((diplome) => (
            <option value={diplome}>{diplome}</option>
          ))}
        </select>
            {diplomesList.map((select, index) => (
        <React.Fragment key={index}>
          {select}
        </React.Fragment>
      ))}
      <div className="flex gap-5">
            <p className="text-base w-fit text-white font-semibold rounded-full bg-button px-5 md:px-4 py-4 cursor-pointer" onClick={addDiplome}>Ajouter des diplomes</p>
      {diplomesList.length > 0 && (
        <p className="text-base w-fit text-white font-semibold rounded-full bg-button px-5 md:px-4 py-4 cursor-pointer" onClick={removeDiplome}>Supprimer un champ diplome</p>
      )}
      </div>
          </div>


            <div className="flex flex-wrap justify-center items-center gap-5 mt-16 w-full">
            <h2 className="pl-2 font-semibold md:text-xl"> Réseaux sociaux (modifiable ultérieurement dans votre compte , si ce n'est pas un lien il ne seras pris en comtpe lors de la création du compte)</h2>
              <label htmlFor="x" className="text-background w-full ">
              <h2 className="pl-2 pb-2"> X </h2>
                <input
                  onBlur={handleInputBlur}
                  
                  className={`w-full border-[1px] p-3 rounded-lg border-black  focus:outline-none `}
                  type="text"
                  aria-required="true"
                  placeholder="saisir un lien"
                  name="x"
                  id="x"
                  value={formData.x}
                  onChange={handleLinkChange}
                />
              </label>
              <label htmlFor="Instagram" className="text-background w-full">
              <h2 className="pl-2 pb-2"> Instagram </h2>
                <input
                  onBlur={handleInputBlur}
                  
                  className={`w-full border-[1px] p-3 rounded-lg border-black  focus:outline-none `}
                  type="text"
                  aria-required="true"
                  name="Instagram"
                  id="Instagram"
                  placeholder="saisir un lien"
                  value={formData.instagram}
                  onChange={handleLinkChange}
                />
              </label>
              <label htmlFor="Facebook" className="text-background w-full">
              <h2 className="pl-2 pb-2"> Facebook  </h2>
                <input
                  onBlur={handleInputBlur}
                  
                  className={`w-full border-[1px] p-3 rounded-lg border-black  focus:outline-none `}
                  type="text"
                  aria-required="true"
                  name="Facebook"
                  id="Facebook"
                  placeholder="saisir un lien"
                  value={formData.facebook}
                  onChange={handleLinkChange}
                />
              </label>
              <label htmlFor="Linkedin" className="text-background w-full">
              <h2 className="pl-2 pb-2"> Linkedin  </h2>
                <input
                  onBlur={handleInputBlur}
              
                  className={`w-full border-[1px] p-3 rounded-lg border-black  focus:outline-none `}
                  type="text"
                  aria-required="true"
                  name="Linkedin"
                  id="Linkedin"
                  placeholder="saisir un lien"
                  value={formData.linkedin}
                  onChange={handleLinkChange}
                />
              </label>
              <label htmlFor="Github" className="text-background w-full">
              <h2 className="pl-2 pb-2"> Github  </h2>
                <input
                  onBlur={handleInputBlur}
              
                  className={`w-full border-[1px] p-3 rounded-lg border-black  focus:outline-none `}
                  type="text"
                  aria-required="true"
                  name="Github"
                  id="Github"
                  placeholder="saisir un lien"
                  value={formData.github}
                  onChange={handleLinkChange}
                />
              </label>
              <label htmlFor="Site" className="text-background w-full">
              <h2 className="pl-2 pb-2"> SiteWeb  </h2>
                <input
                  onBlur={handleInputBlur}
              
                  className={`w-full border-[1px] p-3 rounded-lg border-black  focus:outline-none `}
                  type="text"
                  aria-required="true"
                  name="Site"
                  id="Site"
                  placeholder="saisir un lien"
                  value={formData.Site}
                  onChange={handleLinkChange}
                />
              </label>
            </div>




            <p className="text-xs">
              En cliquant sur "S'INSCRIRE", vous acceptez nos&nbsp;
              <span className="cursor-pointer text-border underline">Conditions d'utilisation&nbsp;</span>
              et notre&nbsp;
              <span className="cursor-pointer text-border underline">Politique de confidentialité</span>.
            </p>

            <button
              type="submit"
              aria-disabled="true"
              disabled={
                !isEmailValid ||
                !isPasswordValid ||
                formData.password !== confirmPasswordValue ||
                formData.presentation === "" || 
                !confirmLogoProfile || !confirmCV
              }
              className={`text-lg w-fit text-white font-semibold rounded-full bg-button px-10 md:px-16 py-4 ${
                !isEmailValid ||
                !isPasswordValid ||
                formData.name === "" ||
                formData.password !== confirmPasswordValue ||
                formData.presentation === "" || 
                !confirmLogoProfile || !confirmCV
                  ? "bg-gray-500"
                  : ""
              } `}
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
