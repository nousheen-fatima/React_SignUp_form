import { createContext, useContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  function toggleTheme() {
    setTheme(theme ? "" : "dark");
  }
  return (
    <FormContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </FormContext.Provider>
  );
};

function useSignupForm() {
  const context = useContext(FormContext);
  if (context === undefined) throw new Error("Context used before provider");
  return context;
}
export { FormProvider, useSignupForm };
