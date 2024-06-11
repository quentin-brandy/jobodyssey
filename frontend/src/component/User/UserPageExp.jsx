import AddExperience from "../Experience/AddExperience";
import UpdateExperience from "../Form/UpdateExperience";
import UpdateDiplome from "../Form/UpdateDiplome";
import { DeleteExperience } from "../../libs/delete";
import { changeUserDiplomes } from "../../libs/post";
import { useState , useEffect } from "react";
export default function UserAccountExp({user , experience , diplomeslist}){
const [addDiplome, setAddDiplome] = useState(false);
const [addExperience, setAddExperience] = useState(false);
const [OpenUpdateExperience, setOpenUpdateExperience] = useState(false);
const [expbtn, setExpbtn] = useState(false);
const [modifyExperience, setmodifyExperience] = useState([]);
const [diplomesArray, setDiplomesArray] = useState([]);
const [experienceArray, setExperienceArray] = useState(experience);
const [errorExperienceMessage, setErrorExperienceMessage] = useState(null);

useEffect(() => {
  setExperienceArray(experience);
    setDiplomesArray(JSON.parse(user.diplomes));
    
}, []);

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const handleDiplome = () => {
    setAddDiplome(!addDiplome);
}

const handleGetDiplomes = (e) => {
    setAddDiplome(!addDiplome);
    setDiplomesArray(e);
   
}


const handleDeleteDiplome = async (e) => {

    let newArray = diplomesArray.filter(diplome => diplome !== e.target.id);
    let diplomes = JSON.stringify(newArray);
  
    const response = await changeUserDiplomes(diplomes); 
    if(response.message === "mise à jour réussi"){
        setDiplomesArray(newArray);
    }
    else{
        setErrorMessage(response.message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    }
}


const handleExperience = () => {
    setExpbtn(!expbtn);
    if(expbtn === false){
        setAddExperience(true);
    }
    if(expbtn === true){
        setAddExperience(false);
        setOpenUpdateExperience(false);
    }

}
const handleUpdateExperience =  (e) => {
    let id = e.target.id - 1;

  let experiencess = experience[id];

  setOpenUpdateExperience(true);
  setmodifyExperience(experiencess);
   setExpbtn(!expbtn);
   
}


const handleGetExperience = (e) => {
    setExperienceArray([...experienceArray, e]);
    setExpbtn(false);
    setAddExperience(false);
}

const DelExperience = async (e) => {
    let response = await DeleteExperience(e.target.id);
    let id = parseInt(e.target.id) ;
  
    if (response.message === "Experience deleted successfully") {
        // Utilisation de l'ID de l'expérience à supprimer pour filtrer le tableau
        let newArray = experienceArray.filter(exp => exp.id !== id);
      
     
        setExperienceArray(newArray);
     
    } else {
        setErrorExperienceMessage(response.message);
        setTimeout(() => {
            setErrorExperienceMessage(null);
        }, 3000);
    }
}

    return (
        <>
        <div className={`flex flex-col border-2 border-black mx-5 pl-4 py-10 md:mx-10 my-10 gap-8 bg-white`}>
            <div className="flex  justify-between items-center border-b-2 mx-5  pb-5">
                <h2 className="font-bold text-lg sm:text-xl md:text-2xl">Mes diplômes</h2>
                <button className="flex items-center justify-center py-3 px-4 bg-button w-fit rounded-md font-regular text-white active:scale-90" onClick={handleDiplome}>{addDiplome ? "oubliez les modifications " : "ajoutez des diplômes"}</button>
            </div>
            <ul className={`flex flex-col gap-4 mx-5 sm:mx-10 pb-10 border-b-2  ${addDiplome ? "border-b-2" : "border-none"}`}>
                {diplomesArray.map((diplome, index) => (
                    <li key={index} className="flex flex-col items-center gap-4  md:gap-0 sm:items-start sm:flex-row w-full justify-between sm:pr-5">
                        {diplome !== "Aucun Diplomes" && (
                            <>
                                <h3>diplôme :</h3>
                                <p className="font-bold text-start">{diplome}</p>
                                <p id={diplome} className="text-button font-semibold cursor-pointer" onClick={handleDeleteDiplome}>supprimez le diplome</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <UpdateDiplome handleGetDiplome={handleGetDiplomes} diplome={diplomesArray} open={addDiplome} diplomeslist={diplomeslist}/>
        </div>
        <div className="flex flex-col border-2 border-black mx-5 pl-4 py-10 md:mx-10 my-10 gap-8 bg-white">
        <div className="flex  justify-between items-center border-b-2 mx-5  pb-5">
                <h2 className="font-bold text-lg sm:text-xl md:text-2xl">Mes expériences professionnels</h2>
                <button className="flex items-center justify-center py-3 px-4 bg-button w-fit rounded-md font-regular text-white active:scale-90" onClick={handleExperience}>{expbtn ? "oubliez les modifications " : "ajoutez une expérience"} </button>
            </div>
            <div className={`${addExperience ? "hidden" : "block"} ${OpenUpdateExperience ? "hidden" : "block"}`}>
            <div className="flex flex-col gap-7 px-10 ">
                {experienceArray.map((exp, index) => (
                    <div className="pb-4">
                    <div key={index} className="flex flex-col gap-4 sm:flex-row sm:justify-between border-b-2 pb-2 mb-5">
                        <h3 className="font-semibold text-xl">{exp.nomJob}</h3>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <button className="font-semibold  text-button cursor-pointer" id={exp.id} onClick={handleUpdateExperience}>modifier</button>
                            <button className="font-semibold text-red-600 cursor-pointer" id={exp.id} onClick={DelExperience}>supprimer</button>
                        </div>
                    </div>
                    {errorExperienceMessage && (
                        <div className="flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
                            {errorExperienceMessage}
                        </div>
                    )}
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-4 items-center flex-wrap">
                            <p className="text-md font-medium">nom de l'entreprise : </p>
                            <p className="text-lg">{exp.nomEntreprise}</p>
                        </div>
                        <div className="flex gap-4 items-center flex-wrap">
                            <p className="text-md font-medium">localisation : </p>
                            <p className="text-lg">{exp.ville}</p>
                        </div>
                        <div className="flex gap-4 items-center flex-wrap">
                            <p className="text-md font-medium">type de contrat : </p>
                            <p className="text-lg">{exp.contrat}</p>
                        </div>
                        <div className="flex gap-4 items-center flex-wrap">
                            <p className="text-md font-medium">durée de l'expérience : </p>
                            <p className="text-lg "> du {formatDate(exp.dateDebut)} au {formatDate(exp.dateFin)}</p>
                        </div>
                        <div className="mt-4 flex flex-col justify-start gap-2 items-start">
                            <p className="text-md font-medium">description du poste et mission : </p>
                            <p className="text-lg">{exp.description}</p>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
            </div>
            <UpdateExperience handleGetExperience={handleGetExperience} experience={modifyExperience} open={OpenUpdateExperience}/>
            <AddExperience handleGetExperience={handleGetExperience} open={addExperience}/>
        </div>
       </>
    );
}