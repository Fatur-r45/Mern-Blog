import React, { useState } from "react";
import { RegisterBg } from "../../assets";
import { Button, Gap, Input, Link } from "../../components";
import "./register.scss";
import { useHistory } from "react-router";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      setLoading(true);
      history.push("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="main-page">
      <div className="left">
        <img src={RegisterBg} className="bg-image" alt="imageBg" />
      </div>
      <div className="right">
        <p className="message">{msg}</p>
        <p className="title">Registrasi</p>
        <Input
          label="full Name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Gap height={16} />
        <Input
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Gap height={16} />
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Gap height={16} />
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
        <Gap height={50} />
        <Button title="Registrasi" onClick={onSubmit} Loading={loading} />
        <Gap height={100} />
        <Link title="kembali ke login" onClick={() => history.push("/login")} />
      </div>
    </div>
  );
};

export default Register;
