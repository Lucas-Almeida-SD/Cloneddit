import React, { useContext } from "react";
import { MyContext } from "../context/Provider";
import { User } from "./User";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import robotImg from '../assets/images/robot.png';
import searchImg from '../assets/images/search.svg';
import googleImg from '../assets/images/google-icon.svg';
import addImg from '../assets/images/add.svg';
import '../styles/header.css';
import { signInWithGoogle } from "../services/signInWithGoogle";

export function Header(props) {
  const {
    user,
    setUser,
    filterByTitle,
    setFilterByTitle,
    setCreateNewPost,
  } = useContext(MyContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const renderPageLink = () => {
    return (
      (pathname === '/Cloneddit/') ? (
        <Link to='/Cloneddit/my-posts'>My Posts</Link>
      ) : <Link to='/Cloneddit/'>Home</Link>
    );
  }

  const renderNewPostBtn = () => {
    return (
      <button type="button" className="new-post" onClick={ () => setCreateNewPost(true) }>
        <img
          src={ addImg }
          alt="Criar no post"
          title="Novo post"
        />
      </button>
    );
  }

  return (
    <header>
      <div className="content">
        <div className="logo">
          <img src={ robotImg } alt="Robô" />
          <h1>cloneddit</h1>
        </div>
        <div className="search">
          <div>
            <img src={ searchImg } alt="Buscar" />
          </div>
          <input
            type="text"
            placeholder="Buscar no Cloneddit"
            value={ filterByTitle }
            onChange={ ({ target }) => setFilterByTitle(target.value) }
          />
        </div>
        <div className="options">
          {(!user) ? (
            <button className="login" onClick={ () => signInWithGoogle(setUser, toast) }>
              <img src={ googleImg } alt="Logo Google" />
              Login
            </button>
          ) : (
            <>
              {renderPageLink()}
              {renderNewPostBtn()}
              <User user={user} />
            </>
          )}
        </div>
      </div>
      <Toaster />
    </header>
  );
}