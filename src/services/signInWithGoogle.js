import { firebase, auth } from "./firebase";

export function signInWithGoogle(setUser, toast) {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      if (result.user) {
        const { displayName: name, photoURL: avatar, uid: id } = result.user;
        setUser({ name, avatar, id });
        const login = () => toast.success('Login efetuado com sucesso!');
        login();
      } else {
        toast.error("Impossível realizar login. Tente novamente!")
      }
    });
}