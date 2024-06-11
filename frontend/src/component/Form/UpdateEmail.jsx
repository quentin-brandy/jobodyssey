import { useState } from "react";
import { changeCompanyEmail, changeUserEmail} from "../../libs/post";
export default function UpdateEmail({email , role}) {
  const [isEmailInputClicked, setIsEmailInputClicked] = useState(false);
  const [isPasswordInputClicked, setIsPasswordInputClicked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleEmailInputClick = () => {
    setIsEmailInputClicked(true);
  };

  const handlePasswordInputClick = () => {
    setIsPasswordInputClicked(true);
  };
 

  const handleInputBlur = () => {
    setIsEmailInputClicked(false);
    setIsPasswordInputClicked(false);
    if (formData.email && !validateEmail(formData.email)) {
      setIsEmailValid(false);
    } else if (formData.email === "") {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };


  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if(role === "Role_User"){
      let response = await changeUserEmail(formData);
      window.location.reload();
         if (response.message === "mise à jour réussi") {
             setValidMessage("mise à jour réussi");
             setTimeout(() => {
                 setValidMessage(null);
             }, 3000);
           }
           else{
             setErrorMessage(response.message)
             setTimeout(() => {
                 setErrorMessage(null)
             }, 3000);
           }  
  }
  else if(role === "Role_Company"){
      let response = await changeCompanyEmail(formData);
      window.location.reload();
         if (response.message === "mise à jour réussi") {
             setValidMessage("mise à jour réussi");
             setTimeout(() => {
                 setValidMessage(null);
             }, 3000);
           }
           else{
             setErrorMessage(response.message)
             setTimeout(() => {
                 setErrorMessage(null)
             }, 3000);
           }  
  }
};
  return (
    <>
    {email === "visible" && (
        <div className="w-full flex flex-col items-center border-b-[1px] pb-5  justify-center">
             {errorMessage && (
        <div className=" flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
          {errorMessage}
        </div>
      )}
      <section className="flex w-full items-center justify-center bg-textwhite px-20 pt-10">
          <form className="flex flex-col lg:flex-row lg:justify-between lg:items-start w-full gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full items-start">
              <label htmlFor="email" className="w-full text-background">
                <span className="pl-2">Nouvel Email</span>
                <input
                  onBlur={handleInputBlur}
                  onClick={handleEmailInputClick}
                  className={`w-full border-[1px] p-3 rounded-lg focus:border-border focus:outline-none ${
                    isEmailInputClicked && !isEmailValid ? "border-border" : "border-black"
                  }`}
                  type="text"
                  required="required"
                  aria-required="true"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              {!isEmailValid && <div className="text-red-500">L'email est invalide</div>}
            </div>
           
            <div className="flex flex-col w-full items-start">
            <label htmlFor="password" className="w-full text-background">
                <span className="pl-2"> Password</span>
                <input
                  onBlur={handleInputBlur}
                  onClick={handlePasswordInputClick}
                  className={`w-full border-[1px] p-3 rounded-lg focus:border-border focus:outline-none ${
                    isPasswordInputClicked  ? "border-border" : "border-black"
                  }`}
                  type="password"
                  required="required"
                  aria-required="true"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              </div>
            <button
              type="submit"
              aria-disabled="true"
              disabled={
                !isEmailValid 
                
              }
              className={`text-lg text-white font-semibold rounded-full bg-button mt-4 px-5 md:px-16 py-4 ${
                !isEmailValid 
                  ? "bg-gray-500"
                  : ""
              } `}
            >
              {" "}
             Envoyer{" "}
            </button>
          </form>
      </section>
      </div>
        )}
    </>
  );
}
