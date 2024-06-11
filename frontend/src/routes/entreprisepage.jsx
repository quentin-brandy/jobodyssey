import { useLoaderData } from "react-router-dom";
import { getCompanyOffers, GetEntreprise } from "../libs/get";
import EntreprisePageComponent from "../component/Entreprise/EntreprisePage";
import { useEffect , useRef } from "react";
import { Helmet } from "react-helmet";
export async function loader({params}){
    let id = params.entrepriseid;
    let entreprise = await GetEntreprise(id);
    let offres = await getCompanyOffers(id);
    return ({entreprise , offres});
}

export default function EntreprisePage() {
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
        <title>Page entreprise</title>
        <meta name="description" content={`Page de l'entreprise ${data.entreprise.Entreprise.name}`} />
    </Helmet>
      <div ref={topRef}>
       <EntreprisePageComponent entreprise={data.entreprise} offre={data.offres}/>
      </div>
      </>
    )
  }