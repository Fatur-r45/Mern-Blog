import React, { useState } from "react";
import { LoginBg } from "../../assets";
import { Button, Gap, Input, Link } from "../../components";
import { useHistory } from "react-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      setLoading(true);
      history.push("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="main-page">
      <div className="left">
        <img src={LoginBg} className="bg-image" alt="imageBg" />
      </div>
      <div className="right">
        <p className="message">{msg}</p>
        <p className="title">Login</p>
        <Input
          label="Email"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Gap height={16} />
        <Input
          label="Password"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Gap height={50} />
        <Button title="Login" onClick={onSubmit} Loading={loading} />
        <Gap height={100} />
        <Link
          title="Belum punya akun, silahkan daftar"
          onClick={() => history.push("/register")}
        />
      </div>
    </div>
  );
};

export default Login;
