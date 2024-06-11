import { useState } from "react";
import UpdateBanner from "../Form/UpdateBanner";
import UpdateLink from "../Form/UpdateLink";
import UpdatePresentation from "../Form/UpdatePresentation";
export default function EntreprisePageAccount(user){


    return (
        <div className=" flex flex-col border-2 border-black  mx-5 sm:mx-10 py-10 my-10 gap-8 bg-white">
            <h1 className="text-2xl font-semibold py-5 mx-5 md:mx-10">Page d'entreprise</h1>
            <div className="flex flex-col gap-6 mx-5 sm:mx-10 ">
                <h2 className="font-semibold mt-10">Bannière de l'entreprise </h2>
                <UpdateBanner banner={user.banner}/>
            </div>
           
            <div className="flex flex-col gap-6 mx-5 sm:mx-10">
                <h2 className="font-semibold">Réseaux sociaux </h2>
                <ul className="flex flex-col gap-10">
                   <UpdateLink role={user.role} link={user.X} logo={"x.png"} id={"X"}/>
                   <UpdateLink role={user.role} link={user.Instagram} logo={"instagram.png"} id={"Instagram"}/>
                   <UpdateLink role={user.role} link={user.Facebook} logo={"facebook.png"} id={"Facebook"}/>
                   <UpdateLink role={user.role} link={user.Linkedin} logo={"linkedin.png"} id={"Linkedin"}/>
                   <UpdateLink role={user.role} link={user.Github} logo={"github-mark.svg"} id={"Github"}/>
                   <UpdateLink role={user.role} link={user.Site} logo={"website.svg"} id={"Site"}/>

                </ul>
            </div>
           <UpdatePresentation presentation={user.presentation} id={"presentation"}/>
        </div>
    );
};

