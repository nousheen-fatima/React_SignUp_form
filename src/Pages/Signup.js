import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultErrors } from "../Constants";
import { useSignupForm } from "../context/FormContext";
import useDebounce from "../hooks/useDebounce";
import validateForm from "../validation";

function SignupForm() {
  const navigator = useNavigate();
  const { toggleTheme } = useSignupForm();
  const INITIAL_STATE = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [countries, setCountries] = useState([]);
  const [errorMesssages, setErrorMessages] = useState(defaultErrors);
  const { countryName } = useDebounce(formData.country);

  async function getCountriesData(countryName) {
    if (countryName) {
      const url = `https://restcountries.com/v3.1/name/${countryName}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      }
    }
  }
  useEffect(() => {
    getCountriesData(countryName);
  }, [countryName]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessages(defaultErrors);
    const errors = validateForm(
      formData.userName,
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.country
    );
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
    } else {
      setFormData(INITIAL_STATE);
      navigator("/success");
    }
  }

  return (
    <>
      <h1>Sign up form</h1>
      <div className="form">
        <div className="form_left">
          <form onSubmit={handleSubmit}>
            <div className="input_container">
              <label className="label">Username:</label>
              <input
                name="userName"
                className="input"
                type="text"
                value={formData.userName}
                placeholder="Enter username"
                onChange={handleInputChange}
              />
              {errorMesssages.userName && (
                <p className="error_message">{errorMesssages.userName}</p>
              )}
            </div>
            <div className="input_container">
              <label className="label">Email:</label>
              <input
                name="email"
                className="input"
                type="text"
                value={formData.email}
                placeholder="Enter Email"
                onChange={handleInputChange}
              />
              {errorMesssages.email && (
                <p className="error_message">{errorMesssages.email}</p>
              )}
            </div>
            <div className="input_container">
              <label className="label">Select a Country:</label>
              <input
                name="country"
                type="text"
                className="input"
                value={formData.country}
                placeholder="Search for a country..."
                onChange={handleInputChange}
              />
              <select>
                {countries.map((c, index) => (
                  <option key={index}>{c.name.common}</option>
                ))}
              </select>

              {errorMesssages.country && (
                <p className="error_message">{errorMesssages.country}</p>
              )}
            </div>
            <div className="input_container">
              <label className="label">Password:</label>
              <input
                name="password"
                className="input"
                type="password"
                value={formData.password}
                placeholder="Enter Password"
                onChange={handleInputChange}
              />
              {errorMesssages.password && (
                <p className="error_message">{errorMesssages.password}</p>
              )}
            </div>
            <div className="input_container">
              <label className="label">Confirm Password:</label>
              <input
                name="confirmPassword"
                className="input"
                type="password"
                value={formData.confirmPassword}
                placeholder="Enter Confirm Password"
                onChange={handleInputChange}
              />
              {errorMesssages.confirmPassword && (
                <p className="error_message">
                  {errorMesssages.confirmPassword}
                </p>
              )}
            </div>
            <button className="form_button" type="submit">
              Register
            </button>
          </form>
          <button className="toggleButton" onClick={toggleTheme}>
            Switch mode
          </button>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
