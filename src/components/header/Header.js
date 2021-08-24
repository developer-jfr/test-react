import React, { useState } from "react";
import "./_header.scss";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import {  setFavoritesAC } from "../../redux/actions/fav.actions";

const Header = ({ handleToggleSidebar }) => {
  const history = useHistory();
const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/signin");
  
  };

  return (
    <div className="header ">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />

      <Link to="/">
        <li className="header__text">
          <span>Home</span>
        </li>
      </Link>
      <Link to="/fav" >
        <li className="header__text">
          <span>Subscriptions</span>
        </li>
      </Link>

      <div className="header__icons"></div>
      
        <li className="header__text">
          <span className='header__logout' onClick={logout}>Logout</span>
        </li>
     
    </div>
  );
};

export default Header;
