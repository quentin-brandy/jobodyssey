import Chatpage from "../component/Chat/Chatpage";
import { Getuser } from "../libs/loaders";
import { GetUserbyId } from "../libs/get";
import { useLoaderData } from "react-router-dom";
import { GetEntreprisebyOffer , GetChat } from "../libs/get";
export async function loader({params}) {
    let offreid = params.offreid;
    let userid = params.userid;
    let connecteduser = await Getuser();
    if(connecteduser.user.role === "Role_User") {
      let user = connecteduser.user;
      let connected = user.role;
        let entreprise = await GetEntreprisebyOffer(offreid);
        entreprise = entreprise.company;
       
        let chatmessage = await GetChat(offreid , userid , entreprise.id);
        return {user , entreprise , chatmessage , offreid , connected };
    }
else if(connecteduser.user.role === "Role_Company") {
  let entreprise = connecteduser.user;
  let connected = entreprise.role;
   let entrepriseid = entreprise.id;
    let user = await GetUserbyId(userid);
    let chatmessage = await GetChat(offreid , userid , entrepriseid);
    return {user , entreprise , chatmessage , offreid , connected};
    }
}
export default function Routechat() {
const data = useLoaderData();

  return (
    <Chatpage {...data}/>
  );
}