import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../context/Provider";
import { database } from "../services/firebase";

import '../styles/newPost.css';

export function NewPost() {
  const { user } = useContext(MyContext);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await database.ref(`allPosts`).push({
      author: user,
      title: inputValue,
      content:textareaValue,
      postedAt: new Date().toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo" }),
    });

    setInputValue('');
    setTextareaValue('');
  }

  return (
    <section className="new-post-section">
      <form className="new-post-form" onSubmit={ handleSubmit }>
        <input
          type="text" 
          placeholder="Título do post" 
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
          disabled={ !user }
        />
        <textarea
          placeholder="Insira o seu texto"
          value={ textareaValue }
          onChange={ ({ target }) => setTextareaValue(target.value) }
          disabled={ !user }
        />
        <footer className={(user) && 'footer-logged'}>
          {(!user) && <span>Faça login para interagir!</span>}
          <button
            type="submit"
            disabled={ !user || !inputValue.trim() || !textareaValue.trim() }
          >
            Enviar
          </button>
        </footer>
      </form>
    </section>
  );
}