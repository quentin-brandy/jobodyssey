import { Getuser , GetUserExperiences } from "../libs/loaders";
import UserAccount from "../component/User/UserPagePersonnel";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import UserAccountExp from "../component/User/UserPageExp";
import UserAccountOffre from "../component/User/UserAccountOffre";
import { GetCandidaturesUser} from "../libs/get";
import { Helmet } from "react-helmet";


let diplomes= [
  "Baccalauréat",
  "Licence en Informatique",
  "Master en Finance",
  "Doctorat en Biologie",
  "BTS Assistant Manager",
  "DUT Génie Électrique et Informatique Industrielle",
  "Licence Professionnelle Métiers de l'Informatique",
  "Master en Marketing Digital",
  "Diplôme Universitaire de Technologie en Génie Mécanique et Productique",
  "BTS Communication",
  "Licence en Sciences Politiques",
  "Master en Gestion des Ressources Humaines",
  "Diplôme d'Ingénieur en Génie Civil",
  "CAP Cuisine",
  "Brevet Professionnel Coiffure",
  "BTSA Viticulture-Oenologie",
  "Licence Professionnelle Métiers du Notariat",
  "Master en Biotechnologie",
  "Diplôme National du Brevet",
  "BTS Design Graphique",
  "DUT Techniques de Commercialisation",
  "Licence en Psychologie",
  "Master en Architecture",
  "Doctorat en Physique",
  "BTS Tourisme",
  "Baccalauréat Professionnel Électricité",
  "CAP Menuiserie",
  "BTSA Aménagements Paysagers",
  "BTS Négociation et Digitalisation de la Relation Client",
  "Diplôme d'Études Supérieures Appliquées en Mécanique",
  "Licence en Langues Étrangères Appliquées",
  "Master en Géographie",
  "Doctorat en Chimie",
  "BTS Comptabilité et Gestion",
  "Baccalauréat Scientifique",
  "CAP Pâtisserie",
  "BTSA Gestion et Protection de la Nature",
  "Licence en Économie",
  "Master en Journalisme",
  "Diplôme National Supérieur Professionnel de Musicien",
  "BTS Maintenance Industrielle",
  "BTS Design d'Espace",
  "BTS Banque",
  "Licence Professionnelle Métiers du Multimédia et de l'Internet",
  "Master en Histoire de l'Art",
  "Doctorat en Sciences de l'Éducation",
  "CAP Esthétique Cosmétique Parfumerie",
  "BTS Assistant de Gestion PME-PMI",
  "BTSA Analyse et Conduite de Systèmes d'Exploitation",
  "DUT Gestion des Entreprises et des Administrations",
  "Licence en Sociologie",
  "Master en Droit des Affaires",
  "Doctorat en Biophysique",
  "BTS Métiers de l'Audiovisuel",
  "Baccalauréat Littéraire",
  "CAP Cuisine",
  "BTSA Productions Animales",
  "Licence Professionnelle Métiers du Commerce International",
  "Master en Sciences Politiques",
  "Doctorat en Astronomie",
  "BTS Systèmes Numériques",
  "BTS Transport et Prestations Logistiques",
  "DUT Génie Civil",
  "Licence en Sciences de l'Éducation",
  "Master en Communication",
  "Doctorat en Géologie",
  "BTS Design de Mode",
  "BTS Management des Unités Commerciales",
  "Licence Professionnelle Métiers de l'Immobilier",
  "Master en Philosophie",
  "Doctorat en Biotechnologie",
  "BTS Services Informatiques aux Organisations",
  "Baccalauréat Technologique STI2D",
  "CAP Coiffure",
  "BTSA Développement, Animation des Territoires Ruraux",
  "Licence en Mathématiques",
  "Master en Économie",
  "Doctorat en Sciences Informatiques"
]













export async function loader(){
    let data = await Getuser();
    let experience = await GetUserExperiences();
    let offre = await GetCandidaturesUser(data.user.id);
    return {data , experience ,  offre};

}
export default function AccountUser(){
    const data = useLoaderData();
    let user = Object.values(data.data);
    const [Onnav, setOnnav] = useState("Information personnels");

    const handlenav = (e) => {
           if (e.target.innerText === "Information personnels") {
             setOnnav("Information personnels");
           } else if (e.target.innerText === "Diplomes et expériences") {
             setOnnav("Diplomes et expériences");
           } else if (e.target.innerText === "Emploie postulés" && data.offre.length > 0) {
             setOnnav("Emploie postulés");
           } 
         };
   
       const handlelogout = () => {
           localStorage.removeItem("token");
           window.location.href = "/";
         };
      
return (
    <>
  <Helmet>
        <title>Compte utilisateur</title>
        <meta name="description" content="Page du comtpe de l'utilisateur" />
        <meta name="robots" content="noindex"></meta>
    </Helmet>
     <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mx-10 gap-10 my-10 mx-5 ">
                <ul className="flex flex-wrap gap-5 md:gap-0 border-2 w-fit p-4 md:px-0 font-medium justify-center items-center mx-5 border-black cursor-pointer bg-white" onClick={handlenav}>
                    <li className={`p-4 sm:border-b-0 sm:border-r-2 border-b-2 md:px-5 ${Onnav === "Information personnels" ? "font-bold" : ""}`}>
                        <h2 className="">Information personnels</h2>
                    </li>
                    <li className={`p-4 sm:border-r-2  sm:border-b-0 border-b-2 md:px-5 ${Onnav === "Diplomes et expériences" ? "font-bold" : ""}`}>
                        <h2>Diplomes et expériences</h2>
                    </li>
                    <li className={`p-4 md:px-5 ${Onnav === "Emploie postulés" ? "font-bold" : ""}`}>
                        <h2>Emploie postulés</h2>
                    </li>
                </ul>

                <button className="text-lg font-semibold bg-button px-6 py-4 md:px-10 md:py-4 rounded-md mx-16 text-white" onClick={handlelogout}>
                    Se déconnecter
                </button>
            </div>

            {Onnav === "Information personnels" && <UserAccount {...user[0]} />}
            {Onnav === "Diplomes et expériences" && <UserAccountExp user={user[0]} experience={data.experience} diplomeslist={diplomes} />}
            {Onnav === "Emploie postulés" && <UserAccountOffre user={user[0]} offre={data.offre}/>}
    </>
);

}