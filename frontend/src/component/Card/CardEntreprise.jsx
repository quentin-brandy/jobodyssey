import React from 'react';

const CardEntreprise = (entreprise) => {
   
    return (
        <div className="flex flex-col border-4 w-fit px-8 rounded-2xl gap-6 border-background bg-white pt-6 m-5">
            <div className='flex justify-between gap-20 '>
            <img className='md:w-20 md:h-20' src="logoentreprise.png" alt="Logo de l'entreprise" /> 
            <img src="Bookmark.svg" alt="checkmark" />
            </div>
            <div className='flex flex-col gap-2'>
            <h2 className='text-xl font-semibold'>Job Odyssey</h2>
            <p className='font-medium'>Angouleme</p>
            <p className='font-medium'>agence web</p>
            </div>
            <button className='bg-button px-4 py-1 rounded-3xl  text-white my-4 max-w-10'>Voir les offres</button>
        </div>
    );
};

export default CardEntreprise;