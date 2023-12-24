import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="Text-center">redirecting you in {count} second </h1>
      <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-black border-solid font-bold"></div>
    </div>
  );
};

export default Spinner;
