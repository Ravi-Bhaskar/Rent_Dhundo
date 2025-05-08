import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import "../styles/login-register.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
//auth
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    dispatch({ type: "LOGIN_START" });
  
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is required to send cookies
        body: JSON.stringify(credentials),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        toast.error(result.message || "Login failed");
        dispatch({ type: "LOGIN_FAILURE", payload: result.message });
        return; // ❌ Stop further execution
      }

      // Save the token in localStorage
    localStorage.setItem("token", result.token);
  
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      toast.success("Login Success");
      navigate("/");
  
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      toast.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account?<Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
