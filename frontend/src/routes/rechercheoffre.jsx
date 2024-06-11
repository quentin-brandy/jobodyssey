import { useLoaderData , useLocation} from "react-router-dom";
import FilterOffre from "../component/Filter/FilterOffre";
import SearchBarOffer from "../component/SearchBar/SearchBarOffer";
import CardEmploieSearch from "../component/Card/CardEmploieSearch";
import { getResearchOffer , getFilterdSearch } from "../libs/get";
import { useState , useEffect } from "react";
import { loadsecteur } from "../libs/loaders";
import { Helmet } from "react-helmet";
export async function loader(){
let data = await getResearchOffer();
let secteur = await loadsecteur();


return {data , secteur};

}

export default function RechercheOffre() {
    const [inputOffre, setInputOffre] = useState([]);
    const [filtredInputOffre, setFiltredInputOffre] = useState([]);
    const [value, setValue] = useState([0, 100000]);
    const datas = useLoaderData();
    let data = datas.data;
    let domaine = datas.secteur;
   let offres = data.offres;

   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const search = queryParams.get('search');


    useEffect(() => {
        if(search){
            handleChangesearch({target: {name: "search" , value: search}});
        }
        
        setInputOffre(Object.values(offres));
      }, [data]);

   const handleChangesearch = async (e) => {
  const lowerCase = e.target.value.toLowerCase();
  setFiltredInputOffre(({ ...filtredInputOffre,  [e.target.name]: lowerCase }));
    let searchoffer = await handleUpdate(({ ...filtredInputOffre,  [e.target.name]: lowerCase }))

    setInputOffre(searchoffer);
}


const handleChangedomaine = async (e) => {
    setFiltredInputOffre(({ ...filtredInputOffre,  domaine: e.target.value }));
      let searchoffer = await handleUpdate(({ ...filtredInputOffre,  domaine: e.target.value }));
      setInputOffre(searchoffer);
  }



const handleChangeRem= async (event ,  newValue) => {
    setValue(newValue);
  setFiltredInputOffre(({ ...filtredInputOffre,  salaire: newValue }));
    let searchoffer = await handleUpdate(({ ...filtredInputOffre,  salaire: newValue }))
  
    setInputOffre(searchoffer);
};

    const handleChangeContrat = async (e) => {
        if(e.target.checked === false){
            
        const newContratSet = new Set(filtredInputOffre.contrat);

        newContratSet.delete(e.target.value);
    
        const newContratArray = Array.from(newContratSet);
        setFiltredInputOffre(prevState => ({ ...prevState, "contrat": newContratArray }));
      
        let searchoffer = await handleUpdate({ ...filtredInputOffre, "contrat": newContratArray });
      
        setInputOffre(searchoffer);
        }
        if(e.target.checked === true){
       
        const newContratSet = new Set(filtredInputOffre.contrat);
        
        newContratSet.add(e.target.value);
      
        const newContratArray = Array.from(newContratSet);
        setFiltredInputOffre(prevState => ({ ...prevState, "contrat": newContratArray }));
        let searchoffer = await handleUpdate({ ...filtredInputOffre, "contrat": newContratArray });
      
        setInputOffre(searchoffer);
        }
      };

      const handleChangeTélétravail = async (e) => {
        if(e.target.checked === false){
            
        const newTélétravailSet = new Set(filtredInputOffre.télétravail);

        newTélétravailSet.delete(e.target.value);
    
        const newTélétravailArray = Array.from(newTélétravailSet);
        setFiltredInputOffre(prevState => ({ ...prevState, "télétravail": newTélétravailArray }));
      
        let searchoffer = await handleUpdate({ ...filtredInputOffre, "télétravail": newTélétravailArray });
      
        setInputOffre(searchoffer);
        }
        if(e.target.checked === true){
       
        const newTélétravailSet = new Set(filtredInputOffre.télétravail);
        
        newTélétravailSet.add(e.target.value);
      
        const newTélétravailArray = Array.from(newTélétravailSet);
        setFiltredInputOffre(prevState => ({ ...prevState, "télétravail": newTélétravailArray }));
      
        let searchoffer = await handleUpdate({ ...filtredInputOffre, "télétravail": newTélétravailArray });
      
        setInputOffre(searchoffer);
        }
      };

const handleUpdate = async (e) => {

    const filtredOffer = await getFilterdSearch(e);
    let filtredOffers = filtredOffer.offres;
    return filtredOffers;
}


    return (
        <>
        <Helmet>
        <title>Recherche d'offre</title>
        <meta name="description" content="Trouver votre offre grâce a notre filtre d'offre" />
    </Helmet>
        <div className="flex md:mx-5 lg:mx-10 mb-5">
            <FilterOffre  value={value} rémunération={handleChangeRem} contrat={handleChangeContrat} télétravail={handleChangeTélétravail}/>
            <div className="flex flex-col w-full px-10 gap-6 items-start justify-start">
            <SearchBarOffer searchvalue={search} secteur={domaine} onsearch={handleChangesearch} ondomaine={handleChangedomaine}/>
            {inputOffre.map((item) => (
                <CardEmploieSearch key={item.id} {...item} />
            ))}  
            </div>
        </div>
        </>
    )
}