import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer, Header } from "../../components";
import CreateBlog from "../CreateBlog";
import DetailBlog from "../DetailBlog";
import Home from "../Home";
import "./mainApp.scss";
import jwt_Decode from "jwt-decode";
import Axios from "axios";
import { useHistory } from "react-router";

const MainApp = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const history = useHistory();

  useEffect(() => {
    refreshToken();
  });
  const refreshToken = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_Decode(response.data.accessToken);
      // console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/login");
      }
    }
  };

  const AxiosJWT = Axios.create();

  AxiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await Axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_Decode(response.data.accessToken);
        // console.log(decoded);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await AxiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  return (
    <div className="main-app-wrapper">
      <Header />
      <div className="content-wrapper">
        <Router>
          <Switch>
            <Route path="/create-blog/:id?">
              <CreateBlog />
            </Route>
            <Route path="/detail-blog/:id">
              <DetailBlog />
            </Route>
            <Route path="/">
              <Home name={name} getUsers={getUsers} />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default MainApp;
