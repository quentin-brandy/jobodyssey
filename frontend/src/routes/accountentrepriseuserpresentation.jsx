import UserPresentationEntreprise from "../component/User/UserPrésentationEntreprise";
import { Getuser } from "../libs/get";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
export async function loader({params}) {
    let user = params.userid;
    let data = await Getuser(user);

    return {data}
}

export default function AccountEntrepriseUserPresentation(){
    const data = useLoaderData();
    return (
        <>
        <Helmet>
        <title>Compte utilisateur</title>
        <meta name="description" content="Page du comtpe de l'utilisateur en candidature" />
        <meta name="robots" content="noindex"></meta>
    </Helmet>
       <UserPresentationEntreprise {...data}/>
       </>
    )
}