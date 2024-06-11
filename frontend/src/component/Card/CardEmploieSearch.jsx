import { Link } from "react-router-dom"

export default function CardEmploieSearch(data) {
  
return(
<>
<Link className="w-full" to={`/offre/${data.id}`}>
    <div className="flex flex-col items-center gap-3 md:gap-20 border-4 rounded-xl border-border  py-4 ml-10 px-5 md:pb-2 lg:justify-between md:flex-row md:items-start lg:w-11/12 bg-white active:scale-95 duration-300 cursor-pointer">
        <div className="md:flex md:flex-col md:justify-center md:h-full md:items-center font-regular text-sm">
            <img className="w-10" src={`/uploads/${data.company.logo}`} alt="" />
            <p>{data.company.name}</p>
        </div>
        <div className="flex flex-col items-center gap-4 lg:w-full">
        <h3 className="text-xl uppercase font-bold flex items-start w-full sm:items-center md:items-start">{data.name}</h3>
        <div className='text-white flex gap-3 flex-wrap pb-8 md:pb-0 items-center md:w-full'>
    <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {data.contrat} </p>
    <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {data.lieu} </p>
    <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {data.salaire}€ </p>
    <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> télétravail {data.télétravail} </p>
</div>
        </div>
        <div className="flex md:flex-col md:h-full justify-between md:items-end w-full items-center md:px-5 h-full">
        <img src="/iconelike.svg" alt="" />
        <div className="flex flex-col w-fit">
        <h3 className="w-full h-full">Adresse : </h3>
        <p>{data.adresse}  {data.lieu}</p>  
        </div>  
       </div>
    </div>
    </Link>
</>

)

}