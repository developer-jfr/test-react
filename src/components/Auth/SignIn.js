import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signInUserThunk } from "../../redux/actions/auth-actions";
import { Redirect, Link } from "react-router-dom";
import { Input, Button } from "antd";
import "./Auth.css";
import logo from "./../../assets/images/logo.svg";
const usersSearchFormValidate = (values) => {
  const errors = {};
  return errors;
};

function SignIn() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
const user = useSelector(state => state.auth.user)
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  if (token) {
    return <Redirect to={"/"} />;
  }

  const submit = (values, { setSubmitting }) => {
    dispatch(signInUserThunk(values));

    setSubmitting(false);
    
  };
  return (
    <div className="login">
      <Formik
        enableReinitialize
        initialValues={{ username: "", password: "" }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting, resetForm }) => (
          <div className="login_container">
            <div className="login__image__wrapp">
              <img src={logo} />
            </div>
            <div className="login__text">
              <h1>Вход</h1>
            </div>

            <Form >
              <div className='login__form'>
                <Field type="text" name="username" as={Input} />

                <Field type="password" name="password" as={Input} />
              </div>
              <div className='login__btn'>
              <Button htmlType="submit" disabled={isSubmitting}>
                Войти
              </Button>

              <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                <Link to={"/signup"}>Регистрация</Link>
              </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default SignIn;
