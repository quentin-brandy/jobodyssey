import { useState } from "react";
export default function SearchBarOffer({onsearch , ondomaine , secteur , searchvalue } ) {

    

        return (
            <>
                <div className="flex flex-col items-center md:items-start w-full sm:ml-10 md:ml-0 gap-5 mb-10 mt-10 md:mt-16 md:p-0">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold md:pl-4">Recherche tes offres :</h1>
                    <div className="w-full relative flex flex-col gap-4">
                        <input
                            className="relative rounded-lg p-4 w-full border-[3px] border-rouge focus:outline-none"
                            type="text"
                            name="search"
                            id="search"
                            placeholder="recherche ton job"
                            onChange={onsearch}
                        />
                        <select
                            className="md:absolute md:max-w-80 right-1 top-1 pr-8 md:pr-4 appearance-none border-2 border-rouge rounded-lg p-3 text-center"
                            name="secteur d'emploie"
                            id="secteur d'emploie"
                            onChange={ondomaine}>
                            <option value="1">secteur d'emploie</option>
                            {secteur.secteurs.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nom}
                                </option>
                            ))}
                        </select>
                        <img className="absolute md:hidden w-5 h-5 top-24 right-2" src="/arrowdown.svg" alt="" />
                    </div>
                </div>
            </>
        );
}