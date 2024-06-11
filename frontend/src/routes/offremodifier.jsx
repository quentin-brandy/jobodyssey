import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import PageOffreModification from "../component/Offre/PageOffreModification";
import { getOfferAdmin } from "../libs/get";
import { loadsecteur } from "../libs/loaders";
import { Helmet } from "react-helmet";
export async function loader({ params}){
  let  offreid  = params.offreid;
   
    let offre = await getOfferAdmin(offreid);
   let secteur = await loadsecteur();
    return {offre , secteur};
   
  
  }
  
  
  
  export default function OffreModificationRoute(){
const datas = useLoaderData();
let data = datas.offre;
let secteur = datas.secteur;

return (
    <>
   <Helmet>
        <title>Modification d'offre</title>
        <meta name="description" content={`Modification de l'offre ${data.offres.name}`} />
    </Helmet>
    <PageOffreModification data={data} secteur={secteur}  />
    </>
);
  }