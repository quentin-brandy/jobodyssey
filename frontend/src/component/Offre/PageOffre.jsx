

export default function PageOffrePrévisualisation({data}){

return(
    <>
<div className="border-2 bg-white border-black px-5 md:px-10 mx-5 md:mx-10 lg:mx-28 my-10 py-10">
    <div className="flex flex-col mb-40">
    <div className="flex flex-wrap  mb-2 justify-between items-center w-full">
    <h1 className="font-bold text-2xl md:text-4xl">{data.name}</h1>
    <img className="flex items-end justify-end w-10 md:w-10" src="iconelike.svg" alt="like" />
    <img className="absolute hidden md:block right-1/3 top-[75rem] w-20" src="star.svg" alt="star" />
    <img className="absolute hidden md:block left-1/2 w-20" src="star.svg" alt="star" />
    </div>
    <h3 className="font-regular text-lg md:text-xl mb-5">{data.domaine}</h3>
    <h3 className="font-regular text-lg md:text-xl mb-5">{data.adresse} , {data.lieu}</h3>
    <div className="flex flex-col gap-4">
    <p className="font-regular text-lg md:text-xl">Résumer du poste : </p>
    <div className="flex flex-col sm:flex-row justify-center items-center md:justify-between w-full md:items-end mb-10">
    <div className='text-white flex gap-3 md:gap-6 flex-wrap pb-8  items-center justify-start md:w-1/2'>
    <p className='text-lg bg-button items-center w-fit px-6 py-1 rounded-3xl md:text-base md:px-10 md:py-2 font-semibold'> {data.contrat} </p>
    <p className='text-lg bg-button items-center w-fit px-6 py-1 rounded-3xl  md:text-base md:px-10 md:py-2 font-semibold'> {data.lieu} </p>
    <p className='text-lg bg-button items-center w-fit px-6 py-1 rounded-3xl  md:text-base md:px-10 md:py-2 font-semibold'> {data.salaire}€</p>
    <p className='text-lg bg-button items-center w-fit px-6 py-1 rounded-3xl md:text-base md:px-10 md:py-2 font-semibold'> Télétrvail {data.télétravail} </p>
</div>
    <button className="bg-button px-4 py-2 text-white rounded-xl sm:px-8 sm:py-4 sm:text-xl  active:scale-90">Postuler à l'offre</button>
    </div>
    </div>
    <p>publié le </p>
    
    </div>
    <div className="flex flex-col w-full">
    <img className="absolute hidden md:block right-10 -bottom-[65rem] w-32 md:w-auto " src="rocket.png" alt="rocket" />
    <h2 className="text-xl font-regular pb-2 mb-10 border-black border-b-2 md:text-3xl">Détail de l'offre</h2>   

    <h3 className="text-xl md:text-2xl font-semibold mb-4">Description du post</h3>
    <p className="pb-10">{data.description}</p> 
    <h3 className="text-xl md:text-2xl font-semibold mb-4">Compétences requises pour le poste</h3>
    <p className="pb-10">{data.compétences}</p>
    <div className="flex justify-center w-full">
    <button className="bg-button px-4 py-2 text-white rounded-xl sm:px-8 sm:py-4 sm:text-xl flex w-fit items-center justify-center active:scale-90">postuler à l'offre</button>
    </div>
    </div>
</div>
</>
)

}