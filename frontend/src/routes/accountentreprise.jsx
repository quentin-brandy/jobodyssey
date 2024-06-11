import EntrepriseAccount from "../component/Entreprise/EntreprisePersonnalAccount";
import EntreprisePageAccount from "../component/Entreprise/EntreprisePageAccount";
import { useState } from "react";
import { Getuser } from "../libs/loaders";
import { getCompanyAdminOffers } from "../libs/get";
import { useLoaderData } from "react-router-dom";
import EntrepriseOffre from "../component/Entreprise/EntrepriseOffre";
import { Helmet } from "react-helmet";

export  async function loader(){
  let data = await Getuser();
  let offre = await getCompanyAdminOffers();
  return {data , offre};
 
}

export default function AccountEntreprise(){
  let data = useLoaderData(); 
  let user = Object.values(data.data);
  let offre = data.offre;
const [Onnav, setOnnav] = useState("Information personnel");

 const handlenav = (e) => {
        if (e.target.innerText === "Information personnel") {
          setOnnav("Information personnel");
        } else if (e.target.innerText === "Page d'entreprise") {
          setOnnav("Page d'entreprise");
        } else if (e.target.innerText === "Offres lancés") {
          setOnnav("Offres lancés");
        } 
      };

    const handlelogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
      };
   
    return (
        <>
        <Helmet>
        <title>Compte entreprise</title>
        <meta name="description" content="Page du comtpe de l'entreprise" />
        <meta name="robots" content="noindex"></meta>
    </Helmet>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mx-10 gap-10 my-10 mx-5 ">
                <ul className="flex flex-wrap gap-5 md:gap-0 border-2 w-fit p-4 md:px-0 font-medium justify-center items-center mx-5 border-black cursor-pointer bg-white" onClick={handlenav}>
                    <li className={`p-4 sm:border-b-0 sm:border-r-2 border-b-2 md:px-5 ${Onnav === "Information personnel" ? "font-bold" : ""}`}>
                        <h2 className="">Information personnel</h2>
                    </li>
                    <li className={`p-4 sm:border-r-2  sm:border-b-0 border-b-2 md:px-5 ${Onnav === "Page d'entreprise" ? "font-bold" : ""}`}>
                        <h2>Page d'entreprise</h2>
                    </li>
                    <li className={`p-4 md:px-5 ${Onnav === "Offres lancés" ? "font-bold" : ""}`}>
                        <h2>Offres lancés</h2>
                    </li>
                </ul>

                <button className="text-lg font-semibold bg-button px-6 py-4 md:px-10 md:py-4 rounded-md mx-16 text-white" onClick={handlelogout}>
                    Se déconnecter
                </button>
            </div>

            {Onnav === "Information personnel" && <EntrepriseAccount {...user[0]} />}
            {Onnav === "Page d'entreprise" && <EntreprisePageAccount {...user[0]}/>}
            i
            {Onnav === "Offres lancés" && 
              <EntrepriseOffre user={user[0]} offre={offre} />} 
        </>
    );
}