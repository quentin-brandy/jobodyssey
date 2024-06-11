import Banner from "../component/Banner/Banner"
import CardEntreprise from "../component/Card/CardEntreprise"
import SliderEmploie from "../component/Slider/SliderEmploie"
import Stat from "../component/Stat/Stat";
import { GetEmploie , GetPartEntreprise } from "../libs/get";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
export async function  loader() {
  let emploie = await GetEmploie();
  let entreprise = await GetPartEntreprise();
  return { emploie , entreprise };
}

export default function Home() {
  let data = useLoaderData();

  return (
    <>
    <Helmet>
        <title>Job Odyssey</title>
        <meta name="description" content="Job Odyssey parcourons l'univers à la recherche d'un travail." />
    </Helmet>
      <Banner />
      <h2 className="flex items-center justify-center text-xl font-semibold mx-5 text-center mt-20 md:mx-10 lg:text-4xl lg:font-bold">
        Job Odyssey parcourons l'univers à la recherche d'un travail.
      </h2>
      <p className="mx-5 text-center mt-5 md:mx-24 md:text-center">
        Chez job Odyssey vous trouverez plein d'offre venu de partout en France au dela des frontières et planètes. Nous recueillons la plus grande base d'offre d'emploie de l'univers rien que pour vous.
      </p>
      <h3 className="mt-20 pb-10 text-lg md:text-xl font-semibold ml-5 md:ml-10">Les dernières offres d'emploie :</h3>
      <SliderEmploie {...data}/>
      <Stat/>
      <h2 className="font-semibold text-lg ml-5 md:text-xl flex justify-center items-center my-20 lg:text-4xl lg:font-bold">Voici des entreprises qui nous ont fais confiance</h2>
      <div className="flex flex-wrap items-center justify-center">
      {data.entreprise.map((entreprise, index) => (
          <CardEntreprise key={index} entreprise={entreprise} />
        ))}
      </div>
      <div className="grid grid-cols-1 bg-stat rounded-3xl p-10 text-white  md:grid-cols-2 gap-10 mx-5 md:mx-10 my-24">
        <div >
          <iframe className="rounded-xl" width="100%" height="400" src="https://www.youtube.com/embed/5Y2WC6SVG4Q?si=_W9jQmVHUEPecWgH" frameborder="200"></iframe>
        </div>
        <div className="flex flex-col h-[400px] justify-center gap-10">
          <h2 className="font-bold text-lg md:text-2xl text-center">Nos conseils pour réussir un entretien d'embauche :</h2>
          <p className="text-center md:text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus laborum dolore,
            suscipit aperiam neque cumque, numquam omnis ad, odit nihil dicta. Minima est iste ut
            quidem eos iusto pariatur ipsam ?
          </p>
        </div>
      </div>
    </>
  );}
