import CardCandidature from "../Card/CardCandidature";
export default function PageOffreCandidature(data){

return (
        <>
                <div className="flex flex-col m-5 sm:m-10 gap-10">
                        <h1 className="text-xl font-bold sm:text-3xl">Candidature pour l'offre : {data.offre.offres.name}</h1>
                        <ul className="flex flex-col gap-4 sm:gap-10 sm:flex-row sm:flex-wrap items-center justify-center">
                                {data.candidatures.map((candidat) => (
                                        <CardCandidature {...candidat}/>
                                ))}
                        </ul>
                </div>
        </>
);
}