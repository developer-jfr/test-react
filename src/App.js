import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import "./_app.scss";
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import Favorites from "./components/Favorites/Favorites";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {


  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>

     
      <Route path="/signin">
        <SignIn />
      </Route>

      <Route path="/signup">
        <SignUp />
      </Route>

      <Route path="/watch/:id">
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>

      <Route path="/fav">
        <Layout>
          <Favorites />
        </Layout>
      </Route>
      <Route path="/channel/:channelId">
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>

      <Route path="fav" component={Favorites} />

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
