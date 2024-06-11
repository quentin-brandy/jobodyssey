import CardEmploieActiveBack from "../Card/CardEmploieBack";
import CardEmploieDisableBack from "../Card/CardEmploieBackDisable";
import { Link } from "react-router-dom";
export default function EntrepriseOffre(user) {
let users = user.user;
let offres = user.offre;

    return (
        <div className="flex flex-col border-2 border-black mx-5 sm:mx-10 py-10 my-10 gap-8 bg-white">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-center mx-5 md:mx-10 bg-white">
                <h1 className="text-2xl font-semibold">Offre lancés</h1>
                <Link to="/offre/ajout">
                    <button className="text-white rounded-xl w-fit py-3 px-4 bg-button active:scale-95">Créer une nouvelle offre</button>
                </Link>
            </div>
            <div className="flex flex-col gap-8 justify-center mx-5 md:mx-10">
                <h2 className="font-semibold text-xl">Offres en cours</h2>
                {offres.offres.map((offre) => (
                    offre.active === 1 && <CardEmploieActiveBack key={offre.id} offre={offre} user={users} />
                ))}
            </div>
            <div className="flex flex-col gap-8 justify-center mx-5 md:mx-10">
                <h2 className="font-semibold text-xl">Offres terminées</h2>
                {offres.offres.map((offre) => (
                    offre.active === 0 && <CardEmploieDisableBack key={offre.id} offre={offre} user={users} />
                ))}
            </div>
        </div>
    );
};
