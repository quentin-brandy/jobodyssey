import { Link } from "react-router-dom";
export default function CardEmploieActiveBack( offre) {
 let user = offre.user;
 let offres = offre.offre;

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
            <Link className="flex w-full" to={`offre/modifier/${offres.id}`}>
        <button className="flex flex-col bg-button px-8 text-white rounded-lg py-3 w-full justify-center items-center active:scale-95">Modifier</button>
        </Link>
        <Link to={`offre/candidature/${offres.id}`}>
        <button className="flex flex-col bg-button px-8 text-white rounded-lg py-3 active:scale-95">Voir les candidatures</button>
        </Link>
       </div>
    </div>
   </>
    )


}