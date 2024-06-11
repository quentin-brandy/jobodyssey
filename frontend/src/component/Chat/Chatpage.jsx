import Chat from "./Chat";

export default function Chatpage(data) {

  return (
<>
     <h1 className="font-bold m-10 sm:text-xl md:text-2xl">Vous chattez avec l'entrperise : {data.entreprise.name}</h1>
     <Chat {...data}/>
</>
  );
}