import CardEmploie from "../Card/CardEmploie";
import SliderEmploie from "../Slider/SliderEmploie";
import { postulerOffre} from "../../libs/post";
import { DelOffer } from "../../libs/delete";
import { useState } from "react";
export default function PageOffre(data ){
 const [onpostuler, setOnpostuler] = useState(data.data.postulé ? "postulé" : "postuler à l'offre");
 const [errorMessage, setErrorMessage] = useState(false);

 let offre = data.data.offres;


const regex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*/;
const [, date, time] = regex.exec(offre.createdAt);
const formattedDate = `${date} à ${time}`;



const handlepostuler = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
        window.location.href = `/connexion?link=${window.location.pathname}`;
    }
    else{
        let response = await postulerOffre({offreid: offre.id});
        if (response.message === "postuler avec succès") {
           setOnpostuler("postulé");
        }
        else{
            setErrorMessage(response.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);    
        }
    
}}
 
const handledelpost = async () => {
    let response = await DelOffer({offreid: offre.id});
    if (response.message === "détruit") {
        setOnpostuler("postuler à l'offre");
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
    <div>
        <img className="w-full h-72" src={`/uploads/${offre.company.banner}`} alt="" />
        <h2 className="uppercase font-bold text-lg md:text-2xl mx-5 md:mx-10 lg:mx-28 border-b-2 border-gray-400 pb-2 mt-10">{offre.company.name}</h2>

    </div>

<div className="border-2 bg-white border-black px-5 md:px-10 mx-5 md:mx-10 lg:mx-28 my-10 py-10">
    <div className="flex flex-col mb-40">
    <div className="flex flex-wrap  mb-2 justify-between items-center w-full">
    <h1 className="font-bold text-2xl md:text-4xl">{offre.name}</h1>
    <img className="flex items-end justify-end w-10 md:w-10 cursor-pointer" src="/iconelike.svg" alt="like" />
    <img className="absolute hidden md:block right-1/3 top-[40rem] w-20" src="star.svg" alt="" />
    <img className="absolute hidden md:block left-1/2 w-20" src="star.svg" alt="" />
    </div>
    <h3 className="font-regular text-lg md:text-xl mb-5">{offre.domaine}</h3>
    <h3 className="font-regular text-lg md:text-xl mb-5">{offre.adresse} , {offre.lieu}</h3>
    <div className="flex flex-col gap-4">
    <p className="font-regular text-lg md:text-xl">Résumer du poste : </p>
    <div className="flex flex-col sm:flex-row justify-center items-center md:justify-between w-full md:items-end mb-10">
    <div className='text-white flex gap-3 md:gap-6 flex-wrap pb-8  items-center justify-start md:w-1/2'>
    <p className='text-lg bg-button items-center w-fit px-6 py-1 rounded-3xl md:text-base md:px-10 md:py-2 font-semibold'> {offre.contrat} </p>
    <p className='text-lg bg-button items-center w-fit px-6 py-1 rounded-3xl  md:text-base md:px-10 md:py-2 font-semibold'> {offre.lieu} </p>
    <p className='text-lg bg-button items-center w-fit px-6 py-1 rounded-3xl  md:text-base md:px-10 md:py-2 font-semibold'> {offre.salaire}€</p>
    <p className='text-lg bg-button items-center w-fit px-6 py-1 rounded-3xl md:text-base md:px-10 md:py-2 font-semibold'> Télétrvail {offre.télétravail} </p>
</div>
    {onpostuler === "postulé" ? (
        <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold">Vous avez déjà postulé à cette offre.</p>
        <button className="bg-button px-4 py-2 text-white rounded-xl sm:px-6 sm:py-2 sm:text-xl  active:scale-90" onClick={handledelpost}> supprimer ma demande</button>
        </div>
   
    ) : (
        <button className="bg-button px-4 py-2 text-white rounded-xl sm:px-8 sm:py-4 sm:text-xl  active:scale-90" onClick={handlepostuler}>{onpostuler}</button>
    )}
    </div>
    </div>
    <p>publié le {formattedDate}</p>
    
    </div>
    <div className="flex flex-col w-full">
    <img className="absolute hidden md:block right-10 -bottom-[34rem] w-32 md:w-auto " src="rocket.png" alt="" />
    <h2 className="text-xl font-regular pb-2 mb-10 border-black border-b-2 md:text-3xl">Détail de l'offre</h2>   

    <h3 className="text-xl md:text-2xl font-semibold mb-4">Description du post</h3>
    <p className="pb-10">{offre.description}</p> 
    <h3 className="text-xl md:text-2xl font-semibold mb-4">Compétences requises pour le poste</h3>
    <p className="pb-10">{offre.compétences}</p>
    <div className="flex justify-center w-full">
    {onpostuler === "postulé" ? (
        <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold">Vous avez déjà postulé à cette offre.</p>
        <button className="bg-button px-4 py-2 text-white rounded-xl sm:px-6 sm:py-2 sm:text-xl  active:scale-90" onClick={handledelpost}> supprimer ma demande</button>
        </div>
   
    ) : (
        <button className="bg-button px-4 py-2 text-white rounded-xl sm:px-8 sm:py-4 sm:text-xl  active:scale-90" onClick={handlepostuler}>{onpostuler}</button>
    )}
    </div>
    </div>
</div>
<div className="flex flex-col gap-10 h-full py-20">
<h2 className="mx-5 md:mx-10 font-regular text-base sm:text-xl">Offre similaire dans le même domaine : </h2>
< SliderEmploie emploie={data.emploie}/>
</div>
</>
)

}