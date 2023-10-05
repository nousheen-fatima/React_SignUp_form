import { useEffect, useState } from "react";

const useDebounce = (value) => {
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const timeoutToken = setTimeout(() => {
      setCountryName(value);
    }, 1000);
    return () => clearTimeout(timeoutToken);
  }, [value]);

  return { countryName };
};
export default useDebounce;
