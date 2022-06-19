import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../context/Provider";
import { database } from "../services/firebase";
import { User } from "./User";

export function NewPost() {
  const { user } = useContext(MyContext);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authorIdRef = database.ref(`allPosts/${user.id}`);
    const getValueAuthorIdRef = await authorIdRef.get();
    if (!getValueAuthorIdRef.exists()) {
      await database.ref(`allPosts/${user.id}/author`).push(user);
    }
    await database.ref(`allPosts/${user.id}/posts`).push({
      title: inputValue,
      content:textareaValue,
      postedAt: new Date().toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo" }),
    });

    setInputValue('');
    setTextareaValue('');
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text" 
        placeholder="Título do post" 
        value={ inputValue }
        onChange={ ({ target }) => setInputValue(target.value) }
      />
      <textarea
        placeholder="Insira o seu texto"
        value={ textareaValue }
        onChange={ ({ target }) => setTextareaValue(target.value) }
      />
      <footer>
        {(!user) ? <span>Faça login para interagir!</span> : <User user={ user } />}
        <button
          type="submit"
          disabled={ !user || !inputValue || !textareaValue }
        >
          Enviar
        </button>
      </footer>
    </form>
  );
}