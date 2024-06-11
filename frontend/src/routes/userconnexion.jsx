import InscriptionUser from "../component/Form/InscritpionUser";
import { getDiplome } from "../libs/get";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
export async function loader() {
  let diplomes = await getDiplome();
    return diplomes;
  }



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













export default function IncriptionUserRoute(){
const data = useLoaderData();
return(
    <>
    <Helmet>
        <title>Inscritpion utilisateur</title>
        <meta name="description" content="Inscrivez vous pour trouver votre prochain travail" />
    </Helmet>
    <InscriptionUser {...data} diplomes={diplomes}/>
    </>
)

}