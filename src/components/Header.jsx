import React from "react";
import { useContext } from "react";
import { MyContext } from "../context/Provider";
import { User } from "./User";
import { firebase, auth } from '../services/firebase';

export function Header() {
  const { user, setUser } = useContext(MyContext);

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

  return (
    <header>
      <h1>Cloneddit</h1>
      <form>
        <input type="text" placeholder="Buscar no Cloneddit" />
      </form>
      {(!user) ? (
        <button onClick={ signInWithGoogle }>
          Login
        </button>
      ) : <User user={user} />}
    </header>
  );
}