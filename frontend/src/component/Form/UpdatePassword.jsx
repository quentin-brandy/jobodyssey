import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { changeCompanyPassword, changeUserPassword } from "../../libs/post";

export default function UpdatePassword({password , role}) {
  const navigate = useNavigate();
  const [isOldPasswordInputClicked, setIsOldPasswordInputClicked] = useState(false);
  const [isPasswordInputClicked, setIsPasswordInputClicked] = useState(false);
  const [isConfirmPasswordInputClicked, setIsConfirmPasswordInputClicked] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    oldpassword: "",
    password: "",
  });

  const handleOldPasswordInputClick = () => {
    setIsOldPasswordInputClicked(true);
  };
  const handlePasswordInputClick = () => {
    setIsPasswordInputClicked(true);
  };
  const handleConfirmPasswordInputClick = () => {
    setIsConfirmPasswordInputClicked(true);
  };

  const handleInputBlur = () => {
    setIsPasswordInputClicked(false);
    setIsConfirmPasswordInputClicked(false);

    if (formData.password && !validatePassword(formData.password)) {
      setIsPasswordValid(false);
    } else if (formData.password === "") {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

 
  const validatePassword = (password) => {
    const re = /^.{6,}$/;
    return re.test(password);
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleSubmitPassword = async (e) => {
    if(role === "Role_User"){
      let response = await changeUserPassword(formData);
      
         if (response.message === "mise à jour réussi") {
             setValidMessage("mise à jour réussi");
            //  window.location.reload();
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
      let response = await changeCompanyPassword(formData);
      
         if (response.message === "mise à jour réussi") {
          // window.location.reload();
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
    {password === "visible" && (
        <div className="w-full flex flex-col items-center border-b-[1px] pb-5  justify-center">
      {errorMessage && (
        <div className=" flex justify-center bg-textwhite py-4 text-xl font-semibold text-red-500">
          {errorMessage}
        </div>
      )}
      <section className="flex w-full items-center justify-center lg:justify-between lg:items-center bg-textwhite px-10  pt-10">
       
          <form className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start w-full gap-8" onSubmit={handleSubmitPassword}>
          <div className="flex flex-col w-full items-start">
            <label htmlFor="oldpassword" className="w-full text-background">
                <span className="pl-2"> OldPassword</span>
                <input
                  onBlur={handleInputBlur}
                  onClick={handleOldPasswordInputClick}
                  className={`w-full border-[1px] p-3 rounded-lg  focus:outline-none border-black`}
                  type="password"
                  required="required"
                  aria-required="true"
                  name="oldpassword"
                  id="oldpassword"
                  value={formData.oldpassword}
                  onChange={handleChange}
                />
              </label>
              </div>

            <div className="flex flex-col w-full items-start">
            <label
                htmlFor="password"
                className="w-full text-background"
              >
                Password
              <input
                onBlur={handleInputBlur}
                onClick={handlePasswordInputClick}
                className={`w-full border-[1px] p-3 rounded-lg  focus:outline-none border-black`}
                type="password"
                required="required"
                aria-required="true"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              </label>
              {!isPasswordValid && (
              <div className="text-red-500">
                Password must contain at least 6 characters
              </div>
            )}
            </div>
           
            <div className="flex flex-col w-full items-start">
            <label
                htmlFor="password"
                className="w-full text-background"
              >
                Confirm Password
              <input
                onBlur={handleInputBlur}
                onClick={handleConfirmPasswordInputClick}
                className={`w-full border-[1px] p-3 rounded-lg  focus:outline-none border-black`}
                type="password"
                required="required"
                aria-required="true"
                name="password"
                value={confirmPasswordValue}
                onChange={handleConfirmPasswordChange}
              />
             
              </label>
              {formData.password !== confirmPasswordValue && (
              <div className="text-red-500">Password must be the same</div>
            )}
            </div>
           
            <button
              type="submit"
              aria-disabled="true"
              disabled={
                formData.oldpassword === "" || 
                !isPasswordValid ||
                formData.password !== confirmPasswordValue
              }
              className={`text-lg text-white font-semibold rounded-full bg-button px-5 md:px-16 py-4 lg:mt-4 ${
                formData.oldpassword === "" || 
                !isPasswordValid ||
                formData.password !== confirmPasswordValue
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
