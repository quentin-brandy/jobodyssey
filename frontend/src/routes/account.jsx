import { Getuser } from "../libs/loaders";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";

export  async function loader(){
    let data = await Getuser();
    
  return data;
}
    
  export default function Account(){
    const data = useLoaderData();
    let user = Object.values(data);

    if(user[0].role === "Role_Company"){
        window.location.href = "/profile/company";
    }else if(user[0].role === "Role_User"){
        window.location.href = "/profile/user";
  }
      return (
          <>
          <Helmet>
        <title>Compte </title>
        <meta name="description" content="Page des comptes" />
        <meta name="robots" content="noindex"></meta>
    </Helmet>
          </>
      );
  }