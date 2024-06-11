import InscriptionEntreprise from '../component/Form/InscriptionEntreprise';
import { loadsecteur } from '../libs/loaders';
import { useLoaderData } from "react-router-dom";
import { Helmet } from 'react-helmet';
export async function loader() {
    let data = await loadsecteur();
    return data;
  }
  
  
export default function InscriptionEntrepriseRoute() {
    const data = useLoaderData();
    
    return (
        <>
        <Helmet>
        <title>Inscritpion entreprise</title>
        <meta name="description" content="Inscrivez vous pour mettre vos futures offres d'emploie sur la plateforme" />
    </Helmet>
        <InscriptionEntreprise {...data} />
        </>
    );
};
