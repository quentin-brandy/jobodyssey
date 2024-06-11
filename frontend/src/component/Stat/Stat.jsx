import React from 'react';

const Stat = () => {
    return (
        <div className='w-full flex flex-col items-center bg-stat gap-16 my-16 py-10'>
            <h2 className='text-white font-semibold md:font-bold text-center text-2xl md:text-4xl'>Job Odyssey en quelques chiffres c'est : </h2>
            <ul className='w-full text-white font-semibold flex flex-col justify-center gap-16 items-center md:flex-row md:gap-10 md:justify-evenly px-10 md:items-start text-center'>
                <li className=' max-w-60'>
                <h3 className=' text-xl md:text-3xl'>15 000 OFFRES d’emploie</h3>
                </li>
                <li className='max-w-60'>
                <h3 className='text-xl md:text-3xl'>200 Entreprises de tout les dommaines</h3>
                </li>
                <li className='max-w-60'>
                <h3 className='text-xl md:text-3xl'>Des emploies dans 5 pays</h3>
                </li>
            </ul>
        </div>
    );
};

export default Stat;