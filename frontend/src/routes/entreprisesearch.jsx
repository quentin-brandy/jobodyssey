import SearchBarOffer from "../component/SearchBar/SearchBarOffer";
import CardEmploieSearch from "../component/Card/CardEmploieSearch";
import { loadsecteur } from "../libs/loaders";
import { GetEntreprises , GetFilterdSearchEntreprise } from "../libs/get";
import { useState , useEffect } from "react";
import { useLoaderData , useLocation } from "react-router-dom";
import CardEntrepriseSearch from "../component/Card/CardEntrepriseSearch";
import { Helmet } from "react-helmet";
export async function loader() {
    let entreprises = await GetEntreprises();
    let secteur = await loadsecteur();
    return { entreprises , secteur };
}

export default function EntrepriseSearch(){
    const [inputEntreprise, setInputEntreprise] = useState([]);
    const [filtredInputEntreprise, setFiltredInputEntreprise] = useState([]);
    const datas = useLoaderData();
    let data = datas.entreprises;
    let domaine = datas.secteur;
   let entreprises = data.company;
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const search = queryParams.get('search');


    useEffect(() => {
        if(search){
            handleChangesearch({target: {name: "search" , value: search}});
        }
        
        setInputEntreprise(Object.values(entreprises));
      }, [data]);

   const handleChangesearch = async (e) => {
  const lowerCase = e.target.value.toLowerCase();
  setFiltredInputEntreprise(({ ...filtredInputEntreprise,  [e.target.name]: lowerCase }));
    let searchentreprise = await handleUpdate(({ ...filtredInputEntreprise,  [e.target.name]: lowerCase }))

    setInputEntreprise(searchentreprise);
}


const handleChangeactivity = async (e) => {
    setFiltredInputEntreprise(({ ...filtredInputEntreprise,  activity: e.target.value }));
      let searchentreprise = await handleUpdate(({ ...filtredInputEntreprise,  activity: e.target.value }));
      setInputEntreprise(searchentreprise);
  }


  const handleUpdate = async (e) => {
    console.log(e)
    const filtredOffer = await GetFilterdSearchEntreprise(e);
    console.log(filtredOffer)
    let filtredOffers = filtredOffer.company;
    return filtredOffers;
}



    return(
        <>
        <Helmet>
        <title>Recherche Entreprise</title>
        <meta name="description" content="Recherhcer les offres disponible par entreprise" />
    </Helmet>
<div className="flex flex-col w-full px-5 sm:px-10 gap-6 items-start justify-start">
            <SearchBarOffer searchvalue={search} secteur={domaine} onsearch={handleChangesearch} ondomaine={handleChangeactivity}/>
            <div className="flex flex-wrap">
            {inputEntreprise.map((item) => (
                <CardEntrepriseSearch key={item.id} {...item} />
            ))}  
            </div>
            </div>
            </>
    )
}