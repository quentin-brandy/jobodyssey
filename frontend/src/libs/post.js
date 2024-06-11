export const addCompany = async (formData2) => {
  
  let formData = new FormData();
  formData.append("email", formData2.email);
  formData.append("password", formData2.password);
  formData.append("name", formData2.name);
  formData.append("activity", formData2.activity);
  formData.append("presentation", formData2.presentation);
  formData.append("logo", formData2.logo, formData2.logo.name);
  formData.append("banner", formData2.banner, formData2.banner.name);
  formData.append("X", formData2.x || "a définir");
  formData.append("Facebook", formData2.Facebook || "a définir");
  formData.append("Instagram", formData2.Instagram || "a définir");
  formData.append("Github", formData2.Github || "a définir");
  formData.append("Linkedin", formData2.Linkedin || "a définir");
  formData.append("Site", formData2.Site || "a définir");
 
  const response = await fetch("https://apinode.quentinbrandy.fr/api/addcompany", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const login = async (formData) => {
  const response = await fetch("https://apinode.quentinbrandy.fr/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();

  return data;
};

export async function addOffers(formData) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token && new Date().getTime() < parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/addoffer", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}


export const UpdateOffer = async (userData) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/updateoffer", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
};

export const changeCompanyEmail = async (userData) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }

  try {
    const response = await fetch(
      "https://apinode.quentinbrandy.fr/api/updatecompanyemail",
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
};
export const changeCompanyPassword = async (userData) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      "https://apinode.quentinbrandy.fr/api/updatecompanypassword",
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
};

export const changeCompany = async (userData) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/updatecompany", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
};

export const changeCompanyLogo = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
      window.location.href = "/connexion";
      throw new Error("Token non trouvé");
    }
    const response = await fetch(
      "https://apinode.quentinbrandy.fr/api/updatecompanylogo",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: userData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to change logo");
    }

    return response;
  } catch (error) {
    console.error("Error changing logo:", error.message);
    throw error;
  }
};

export const changeCompanyBanner = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
      window.location.href = "/connexion";
      throw new Error("Token non trouvé");
    }
    const response = await fetch(
      "https://apinode.quentinbrandy.fr/api/updatecompanybanner",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: userData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to change logo");
    }

    return response;
  } catch (error) {
    console.error("Error changing logo:", error.message);
    throw error;
  }
};

export async function CreateUser(userdata, diplomes) {
  let formData = new FormData();
  const diplomesArray = Object.values(diplomes);
  formData.append("email", userdata.email);
  formData.append("password", userdata.password);
  formData.append("diplomes", JSON.stringify(diplomesArray));
  formData.append("nom", userdata.nom);
  formData.append("prenom", userdata.prénom);
  formData.append("presentation", userdata.presentation);
  formData.append(
    "photoprofile",
    userdata.photoprofile,
    userdata.photoprofile.name
  );
  formData.append("cv", userdata.cv, userdata.cv.name);
  formData.append("X", userdata.x || "a définir");
  formData.append("Facebook", userdata.Facebook || "a définir");
  formData.append("Instagram", userdata.Instagram || "a définir");
  formData.append("Github", userdata.Github || "a définir");
  formData.append("Linkedin", userdata.Linkedin || "a définir");
  formData.append("Site", userdata.Site || "a définir");

  const response = await fetch("https://apinode.quentinbrandy.fr/api/adduser", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function ChangeUserInfo(userdata) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  const response = await fetch("https://apinode.quentinbrandy.fr/api/updateuserinfo", {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: userdata,
  });
  const data = await response.json();
  return data;
}

export async function changeUser(userData) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/updateuser", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}

export const changeUserEmail = async (userData) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }

  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/updateuseremail", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    localStorage.removeItem("token");
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
};
export const changeUserPassword = async (userData) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      "https://apinode.quentinbrandy.fr/api/updateuserpassword",
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
};

export async function changeUserDiplomes(formData) {
  const userData = {
    diplomes: formData,
  };
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/updateuser", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}

export async function CreateExperience(expdata) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/createexperience", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(expdata),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}

export async function ChangeExperience(expdata) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch("https://apinode.quentinbrandy.fr/api/updateexperience", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(expdata),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error changing email", error.message);
    throw error;
  }
}

export async function postulerOffre(offreId) {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/offrepostuler/?offreid=${offreId.offreid}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "POST",
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

export async function AddChatMessage(ChatData){

  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!token || new Date().getTime() > parseInt(tokenExpiration)) {
    window.location.href = "/connexion";
    throw new Error("Token non trouvé");
  }
  try {
    const response = await fetch(
      `https://apinode.quentinbrandy.fr/api/addchatmessage`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: ChatData,
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