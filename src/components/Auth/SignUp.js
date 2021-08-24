import React from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserThunk } from "../../redux/actions/auth-actions";
import { Input, Button } from "antd";
import "./Auth.css";
import logo from "./../../assets/images/logo.svg";
import {Redirect} from 'react-router-dom'
const usersSearchFormValidate = (values) => {
  const errors = {};
  return errors;
};

function SignUp() {
  const dispatch = useDispatch();
  const user  = useSelector(state => state.auth.user);

if(user) {
  return <Redirect to={'/signin'} />
}
 

  const submit = (values, { setSubmitting }) => {
    dispatch(signUpUserThunk(values));

    setSubmitting(false);
  };
  return (
    <div className="login">
      <Formik
        enableReinitialize
        initialValues={{ username: "", email: "", password: "" }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <div className="login_container">
           <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
           <div >
              <img src={logo} />
            </div>
           
              <h1>Регистрация</h1>
           
           </div>

            <Form>
              <div className="login__form">
                <Field type="text" name="username" as={Input} />
                <Field type="text" name="email" as={Input} />

                <Field type="password" name="password" as={Input} />
              </div>
              <div className="login__btn">
                <Button htmlType="submit" disabled={isSubmitting}>
                  Регистрация
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
