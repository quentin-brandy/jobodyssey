export async function ActiveOffer(offreid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getoffreusers/?offreid=${offreid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    if (data.message === "error") {
      window.location.href = "/connexion";
    }
    return data;
  } catch (error) {
    // Handle error
    console.error("Error applying for offer", error.message);
    throw error;
  }
}

export async function getCandidatures(offreid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getcandidatures/?offreid=${offreid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    let data = await response.json();

    for (let candidat of data) {
      candidat.diplomes = JSON.parse(candidat.diplomes);
    
    }

   
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des candidatures",
      error.message
    );
    throw error;
  }
}

export async function GetCandidaturesUser(userid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getusercandidatures/?userid=${userid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error applying for offer", error.message);
    throw error;
  }
}

export async function GetEntreprisebyOffer(offerid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getcompanybyoffer?offerid=${offerid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error applying for offer", error.message);
    throw error;
  }
}





export async function AcceptCandidatures(userid, offreid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/acceptcandidatures?userid=${userid}&offreid=${offreid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error applying for offer", error.message);
    throw error;
  }
}

export async function RefuseCandidatures(userid, offreid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/refusecandidatures?userid=${userid}&offreid=${offreid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error applying for offer", error.message);
    throw error;
  }
}

export async function CancelCandidatures(offreid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/cancelcandidatures?offreid=${offreid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error applying for offer", error.message);
    throw error;
  }
}

export async function GetEmploie() {
  try {
    const response = await fetch(`https://apinode.quentinbrandy.fr/api/getemploie`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error applying for offer", error.message);
    throw error;
  }
}

export async function GetCatEmploie(domaine) {
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getcatemploie?domaine=${domaine}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error applying for offer", error.message);
    throw error;
  }
}
export async function Getuser(userid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getcandidatureuser?userid=${userid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function GetEntreprises() {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (token && new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/getcompanies", {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}

export async function GetEntreprise(entrepriseid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (token && new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getcompany?entrepriseid=${entrepriseid}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}

export async function GetPartEntreprise() {
  try {
    const response = await fetch(`https://apinode.quentinbrandy.fr/api/getpartcompany`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}
export async function getCompanyAdminOffers() {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      "https://apinode.quentinbrandy.fr/api/getcompanyadminoffers",
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}

export async function getCompanyOffers(entrepriseid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (token && new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getcompanyoffers?entrepriseid=${entrepriseid}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}

export async function getOfferAdmin(offreid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getofferadmin?offreid=${offreid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting offer", error.message);
    throw error;
  }
}

export async function getOffer(offreid) {
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getoffer?offreid=${offreid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting offer", error.message);
    throw error;
  }
}

export async function getResearchOffer() {
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getresearchoffers`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting offer", error.message);
    throw error;
  }
}


export async function getFilterdSearch(searchvalue) {
    try {
      const response = await fetch(`https://apinode.quentinbrandy.fr/api/getfiltredoffers`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(searchvalue),
      });
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Error getting offer", error.message);
      throw error;
    }
  }
  
  export async function GetFilterdSearchEntreprise(searchvalue) {
    try {
      const response = await fetch(
        `https://apinode.quentinbrandy.fr/api/getfiltredcompany`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify(searchvalue),
        }
      );
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Error getting offer", error.message);
      throw error;
    }
  }

  export async function getDiplome(){
    let diplome = await fetch("../json/diplomes.json")
    let diplomes = await diplome.json();
    return diplomes;
  }


  export async function GetChat(offreid , userid , entrepriseid) {

    const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/getchat?offreid=${offreid}&userid=${userid}&entrepriseid=${entrepriseid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting offer", error.message);
    throw error;
  }

  }

  export async function GetUserbyId(userid){
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
      window.location.href = "/connexion";
      throw new Error("Token non trouvé");
    }
    try {
      const response = await fetch(
        `https://apinode.quentinbrandy.fr/api/getuserbyid?userid=${userid}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "GET",
        }
      );
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Error getting offer", error.message);
      throw error;
    }
  }