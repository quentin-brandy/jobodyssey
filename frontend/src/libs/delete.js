export async function DelOffer(offreid) {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
      window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  } 
    try {
      const response = await fetch(`http://localhost:3000/api/deloffreusers/?offreid=${offreid.offreid}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      console.error("Error applying for offer", error.message);
      throw error;
    }
  }
  
  
  export async function DeleteExperience(userData) {

    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
      window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  } 
  try {
  const response = await fetch(`http://localhost:3000/api/deleteexperience?experience=${userData}`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
      Accept: 'application/json',},
    method: "DELETE",
  });
  const data = await response.json();
  
  return data;
  
  
  } catch (error) {
  console.error("Error changing email", error.message);
  throw error;
  }
  } 

  export async function deleteCompany(){
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
      window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  } 
      const response = await fetch("http://localhost:3000/api/deletecompany", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });
  
      const data = await response.json();
  
      return data;
  
      }

      export const DeleteOffer = async (userData) => {
        const token = localStorage.getItem("token");
        const tokenExpiration = localStorage.getItem("tokenExpiration");
        if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
          window.location.href = "/connexion";
        throw new Error("Token non trouvé");
      } 
    try {
      const response = await fetch("http://localhost:3000/api/deleteoffer", {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
          Accept: 'application/json',},
        method: "DELETE",
      body: JSON.stringify(userData),
      });
      const data = await response.json();

     return data;
  

    } catch (error) {
      console.error("Error changing email", error.message);
      throw error;
    }
          }

          export async function deleteUser(){
            const token = localStorage.getItem("token");
            const tokenExpiration = localStorage.getItem("tokenExpiration");
            if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
              window.location.href = "/connexion";
            throw new Error("Token non trouvé");
          } 
             const response = await fetch("http://localhost:3000/api/deleteuser", {
               headers: {
                 authorization: `Bearer ${token}`,
               },
               method: "DELETE",
             });
        
             const data = await response.json();
        
             return data;
        
             }