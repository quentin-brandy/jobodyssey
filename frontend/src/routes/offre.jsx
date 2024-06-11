import PageOffre from "../component/Offre/PageOffrePrévisualisation";
import { useLoaderData } from "react-router-dom";
import { getOffer , ActiveOffer, GetCatEmploie } from "../libs/get";
import { useEffect , useRef } from "react";
import { Helmet } from "react-helmet";
export async function loader({ params }) {
    let  offreid  = params.offreid;
    let data = await getOffer(offreid);
    let emploie = await GetCatEmploie(data.offres.domaine);
    let token = localStorage.getItem("token");
    if(token){
        let activeoffre = await ActiveOffer(offreid);
        if(activeoffre.message === "trouvé"){
         data.postulé = true;         
        }
        else{
            data.postulé = false;
        }
    }
return {data , emploie};
}   

export default function Offre() {
    const data = useLoaderData();

    const topRef = useRef(null); // Créez la référence
  
    useEffect(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView(); // Faites défiler jusqu'à l'élément référencé
      }
    }, []);
  
    return (
      <>
      <Helmet>
        <title>Offre d'emploie</title>
        <meta name="description" content={`Offre d'emploie de ${data.data.offres.company.name} dans le domaine : ${data.data.offres.domaine}`} />
    </Helmet>
      <div ref={topRef}> {/* Attachez la référence à un élément */}
        <PageOffre data={data.data} emploie={data.emploie}/>
      </div>
      </>
    );
  }