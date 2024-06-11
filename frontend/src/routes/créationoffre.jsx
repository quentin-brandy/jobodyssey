import { useLoaderData } from "react-router-dom";
import CréationOffre from "../component/Form/InscriptionOffre"
import { loadsecteur } from "../libs/loaders";
import { Helmet } from "react-helmet";
export async function loader() {
    let data = await loadsecteur();

    return (data);
  }



export default function PageCreationOffre() {
    const data = useLoaderData()
return(
  <>
  <Helmet>
        <title>Création d'offre</title>
        <meta name="description" content="Créer vos nouvelles offres" />
        <meta name="robots" content="noindex"></meta>
    </Helmet>
   <CréationOffre {...data}/>
   </>
)

}