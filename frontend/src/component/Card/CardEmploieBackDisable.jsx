import { Link } from "react-router-dom";
import { UpdateOffer } from "../../libs/post";
import { DeleteOffer } from "../../libs/delete";
export default function CardEmploieDisableBack( offre) {
 let user = offre.user;
 let offres = offre.offre;



const handleactive = async () => {

   let response = await UpdateOffer({id: offres.id, active: 1});
    if (response.message === "mise à jour réussi") {
        window.location.reload();
   }
   else{
       setErrorMessage(response.message)
       setTimeout(() => {
           setErrorMessage(null)
       }, 3000);
   }
}

const handledelete = async () => {
    let response = await DeleteOffer({id: offres.id});
     if (response.message === "mise à jour réussi") {
         window.location.reload();
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
        <div className="flex flex-col items-center gap-10 border-4 rounded-xl border-border py-4 px-5 md:pb-2 lg:justify-between md:flex-row md:items-start">
        <div className="flex  flex-col  items-center font-semibold sm:text-lg gap-2 text-sm">
            <img className="w-24" src={`/uploads/${user.logo}`} alt="" />
            <p>{user.name}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl uppercase font-bold flex items-start w-full sm:items-center md:items-start">{offres.name}</h3>
        <div className='text-white flex gap-3 flex-wrap  pb-8  items-center md:w-80'>
    <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {offres.contrat} </p>
    <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {offres.lieu} </p>
    <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {offres.salaire}€ </p>
    <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> télétravail {offres.télétravail} </p>
</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
         
        <button onClick={handleactive} className="flex flex-col bg-button px-8 text-white rounded-lg py-3 w-full justify-center items-center active:scale-95">réactiver</button>
        <button onClick={handledelete} className="flex flex-col bg-button px-8 text-white rounded-lg py-3 w-full justify-center items-center active:scale-95">suprimmer définitivement</button>
       </div>
    </div>
   </>
    )


}