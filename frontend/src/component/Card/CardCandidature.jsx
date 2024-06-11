import { Link } from "react-router-dom";
import { useState } from "react";
import { RefuseCandidatures , AcceptCandidatures } from "../../libs/get";
export default function CardCandidature(candidat){
const [errorMessage, setErrorMessage] = useState();
const [status, setStatus] = useState(candidat.offresuser[0].statut);





const handleDownload = (e) => {
        // using Java Script method to get PDF file
        fetch(`/uploads/${e.target.id}`).then((response) => {
         response.blob().then((blob) => {
          
             // Creating new object of PDF file
             const fileURL =
                 window.URL.createObjectURL(blob);
                  
             // Setting various property values
             let alink = document.createElement("a");
             alink.href = fileURL;
             alink.download = `${e.target.name}.pdf`;
             alink.click();
         });
     });
     };


     const handleRefuse = async (e) => {
        let response = await RefuseCandidatures(e.target.id , candidat.offresuser[0].OffreId);
        if (response.message === "Candidature refusée") {
                setStatus("refusé");
        }
        else{
                setErrorMessage("une erreur est surenue lors de la suppression de la candidature");
        }
     }
     const handleAccept = async (e) => {
        let response = await AcceptCandidatures(e.target.id , candidat.offresuser[0].OffreId);
        if (response.message === "Candidature accepté") {
                setStatus("accepté");
        }
        else{
                setErrorMessage("une erreur est surenue lors de la suppression de la candidature");
        }
     }



    return(
       status !== "refusé" ? (
            <li  className="flex flex-col flex-wrap gap-4 border-4 w-fit bg-white border-button rounded-xl p-4">
                    <div className="flex text-balance gap-4  items-center">
                            <img className="max-h-28 sm:max-h-40 rounded-xl" src={`/uploads/${candidat.photoprofile}`}  alt="" />
                            <p className="font-semibold text-lg text-wrap  break-all">{candidat.nom} {candidat.prenom}</p>
                    </div>
                    <div className="flex items-center gap-2">
                            <img width={30} src="/Account.png" alt="" />
                            <Link to={`${candidat.id}`}>
                            <p className="max-w-90 break-all underline font-semibold cursor-pointer">consulter le profil</p>
                            </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                            <img width={30} src="/file.svg" alt="" />
                            <a onClick={handleDownload} id={candidat.cv} name={candidat.nom}className="font-semibold underline cursor-pointer">CV du candidat</a>
                    </div>
                    <div className="flex flex-col gap-2">
                    <p className="font-semibold">diplomes : </p>
                       {candidat.diplomes.map((diplome, index) => (
                            <p key={index} className="text-sm font-medium md:text-base">{diplome}</p>
                    ))}   
                    </div>
                    {status === "en attente" ? (
                    <div className="flex flex-col gap-4 sm:gap-20 sm:flex-row sm:justify-between">
                    <button id={candidat.id} onClick={handleRefuse} className="bg-rouge p-2 text-white rounded-xl sm:text-lg sm:px-5 active:scale-90">Refuser</button>
                    <button id={candidat.id}  onClick={handleAccept} className="bg-button p-2 rounded-xl text-white sm:text-lg sm:px-5 active:scale-90">Accepter</button>
            </div>
                    ) : <Link to={`${candidat.id}/chat`}> <button className="bg-button p-2 rounded-xl text-white sm:text-lg sm:px-5 active:scale-90 font-semibold w-full">Chatter avec le candidat</button></Link>
                            }
                   
            </li>
           ) : ""
    )
}