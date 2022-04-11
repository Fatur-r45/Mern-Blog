import React from "react";
import "./header.scss";
import { useHistory } from "react-router";
import axios from "axios";

const Header = () => {
  const history = useHistory();
  const pindah = () => {
    setTimeout(() => {
      history.push("/");
      window.location.reload(false);
    }, 500);
  };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header">
      <p className="logo-app" onClick={pindah}>
        MernBlog
      </p>
      <p className="menu-item" onClick={Logout}>
        Logout
      </p>
    </div>
  );
};

export default Header;
