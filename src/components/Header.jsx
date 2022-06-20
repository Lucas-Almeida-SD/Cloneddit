import React from "react";
import { useContext } from "react";
import { MyContext } from "../context/Provider";
import { User } from "./User";
import { firebase, auth } from '../services/firebase';
import { Link, useHistory } from "react-router-dom";

import robotImg from '../assets/images/robot.png';
import googleImg from '../assets/images/google-icon.svg';
import '../styles/header.css';

export function Header(props) {
  const { user, setUser } = useContext(MyContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
      .then(result => {
        if (result.user) {
          const { displayName: name, photoURL: avatar, uid: id } = result.user;
          setUser({ name, avatar, id });
        } else {
          window.alert('Impossível realizar login. Tente novamente!');
        }
      });
  }

  const renderPageLink = () => {
    return (
      (pathname === '/') ? (
        <Link to='/my-posts'>My Posts</Link>
      ) : <Link to='/'>Home</Link>
    );
  }

  return (
    <header>
      <div className="logo">
        <img src={ robotImg } alt="Robô" />
        <h1>cloneddit</h1>
      </div>
      <input type="text" placeholder="Buscar no Cloneddit" />
      <div className="options">
        {(!user) ? (
          <button className="login" onClick={ signInWithGoogle }>
            <img src={ googleImg } alt="Logo Google" />
            Login
          </button>
        ) : (
          <>
            {renderPageLink()}
            <User user={user} />
          </>
        )}
      </div>
    </header>
  );
}