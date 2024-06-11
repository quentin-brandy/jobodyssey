import Footer from "../component/Footer/Footer";
import NavBar from "../component/NavBar/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { checkConnection } from "../libs/loaders";


export async function loader() {
  let data = await checkConnection();
   
return data;
}





  
  
export default function Root() {
  const data = useLoaderData();
  return (
    <>
    
    <ScrollRestoration />
    <NavBar connected={data}/>
    <Outlet/>
    <Footer/>
    </>
  );
}
