export async function ActiveOffer(offreid) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `http://localhost:3000/api/getoffreusers/?offreid=${offreid}`,
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
      `http://localhost:3000/api/getcandidatures/?offreid=${offreid}`,
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
      `http://localhost:3000/api/getusercandidatures/?userid=${userid}`,
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
      `http://localhost:3000/api/getcompanybyoffer?offerid=${offerid}`,
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
      `http://localhost:3000/api/acceptcandidatures?userid=${userid}&offreid=${offreid}`,
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
      `http://localhost:3000/api/refusecandidatures?userid=${userid}&offreid=${offreid}`,
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
      `http://localhost:3000/api/cancelcandidatures?offreid=${offreid}`,
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
    const response = await fetch(`http://localhost:3000/api/getemploie`, {
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
      `http://localhost:3000/api/getcatemploie?domaine=${domaine}`,
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
      `http://localhost:3000/api/getcandidatureuser?userid=${userid}`,
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
    const response = await fetch("http://localhost:3000/api/getcompanies", {
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
      `http://localhost:3000/api/getcompany?entrepriseid=${entrepriseid}`,
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
    const response = await fetch(`http://localhost:3000/api/getpartcompany`, {
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
      "http://localhost:3000/api/getcompanyadminoffers",
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
      `http://localhost:3000/api/getcompanyoffers?entrepriseid=${entrepriseid}`,
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
      `http://localhost:3000/api/getofferadmin?offreid=${offreid}`,
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
      `http://localhost:3000/api/getoffer?offreid=${offreid}`,
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
      `http://localhost:3000/api/getresearchoffers`,
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
      const response = await fetch(`http://localhost:3000/api/getfiltredoffers`, {
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
        `http://localhost:3000/api/getfiltredcompany`,
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
    let diplome = await fetch("/src/libs/JSON/diplomes.json")
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
      `http://localhost:3000/api/getchat?offreid=${offreid}&userid=${userid}&entrepriseid=${entrepriseid}`,
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
        `http://localhost:3000/api/getuserbyid?userid=${userid}`,
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