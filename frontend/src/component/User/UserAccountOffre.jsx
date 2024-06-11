import { Link } from "react-router-dom";
import { useState } from "react";
import { CancelCandidatures } from "../../libs/get";
export default function UserAccountOffre(offres) {
   
const [errorMessage, setErrorMessage] = useState(null);



const handleCancel = async (e) => {
    e.preventDefault(); 
    let response = await CancelCandidatures(e.target.id );
    if (response.message === "Candidature supprimé") {
        window.location.reload();
    }
    else{
        setErrorMessage(response.message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000);
    }
}




    return (
        <div className="flex flex-col border-black pl-4 py-10 my-10 gap-8 ">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl md:mx-10">Emploie postulés</h1>
            <ul className="flex flex-col gap-10">
                {offres.offre.map((postulés, index) => (
                    errorMessage && (
                        <div className="flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
                            {errorMessage}
                        </div>
                    ),
                    <li
                        key={index}
                        className="flex flex-col items-center gap-3 md:gap-20 border-4 rounded-xl border-border py-4 mx-5 md:mx-10 px-5 md:pb-2 lg:justify-between md:flex-row md:items-start lg:w-11/12 bg-white"
                    >
                        <div className="flex flex-col gap-4 sm:gap-8 items-center sm:flex-row w-full justify-between">
                            <div className="sm:border-r-2 border-b-2 w-full sm:w-auto text-center sm:border-b-0 py-6 gap-4 h-full sm:pr-4">
                                {postulés.statut === "en attente" ? (
                                <p className="text-orange-600 font-semibold">{postulés.statut}</p>
                                ) : postulés.statut === "accepté" ? (
                                <p className="text-green-600 font-semibold">{postulés.statut}</p>
                                ) : (
                                <p className="text-red-500 font-semibold">{postulés.statut}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row items-center">
                                <div className="flex flex-col gap-4 items-center flex-wrap sm:w-fit">
                                    <img className="w-10" src={`/uploads/${postulés.offre.company.logo}`} alt="" />
                                    <p className="break-keep text-lg">{postulés.offre.company.name}</p>
                                </div>
                                <div className="flex flex-col items-center sm:items-start gap-4 justify-center">
                                    <h2 className="uppercase font-bold text-lg sm:text-2xl">{postulés.offre.name}</h2>
                                    <div className="text-white flex gap-3 flex-wrap pb-8 md:pb-0 items-center justify-center sm:justify-normal md:w-full">
                                        <p className="text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl">{postulés.offre.lieu}</p>
                                        <p className="text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl">{postulés.offre.contrat}</p>
                                        <p className="text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl">{postulés.offre.salaire}€</p>
                                        <p className="text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl">télétravail {postulés.offre.télétravail}</p>
                                    </div>
                                </div>
                            </div>
                            {postulés.statut === "en attente" ? (
                                <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row items-center">
                                    <button id={postulés.OffreId} className="flex flex-col bg-button px-8 text-white rounded-lg py-3 justify-center items-center active:scale-95" onClick={handleCancel}>
                                        Annuler ma candidature
                                    </button>
                                </div>
                            ) : postulés.statut === "accepté" ? (
                                <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row items-center">
                                    <Link to={`${postulés.OffreId}/${offres.user.id}/chat`}>
                                    <button className="flex flex-col bg-button px-8 text-white rounded-lg py-3 justify-center items-center active:scale-95">chatter avec l'entreprise</button>
                                    </Link>
                                </div>
                            
                            ) : (
                                <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row items-center">
                                    <Link to="/recherche/offre">
                                    <button className="flex flex-col bg-button px-8 text-white rounded-lg py-3 justify-center items-center active:scale-95">
                                        Retenter ma chance
                                    </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}