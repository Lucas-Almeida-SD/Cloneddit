import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../context/Provider";
import { database } from "../services/firebase";

import imageImg from '../assets/images/image-icon.png';

import '../styles/newPost.css';

export function NewPost() {
  const { user } = useContext(MyContext);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [fileValue, setFileValue] = useState('');

  const selectFile = () => {
    document.getElementById('select-file').click();
  }

  const handleChangeFile = ({ target }) => {
    let reader = new FileReader();
    reader.onload = () => {
      setFileValue(reader.result);
    }
    reader.readAsDataURL(target.files[0])
  }

  const removeImage = () => {
    if (window.confirm('Deseja remover a imagem?')) {
      setFileValue('');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await database.ref(`allPosts`).push({
      author: user,
      title: inputValue,
      content:textareaValue,
      image: fileValue,
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
        <div className="textarea-div">
          <textarea
            placeholder="Insira o seu texto"
            value={ textareaValue }
            onChange={ ({ target }) => setTextareaValue(target.value) }
            disabled={ !user }
          />
          <div>
            <img src={ imageImg } alt="Imagem" title="Imagem" onClick={ selectFile }/>
          </div>
        </div>
        <input
          type="file"
          id="select-file"
          accept="image/*"
          onChange={ handleChangeFile }
          style={ { display: 'none' } }
          disabled={ !user }
        />
        <div className="image-preview" style={ { display: (!fileValue) && 'none' } }>
          <img src={ fileValue } alt="Pré-visualização da imagem" onClick={ removeImage }/>
        </div>
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