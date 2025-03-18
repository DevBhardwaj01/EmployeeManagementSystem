import React, { useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = ({HandleLogin}) => {
  const passwordref = useRef();
  const Emailref = useRef();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [change, setchange] = useState(true);
  const seePassword = () => {
    passwordref.current.type = "text";
  };

  const hidePassword = () => {
    passwordref.current.type = "password";
  };
  const submitBtn = () => {
    HandleLogin(Email,Password)
  }
  
  return (
    <div>
      <div className="Container">
        <div className="LoginContainer">
          <h1>USER LOGIN</h1>
          <div className="LoginSection">
            <div className="form__group field">
              <input
                type="email"
                className="form__field"
                placeholder="Name"
                required=""
                ref={Emailref}
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="" className="form__label">
                Email
              </label>
            </div>
            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="Name"
                required=""
                ref={passwordref}
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="" className="form__label">
                Password
              </label>
              {change ? (
                <FaEyeSlash
                  className="passEye"
                  onClick={() => {
                    setchange(!change);
                    seePassword();
                  }}
                />
              ) : (
                <FaEye
                  className="passEye"
                  onClick={() => {
                    setchange(!change);
                    hidePassword();
                  }}
                />
              )}
            </div>
            <div className="buttonSection">
            <button className="btn" onClick={submitBtn}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
