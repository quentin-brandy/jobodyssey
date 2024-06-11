import SliderEntreprise from "../Slider/SliderEntreprise"
export default function EntreprisePageComponent({entreprise , offre}) {

 
    let entreprises = entreprise.Entreprise;
   

  return (
    <div className="flex flex-col mb-10 gap-10">
        <img className="max-h-60 aspect-video" src={`/uploads/${entreprises.banner}`} alt="" />
        <div className=" mx-5 border-b-2 border-gray-500 pb-2">
            <h1 className="ml-3 font-bold uppercase text-xl sm:text-2xl md:text-3xl">{entreprises.name}</h1>
            <p className="sm:text-lg">{entreprises.adresse} - {entreprises.activity}</p>
        </div>

    <div className="flex flex-col sm:flex-row sm:justify-between mx-40 flex-wrap justify-center items-center h-full gap-5">
                <img className=" border-2 border-black rounded-lg p-4 w-20 md:w-40 lg:w-40" src={`/uploads/${entreprises.logo}`} alt="" />
                <h1 className="text-xl md:text-3xl lg:text-4xl flex items-center h-full font-bold uppercase"></h1>
                <div className="flex flex-col bg-white border-2 border-black p-4 sm:pr-20 sm:pl-5 lg:gap-4">
                    <h2  className="font-bold mb-5 lg:text-xl">Réseaux Sociaux : </h2>
                    <ul className="flex flex-col gap-4 lg:gap-8 ">
                    {entreprises.Facebook !== "a définir" && (
                            <li className="flex ">
                            <a href={entreprises.Facebook} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center">
                                <img className="w-10" src="/facebook.png" alt="linkedin" />
                            <p className=" font-bold lg:text-lg underline">Facebook</p>
                            </a>
                            </li>
                        )}
                        {entreprises.Instagram !== "a définir" && (
                            <li className="flex ">
                            <a href={entreprises.Instagram} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center">
                                <img className="w-10" src="/instagram.png" alt="linkedin" />
                            <p className=" font-bold lg:text-lg underline">Instagram</p>
                            </a>
                            </li>
                        )}
                        {entreprises.Linkedin !== "a définir" && (
                            <li className="flex ">
                            <a href={entreprises.Linkedin} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center">
                                <img className="w-10" src="/linkedin.png" alt="linkedin" />
                            <p className=" font-bold lg:text-lg underline">Linkedin</p>
                            </a>
                            </li>
                        )}
                        {entreprises.Github !== "a définir" && (
                            <li>
                            <a href={entreprises.Github} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center"><img className="w-10" src="/github-mark.svg" alt="github" />
                            <p className="font-bold lg:text-lg underline cursor-pointer">github</p></a>
                            </li>
                        )}
                        {entreprises.X !== "a définir" && (
                            <li>
                            <a href={entreprises.X} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center"><img className="w-10" src="/x.png" alt="x" />
                            <p className="font-bold lg:text-lg cursor-pointer">X</p></a>
                            </li>
                        )}
                        {entreprises.Site !== "a définir" && (
                            <li className="flex ">
                            <a href={entreprises.Site} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center">
                                <img className="w-10" src="/website.svg" alt="linkedin" />
                            <p className=" font-bold lg:text-lg underline">Site web</p>
                            </a>
                            </li>
                        )}
                        </ul>
                </div>
            </div>
            <div className="flex flex-col gap-4 border-2 border-button bg-white rounded-full w-3/4 py-4 rounded-l-none mt-10 sm:mt-20 pl-10 pr-5">
                <h2 className="font-semibold sm:text-lg md:text-xl">Qui sommes nous </h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, rerum nobis quo, eligendi ea, quos perspiciatis sequi quod iure quis aspernatur voluptate. Animi debitis officiis vel inventore labore, amet excepturi? {entreprises.presentation}</p>
            </div>
            <div className="flex flex-col gap-4 px-5 md:px-10">
                <h2 className="font-bold text-lg sm:text-xl md:text-2xl">nos offres</h2>
                <div>
                     <SliderEntreprise offre={offre}/> 
                </div>
            </div>
        </div>
  )
}