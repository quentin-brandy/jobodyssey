export async function loadsecteur() {
  let answer = await fetch("/src/libs/JSON/secteurs.json");
  let secteur = await answer.json();
  return secteur;
}


export async function checkConnection(){
if (localStorage.getItem("token") !== null) {
        
    return true;
}

else {
   return false;
}
}




export async function Getuser(){
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/connexion";
          throw new Error("Token non trouvé");
        }
        const response = await fetch("http://localhost:3000/api/getuser", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "/connexion";
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }


    export async function GetUserExperiences() {
      const token = localStorage.getItem("token");
      if (!token) {
          window.location.href = "/connexion";
        throw new Error("Token non trouvé");
      }
      try {
        const response = await fetch("http://localhost:3000/api/getuserexperiences", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
            Accept: 'application/json',},
          method: "GET",
        });
        const data = await response.json();
    
       return data;
    
    
      } catch (error) {
        console.error("Error changing email", error.message);
        throw error;
      }
        }