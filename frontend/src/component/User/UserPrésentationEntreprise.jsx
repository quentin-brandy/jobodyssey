import { useState , useEffect } from "react";
export default function UserPresentationEntreprise(data){
    const [diplomesArray, setDiplomesArray] = useState([]);
    let user  = data.data.user;
   
    useEffect(() => { 
        setDiplomesArray(JSON.parse(user.diplomes));
       
    }, []);
    const calculateExperience = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = diffDays % 30;
        let experience = '';
        if (years > 0) {
            experience += `${years} an${years > 1 ? 's' : ''}`;
        }
        if (months > 0) {
            experience += `${experience ? ', ' : ''}${months} mois`;
        }
        if (days > 0) {
            experience += `${experience ? ', ' : ''}${days} jour${days > 1 ? 's' : ''}`;
        }
        return experience;
    };

    const handleback = () => {
        window.history.back();
    }
    
    
    return (
        <>
        <button onClick={handleback} className="w-fit flex items-center justify-center text-lg text-white font-semibold rounded-lg px-32 md:px-8 mt-10 ml-10 py-4 bg-button">Retourner au candidature</button>
        <div className="flex flex-col gap-4 my-10 mx-5 sm:flex-row sm:w-full mt-20 sm:justify-between sm:px-10 sm:mb-28 md:px-16 lg:pr-32">
            <div className="flex flex-col gap-8 sm:items-center sm:gap-0">
            <div className="flex flex-wrap justify-center items-center h-full gap-5">
                <img className=" border-2 border-black rounded-full p-2 w-20 md:w-40 lg:w-40" src={`/uploads/${user.photoprofile}`} alt="" />
                <h1 className="text-xl md:text-3xl lg:text-4xl flex items-center h-full font-bold uppercase">{user.prenom} {user.nom}</h1>
            </div>
            <div className="flex flex-col bg-white border-2 border-black p-4 sm:pr-20 sm:ml-20 md:ml-40 lg:pr-40">
                <ul className="flex flex-col gap-2">
                    <li> <h2 className="pb-2 text-lg font-bold lg:text-xl">diplomes :</h2></li>
                {diplomesArray.map((diplome, index) => (
                    <li>
                    <p className="text-start font-medium lg:text-lg" key={index}>{diplome}</p>
                    </li>
                ))}
                </ul>
                </div>
                </div>
                <div className="flex flex-col bg-white border-2 border-black p-4 sm:pr-20 sm:pl-5 lg:gap-4">
                    <h2  className="font-bold mb-5 lg:text-xl">Réseaux Sociaux : </h2>
                    <ul className="flex flex-col gap-4 lg:gap-8 ">
                    {user.Facebook !== "a définir" && (
                            <li className="flex ">
                            <a href={user.Facebook} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center">
                                <img className="w-10" src="/facebook.png" alt="linkedin" />
                            <p className=" font-bold lg:text-lg underline">Facebook</p>
                            </a>
                            </li>
                        )}
                        {user.Instagram !== "a définir" && (
                            <li className="flex ">
                            <a href={user.Instagram} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center">
                                <img className="w-10" src="/instagram.png" alt="linkedin" />
                            <p className=" font-bold lg:text-lg underline">Instagram</p>
                            </a>
                            </li>
                        )}
                        {user.Linkedin !== "a définir" && (
                            <li className="flex ">
                            <a href={user.Linkedin} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center">
                                <img className="w-10" src="/linkedin.png" alt="linkedin" />
                            <p className=" font-bold lg:text-lg underline">Linkedin</p>
                            </a>
                            </li>
                        )}
                        {user.Github !== "a définir" && (
                            <li>
                            <a href={user.Github} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center"><img className="w-10" src="/github-mark.svg" alt="github" />
                            <p className="font-bold lg:text-lg underline cursor-pointer">github</p></a>
                            </li>
                        )}
                        {user.X !== "a définir" && (
                            <li>
                            <a href={user.X} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center"><img className="w-10" src="/x.png" alt="x" />
                            <p className="font-bold lg:text-lg cursor-pointer">X</p></a>
                            </li>
                        )}
                        {user.Site !== "a définir" && (
                            <li className="flex ">
                            <a href={user.Site} target="_blank" rel="noreferrer" className="flex gap-4 w-full items-center">
                                <img className="w-10" src="/website.svg" alt="linkedin" />
                            <p className=" font-bold lg:text-lg underline">Site web</p>
                            </a>
                            </li>
                        )}
                        </ul>
                </div>
            </div>
            <div className="flex flex-col gap-4 my-10 mx-5 sm:mb-20 md:px-8 xl:px-20">
            <h2 className="text-lg font-bold lg:text-2xl">Présentation : </h2>
            <p className="font-medium">{user.presentation} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, voluptas? Aut ad labore magnam dolor accusamus ex fugit, error in quos modi tenetur quibusdam quia numquam quas enim neque. Temporibus? f df sd f sdf s f sdf sd f sdf sd fds f sd f sd f sdf sd fsdfdsd</p>
                </div>
                <div className="flex flex-col gap-8 my-10 mx-5 sm:mb-20 md:px-8 xl:px-20 ">
            <h2 className="text-lg font-bold lg:text-2xl">Expérience : </h2>
            {user.experiences.length > 0 ? (
                <div className="flex flex-col gap-20">
                    {user.experiences.map((experience) => (
                        <div className="flex flex-col gap-4 border-2 border-black p-4 bg-white">
                            <h2 className="font-bold text-xl">{experience.nomJob}</h2>
                            <p className="font-medium">entreprise : {experience.nomEntreprise}</p>
                            <div className="flex gap-4">
                                <p>{experience.ville}</p>
                                <p>{experience.contrat}</p>
                                <p>{calculateExperience(experience.dateDebut , experience.dateFin)}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className=" text-lg font-semibold">Mission :</h3>
                                <p>{experience.mission}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2>Aucune expérience</h2>
            )}
            </div>
        </>
    )
}