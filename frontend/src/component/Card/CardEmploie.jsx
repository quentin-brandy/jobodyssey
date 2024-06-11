import React from 'react';
import { Link } from 'react-router-dom';

const CardEmploie = (emploie) => {
 
    let emploies = emploie.emploie

    const createdAtDate = new Date(emploies.createdAt).toLocaleDateString();

    return (
        <Link  to={`/offre/${emploies.id}`}>
        <li className="flex flex-col relative w-52 md:w-fit border-4 border-border gap-5 cursor-pointer active:scale-95 shadow-card transition-transform duration-300 ease-in-out bg-white">
            <div>
                <img className='max-h-40' src={`/uploads/${emploies.company.banner}`} alt="header emploie" />
            </div>
            <div  className='flex items-center gap-4 px-3'>
                <img className='w-10' src={`/uploads/${emploies.company.logo}`} alt="logo entreprise" />
                <h3 className="text-base font-semibold sm:text-lg">{emploies.company.name}</h3>
            </div>
            <h2 className='text-xl w-fit font-bold uppercase text-wrap px-3 break-words'>{emploies.name}</h2>
            <div className='text-white flex gap-3 flex-wrap w-52 sm:w-80 pb-8 px-3'>
                <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {emploies.contrat} </p>
                <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {emploies.lieu} </p>
                <p className='text-xs bg-button items-center w-fit px-6 py-1 rounded-3xl'> {emploies.salaire} €</p>
                <p className='text-xs bg-button items-center w-fit px-3 py-1 rounded-3xl'> télétravail : {emploies.télétravail} </p>
            </div>
            <p className='text-sm font-light pb-2 px-3'>Mise en ligne le <span className='font-semibold'>{createdAtDate}</span></p>
        </li>
        </Link>
    );
};

export default CardEmploie;