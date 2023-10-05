import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultErrors } from "../Constants";
import { useSignupForm } from "../context/FormContext";
import useDebounce from "../hooks/useDebounce";
import validateForm from "../validation";

function SignupForm() {
  const navigator = useNavigate();
  const { toggleTheme } = useSignupForm();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [errorMesssages, setErrorMessages] = useState(defaultErrors);
  const { countryName } = useDebounce(country);

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

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessages(defaultErrors);
    const errors = validateForm(
      userName,
      email,
      password,
      confirmPassword,
      country
    );
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
    } else {
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCountry("");
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
                className="input"
                type="text"
                value={userName}
                placeholder="Enter username"
                onChange={(e) => setUserName(e.target.value)}
              />
              {errorMesssages.userName && (
                <p className="error_message">{errorMesssages.userName}</p>
              )}
            </div>
            <div className="input_container">
              <label className="label">Email:</label>
              <input
                className="input"
                type="text"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMesssages.email && (
                <p className="error_message">{errorMesssages.email}</p>
              )}
            </div>
            <div className="input_container">
              <label className="label">Select a Country:</label>
              <input
                type="text"
                className="input"
                value={country}
                placeholder="Search for a country..."
                onChange={(e) => setCountry(e.target.value)}
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
                className="input"
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMesssages.password && (
                <p className="error_message">{errorMesssages.password}</p>
              )}
            </div>
            <div className="input_container">
              <label className="label">Confirm Password:</label>
              <input
                className="input"
                type="password"
                value={confirmPassword}
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
