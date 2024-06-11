import { useState } from "react";
import { ChangeUserInfo } from "../../libs/post";
export default function UpdateInfoUser({nom , prenom , cv , presentation , isclick }) {
    const [isHidden, setIsHidden] = useState(true);
    const [isCVfile, setisCVfile] = useState(null);
    const [ErrorCV, setErrorCV] = useState(null);
    const [formData, setFormData] = useState({
    nom: nom,
    prenom: prenom,
    presentation: presentation
})

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};
const handleChangeCV = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {

      setisCVfile(file);
    } else {
setErrorCV("Le fichier est trop volumineux");
setTimeout(() => {
    setErrorCV(null)
}, 3000);
    }
};


const handleSubmit = async (e) => {
    e.preventDefault();
    let formDatas = new FormData();
    if(isCVfile != null){
    formDatas.append("cv", isCVfile , isCVfile.name);
    }
    formDatas.append("nom", formData.nom);
    formDatas.append("prenom", formData.prenom);
    formDatas.append("presentation", formData.presentation);
    let response = await ChangeUserInfo(formDatas);
    if (response.message === "mise à jour réussis") {
        window.location.reload();
    }
    else{
    }
}
    return (
        <>
        <form className= {` w-full flex flex-col gap-10 ${isclick ? "" : "hidden"}`} onSubmit={handleSubmit}>
        <ul className={` flex flex-col px-5 sm:px-10 gap-10 sm:items-end w-fit ${isclick ? "" : "hidden"}`}>
            <li className="flex flex-col sm:flex-row w-fit  sm:items-center sm:justify-between sm:w-full md:text-xl sm:text-lg gap-6">
                <label htmlFor="nom">Nom</label>
                <input className="border-2 border-black rounded-md p-1"
                    name="nom"
                    id="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    type="text"
                    required="modifer votre nom"
                />
            </li>
            <li className="flex flex-col sm:flex-row w-fit  sm:items-center sm:justify-between sm:w-full md:text-xl sm:text-lg gap-6">
                <label htmlFor="prenom">Prénom</label>
                <input className="border-2 border-black rounded-md p-1"
                    name="prenom"
                    id="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    type="text"
                    required="modifer votre prénom"
                />
            </li>
        </ul>
        <div className="flex items-center md:text-xl sm:text-lg gap-6 px-5 sm:px-10 w-full">
        <label htmlFor="cv">CV</label>
        <input className="appearance-none "
            name="cv"
            id="cv"
            onChange={handleChangeCV}
            type="file"
            accept=".pdf"
        />
         {ErrorCV && <p className="text-red-500">{ErrorCV}</p>}
    </div>
    <div className="flex flex-col items-start md:text-xl sm:text-lg gap-6 justify-between w-full px-5 sm:px-10">
        <label className="" htmlFor="presentation">Texte de présentation</label>
        <textarea className="border-2 border-black rounded-md p-4 w-full" name="presentation" id="presentation" value={formData.presentation} rows="10" onChange={handleChange}></textarea>
    </div>
    <div className="flex w-full items-center justify-center">
    <button className={`text-lg w-fit text-white font-semibold  rounded-full bg-button px-5 md:px-10 py-4`}>
              modifer mes informations
            </button>
            </div>
    </form>
    </>
    );
}