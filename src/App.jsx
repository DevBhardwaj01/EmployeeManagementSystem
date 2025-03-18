import React, { useState, useEffect } from "react";
import "./App.css";
import HRLogin from "./Components/HRLogin";
import EmployeeLogin from "./Components/EmployeeLogin";
import Login from "./Components/Login";

const App = () => {
  const [User, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const HandleLogin = (Email, Password) => {
    if (Email === "admin" && Password === "admin") {
      setUser("admin");
      localStorage.setItem("User", "admin");
    } else if (Email === "dev" && Password === "dev") {
      setUser("dev");
      localStorage.setItem("User", "dev");
    } else if (Email === "shubhash" && Password === "shubhash") {
      setUser("shubhash");
      localStorage.setItem("User", "shubhash");
    }
  };

  const Logout = (msg) => {
    if (msg === "LogoutUser") {
      setUser("Logout");
      localStorage.removeItem("User");
    }
  };

  return (
    <div>
      {!User && <Login HandleLogin={HandleLogin} />}
      {User == "Logout" && <Login HandleLogin={HandleLogin} />}
      {User == "admin" && <HRLogin Logout={Logout} />}
      {User == "shubhash" && (
        <EmployeeLogin User={User} id={0} Logout={Logout} />
      )}
      {User == "dev" && (
        <EmployeeLogin User={User} id={1} Logout={Logout} />
      )}
    </div>
  );
};

export default App;
