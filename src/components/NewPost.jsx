import { useContext } from "react";
import { MyContext } from "../context/Provider";
import { User } from "./User";

export function NewPost() {
  const { user } = useContext(MyContext);

  return (
    <form>
      <input type="text" placeholder="Título do post" />
      <textarea placeholder="Insira o seu texto" />
      <footer>
        {(!user) ? <span>Faça login para interagir!</span> : <User user={ user } />}
      </footer>
    </form>
  );
}