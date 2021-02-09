import React, { useState } from "react";
import Layout from "../../components/layout";
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { signin } from "../../action/auth.action";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();

    if (email === "") {
      alert("Email is required");
    }
    if (password === "") {
      alert("password is required");
    }
    dispatch(signin({ email, password }));
  };
  if (auth.authenticated) {
    return <Redirect to={"/"} />;
  }
  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <form onSubmit={userLogin}>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div>
              <button>Login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
