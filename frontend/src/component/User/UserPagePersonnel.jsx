import UpdateEmail from "../Form/UpdateEmail";
import UpdateLogo from "../Form/UpdateLogo";
import UpdatePassword from "../Form/UpdatePassword";
import { deleteUser } from "../../libs/delete";
import { useState } from "react";
import UpdateLink from "../Form/UpdateLink";
import UpdateInfoUser from "../Form/UpdateInfoUser";

export default function UserAccount(user){
    const [isDelete, setisDelete]= useState(null);
    const [ChangeEmail, setChangeEmail]= useState("hidden");
    const [ChangePassword, setChangePassword]= useState("hidden");
    const[ChangeUserInfo, setChangeUserInfo] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const Logo = () => {
        if(ChangeLogo === "visible"){
          setChangeLogo("hidden");
        }
        else{
          setChangeLogo("visible");
        }
      }


const Email = () => {
  if(ChangeEmail === "visible"){
    setChangeEmail("hidden");
  }
  else{
    setChangeEmail("visible");
  }
}

const Password = () => {
  if(ChangePassword === "visible"){
    setChangePassword("hidden");
  }
  else{
    setChangePassword("visible");
  }
}


const  handleModifyInfo = () => {
  if(ChangeUserInfo === true){
    setChangeUserInfo(false);
  }
  else{
    setChangeUserInfo(true);
  }
}

const handleuser = async () => {
  let response = await deleteUser();
  if (response.message === "suppresion réussit") {
    localStorage.clear();
    window.location.href = "/";
  }
  else{
    setErrorMessage(response.message)
    setTimeout(() => {
        setErrorMessage(null)
    }, 3000);
  }  
}


  const handleDownload = () => {
     // using Java Script method to get PDF file
     fetch(`/uploads/${user.cv}`).then((response) => {
      response.blob().then((blob) => {
       
          // Creating new object of PDF file
          const fileURL =
              window.URL.createObjectURL(blob);
               
          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = `${user.nom}.${user.prenom}.pdf`;
          alink.click();
      });
  });
  };




    return (
      <>
       
        <div className=" flex flex-col border-2 border-black mx-5 pl-4 py-10 md:mx-10 my-10 gap-8 bg-white">
          <div className="flex flex-col items-center sm:flex-row  mx-10 pb-10">
          <img className="h-40 p-4 rounded-3xl" src={`/uploads/${user.photoprofile}`} alt="" />
          <h1 className="font-bold text-xl md:text-4xl uppercase">{user.nom} {user.prenom}</h1>
          </div>
          <h2 className="flex w-full   justify-center font-bold sm:justify-start sm:mx-10 text-lg sm:text-xl md:text-2xl pb-4">information de connexion</h2>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mx-10 gap-5   border-b-2 pb-10">
            <h3 className="text-regular">Email</h3>
            <h3>{user.email}</h3>
            <h3 className="text-sm font-bold text-button md:text-base cursor-pointer" onClick={Email}> Modifier mon email</h3>
          </div>
          <UpdateEmail role={user.role} email={ChangeEmail}/>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mx-10 gap-5   border-b-2 pb-10">
            <h3 className=" text-regular">Mot de passe</h3>
            <h3>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</h3>
            <h3 className="text-sm font-bold text-button md:text-base cursor-pointer" onClick={Password}> Modifier mon mot de passe</h3>
          </div>
          <UpdatePassword role={user.role} password={ChangePassword}/>
          <div className=" w-full flex justify-end pr-10 mb-10 sm:pr-5">
          <button className="flex items-center justify-center py-4 px-6 bg-button w-fit rounded-sm font-regular text-white active:scale-90" onClick={handleuser}>supprimez le compte</button>
          {errorMessage && (
      <div className=" flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
        {errorMessage}
      </div>
      )}
      </div>
        </div>
        <div className="bg-white  border-2 border-black mx-5 sm:mx-10 py-10">
          <div className="flex flex-col w-full items-center pb-10 sm:flex-row sm:justify-between px-5 sm:px-10">
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl pb-4">Mes informations</h2>
      <button onClick={handleModifyInfo} className="flex items-center justify-center py-4 px-6 bg-button w-fit rounded-md font-regular text-white active:scale-90" >{ChangeUserInfo ? "Revenir en arrière" : "Modifier mes informations"}</button>
      </div>
      <UpdateInfoUser isclick={ChangeUserInfo} nom={user.nom} prenom={user.prenom} cv={user.cv} presentation={user.presentation} />
      <ul className={`flex flex-col gap-4 md:gap-8 px-5 sm:px-10 sm:text-lg md:text-xl ${ChangeUserInfo ? "hidden" : ""}`}>
        <li className="flex gap-4">
        <h3 className="text-regular">Nom :</h3>
        <h3>{user.nom}</h3>
        </li>
        <li className="flex gap-4">
        <h3 className="text-regular">Prénom :</h3>
        <h3>{user.prenom}</h3>
        </li>
        <li className="flex flex-col sm:flex-row gap-4">
        <h3 className="text-regular">CV :</h3>
        <a className="cursor-pointer" onClick={handleDownload} >{user.nom}.{user.prenom}.pdf</a>
        </li>
        <li className="flex flex-col sm:flex-row gap-4">
        <h3 className="text-regular">Texte de Présentation :</h3>
        <h3>{user.presentation}</h3>
        </li>
        </ul>
      </div>
      <div className="bg-white mt-10 border-2 border-black mx-5 sm:mx-10 py-10">
        <div className="px-5 sm:px-10">
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl pb-10">Mes réseaux</h2>
      <ul className="flex flex-col gap-10">
             <UpdateLink role={user.role} link={user.X} logo={"x.png"} id={"X"}/>
             <UpdateLink role={user.role} link={user.Instagram} logo={"instagram.png"} id={"Instagram"}/>
             <UpdateLink role={user.role} link={user.Facebook} logo={"facebook.png"} id={"Facebook"}/>
             <UpdateLink role={user.role} link={user.Linkedin} logo={"linkedin.png"} id={"Linkedin"}/>
             <UpdateLink role={user.role} link={user.Github} logo={"github-mark.svg"} id={"Github"}/>
             <UpdateLink role={user.role} link={user.Site} logo={"website.svg"} id={"Site"}/>

          </ul>
      </div>
      </div>
      </>
    );
}