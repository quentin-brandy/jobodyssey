import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';




export default function Inscription() {
    return (
        <>
        <Helmet>
        <title>Inscription</title>
        <meta name="description" content="Inscrivez vous sur Job Odyssey pour rechercher votre futur travail" />
    </Helmet>
        <div className='flex flex-col my-20'>
            <h1 className='font-bold text-2xl flex justify-center my-10 lg:text-4xl'>Bienvenue chez vous</h1>
            <div className='flex flex-col px-5 md:flex-row md:justify-center md:items-center'>
                <div className='flex flex-col justify-center items-center pb-10 gap-5 md:gap-10 border-b-2 md:pb-0 md:pr-10 lg:pr-20 md:border-b-0 md:border-r-2'>
                    <h2 className='text-lg font-base lg:text-xl'>S'Inscrire en tant qu'entreprise</h2>
                 <Link to={"entreprise"}>  <button className='text-xl text-white font-semibold rounded-sm bg-button px-10 md:px-16 py-4'>Je m'inscris</button></Link> 
                </div>
                <div className='flex flex-col mt-10 justify-center items-center pb-10 gap-5 md:gap-10 md:pl-10 lg:pr-20'>
                    <h2 className='text-lg font-base lg:text-xl'>S'Inscrire en tant que particulier</h2>
                    <Link to={"particulier"}>
                    <button className='text-xl text-white font-semibold rounded-sm bg-button px-10 md:px-16 py-4'>Je m'inscris</button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}