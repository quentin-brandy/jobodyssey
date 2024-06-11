import { useState } from "react";
export default function Banner() {
    const [search, setSearch] = useState("");

    const handlesearch = (e) => {  
        setSearch(e.target.value);
      
    }

    const searchOffer = async () => {
        window.location.href = `/recherche/offre/?search=${search}`;
    }
    return(
    <>
    <div className="h-fit">
    <div className="z-30 w-full h-[35rem]  flex flex-col md:flex-row items-center md:justify-evenly absolute px-10 gap-8">
        <img className="w-52 lg:w-auto  pl-30" src="/logowhite.png" alt="" />
        <div className="flex flex-col gap-4 md:gap-7 items-center justify-center text-white px-10">
            <h1 className=" font-bold text-3xl md:text-5xl"> JOB ODYSSEY</h1>
            <p className="w-52 md:w-96 lg:w-[36rem] lg:text-xl text-wrap text-left">"C'est plus de 50 0000 offre d'emploie  à travers la France et des centaines d'entreprises du monde entier</p>
            <div className="flex flex-col items-start w-full mt-10 gap-2">
                <h3 className="text-xl text-center md:text-left font-semibold text-white">Je cherche mon futur job</h3>
                <div className="flex flex-wrap items-center justify-center lg:flex-row gap-4">
                <input className="focus:outline-none bg-button rounded-md md:w-72 lg:w-96 px-2 py-2" placeholder="Recherche ton domaine" type="text" onChange={handlesearch} />
                <button onClick={searchOffer} className="text-black font-semibold bg-white px-4 py-2 w-fit rounded-md active:scale-90">Je recherche</button>
                </div>
            </div>
        </div>
    </div>
    <img className="h-[35rem] aspect-video md:aspect-auto w-full brightness-50" src="/bannerimg.png" alt="" />
 
    </div>
    </>
    )
    }