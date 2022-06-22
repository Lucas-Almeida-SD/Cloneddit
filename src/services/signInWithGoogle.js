import { firebase, auth } from "./firebase";

export function signInWithGoogle(setUser) {
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