import PageOffreCandidature from "../component/Offre/PageOffreCandidature";
import { getOfferAdmin , getCandidatures } from "../libs/get";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
export  async function loader({ params }){
    let  offreid  = params.offreid;
    console.log(offreid);
    let offre = await getOfferAdmin(offreid);
    let candidatures = await getCandidatures(offreid);
    return {offre , candidatures};
  }
  
  
  
  export default function OffreCandidature(){
const data = useLoaderData();


return (
  <>
  <Helmet>
        <title>Candidature</title>
        <meta name="description" content={`Candidature de l'offre ${data.offre.offres.name}`} />
        <meta name="robots" content="noindex"></meta>
    </Helmet>
  <PageOffreCandidature offre={data.offre} candidatures={data.candidatures}/>
</>
);
  }