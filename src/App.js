import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignupForm from "./Pages/Signup";
import Success from "./Pages/Success";
import { useSignupForm } from "./context/FormContext";

function App() {
  const { theme } = useSignupForm();
  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Routes>
          <Route path="success" element={<Success />} />
          <Route path="login" element={<Login />} />
          <Route path="/" exact element={<SignupForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
