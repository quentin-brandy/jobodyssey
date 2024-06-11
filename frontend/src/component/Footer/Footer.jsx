import React from 'react';

const Footer = () => {
    return (
        <footer className=' bg-background'>
            <div className='flex flex-col md:flex-row md:justify-between md:py-20  px-5 md:px-10'>
                <div className='flex flex-col items-center justify-center pb-5 px-5 after:block after:h-[0.1rem] after:contents:"" after:w-64 after:bg-gray-500 after:opacity-50 md:after:w-0 md:justify-start'>
                    <img className='w-32 lg:w-52 py-5' src="/logowhite.png" alt="" />
                </div>
                <div className='flex flex-col items-center justify-center gap-4 after:block after:h-[0.1rem] after:contents:"" after:w-64 after:bg-gray-500 after:opacity-50 md:items-start md:after:w-0 md:justify-start'>
                    <h2 className='text-white font-semibold text-center md:text-start md:text-lg '>Termes et conditions</h2>
                    <ul className='flex flex-wrap items-center justify-center gap-5 text-white md:flex-col md:items-start'>
                        <li className='cursor-pointer'>
                            <h3>Mentions légales</h3>
                        </li>
                        <li className='cursor-pointer'>
                            <h3>Politique de cookies</h3>
                        </li>
                        <li>
                            <h3 className='cursor-pointer'>CGU</h3>
                        </li>
                        <li className='cursor-pointer'>
                            <h3>Politique de confidentialité</h3>
                        </li>
                        <li className='cursor-pointer'>
                            <h3>Gestion des cookies</h3>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 after:block after:h-[0.1rem] after:contents:"" after:w-64 after:bg-gray-500 after:opacity-50 mt-4 md:mt-0 md:after:w-0 md:items-start md:justify-start'>
                    <h2 className='text-white font-semibold text-center md:text-start md:text-lg'>Emploi</h2>
                    <ul className='flex flex-wrap items-center justify-center gap-5 text-white md:flex-col md:items-start'>
                        <li className=' cursor-pointer'>
                            <h3>Offre d'emploie</h3>
                        </li>
                        <li className=' cursor-pointer'>
                            <h3>Ma liste</h3>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 after:block after:h-[0.1rem] after:contents:"" after:w-64 after:bg-gray-500 after:opacity-50 mt-4 md:mt-0 md:after:w-0 md:justify-start'>
                    <h2 className='text-white font-semibold text-center md:text-start md:text-lg'>Entreprise</h2>
                    <ul className='flex flex-wrap items-center justify-center gap-5 text-white md:flex-col md:items-start'>
                        <li className=' cursor-pointer'>
                            <h3>Entreprises</h3>
                        </li>
                        <li className=' cursor-pointer'>
                            <h3>Ma liste</h3>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 after:block after:h-[0.1rem] after:contents:"" after:w-64 after:bg-gray-500 after:opacity-50 mt-4 md:mt-0 md:after:w-0 md:justify-start'>
                        <h2 className='text-white font-semibold text-center md:text-start md:text-lg uppercase mr-10'>Suivez nous sur les réseaux </h2>
                        <ul className='flex gap-6 flex-wrap  pb-5'>
                            <li>
                                <img className='w-10 h-10 cursor-pointer' src="/facebook.png" alt="facebook" />
                            </li>
                            <li>
                                <img className='w-10 h-10 cursor-pointer' src="/instagram.png" alt="instagram" />
                            </li>
                            <li>
                                <img className='w-10 h-10 cursor-pointer' src="/x.png" alt="X" />
                            </li>
                            <li>
                                <img className='w-10 h-10 cursor-pointer' src="/linkedin.png" alt="linkedin" />
                            </li>
                        </ul>
                    </div>
            </div>
        </footer>
    );
};

export default Footer;