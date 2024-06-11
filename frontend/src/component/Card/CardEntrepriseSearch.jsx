import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CardEntrepriseSearch(entreprise) {
    const [presentation, setPresentation] = useState(`${entreprise.presentation}`);

    useEffect(() => {
        setPresentation(entreprise.presentation.slice(0, 50) + '...');
    }, []);

    return (
        <Link to={`/entreprise/${entreprise.id}`}>
        <div className="flex flex-col border-4 w-fit px-8 rounded-2xl gap-6 border-background bg-white pt-6 m-5 active:scale-90">
            <div className='flex justify-between md:gap-20 '>
                <img className='md:w-20 md:h-20' src={`/uploads/${entreprise.logo}`} alt="Logo de l'entreprise" />
                <img className="hidden" src="/Bookmark.svg" alt="checkmark" />
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-xl font-semibold'>{entreprise.name}</h2>
                <p className='font-medium w-52'>{entreprise.activity}</p>
                <p className='font-medium max-w-72'>{presentation}</p>
            </div>
            <button className='bg-button px-4 py-1 rounded-3xl  text-white my-4'>Voir les offres</button>
        </div>
        </Link>
    );
};