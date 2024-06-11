import { useState } from "react";
import React from "react";
import { changeUserDiplomes } from "../../libs/post";
export default function UpdateDiplome({open , diplome, handleGetDiplome , diplomeslist}){
  const [diplomesList, setDiplomesList] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const addDiplome = () => {
    const newSelect = (
        <select
            className='border-[1px] px-4 py-2 w-64 focus:outline-none border-black md:w-full'
            name={`diplomes`}
            id={`diplomes-${diplomesList.length + 1}`}
            onChange={handleChangeDiplome}
        >
          <option value="Aucun Diplomes">Aucun diplomes séléctionné</option>
          {diplomeslist.map((diplome) => (
            <option value={diplome}>{diplome}</option>
          ))}
        </select>
    );
    setDiplomesList([...diplomesList, newSelect]);
}

const removeDiplome = () => {
    const removedDiplome = diplomesList[diplomesList.length - 1];
    setDiplomesList(diplomesList.slice(0, -1));
    setSelectedValues(prevValues => {
        const { [removedDiplome.props.id]: removedValue, ...newValues } = prevValues;
        return newValues;
    });
  };

const handleChangeDiplome = (e) => {
    const diplome = e.target.value;
    setSelectedValues({ ...selectedValues, [e.target.id]: diplome });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    let newdiplome = Object.values(selectedValues); 
    const mergedDiplomes = [...diplome, ...newdiplome];
    const filteredDiplomes = mergedDiplomes.filter(diplome => diplome !== 'Aucun Diplomes');
    let diplomes = JSON.stringify(filteredDiplomes);
    const response = await changeUserDiplomes(diplomes); 
if (response.message === "mise à jour réussi") {
    handleGetDiplome(filteredDiplomes);
  }
  else{
    setErrorMessage(response.message)
    setTimeout(() => {
        setErrorMessage(null)
    }, 3000);
  }  
}




    return(
        <>
        <div className={`flex flex-col gap-4 px-5 ${open ? "block" : "hidden"}`}>
        <form className=" flex flex-col  w-full items-center gap-4" onSubmit={handleSubmit}>
           {errorMessage && ( 
                <div className="flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
                    {errorMessage}
                </div>
            )}
            <label htmlFor="diplomes" className='text-lg font-semibold pb-2'> Ajout de diplomes </label>
            <select className='border-[1px] px-4 py-2 w-64 focus:outline-none border-black md:w-full' name="diplomes" id="diplomes" onChange={handleChangeDiplome}>
            <option value="Aucun Diplomes">Aucun diplomes séléctionné</option>
            {diplomeslist.map((diplome) => (
            <option value={diplome}>{diplome}</option>
          ))}
        </select>
            {diplomesList.map((select, index) => (
        <React.Fragment key={index}>
          {select}
        </React.Fragment>
      ))}
      <div className="flex gap-5">
            <p className="text-base w-fit text-white font-semibold rounded-full bg-button px-5 md:px-4 py-4 cursor-pointer" onClick={addDiplome}>Ajouter des diplomes</p>
      {diplomesList.length > 0 && (
        <p className="text-base w-fit text-white font-semibold rounded-full bg-rouge px-5 md:px-4 py-4 cursor-pointer" onClick={removeDiplome}>Supprimer un champ diplome</p>
      )}
      </div>
      <button type="submit" className="text-base w-fit text-white font-semibold rounded-full bg-button px-5 md:px-4 py-4 cursor-pointer">mettre à jour les diplômes</button>
          </form>

        </div>
        </>
         
    )
}