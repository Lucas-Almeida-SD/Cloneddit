import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../context/Provider";
import { database } from "../services/firebase";

import returnImg from '../assets/images/return.svg';
import imageImg from '../assets/images/image-icon.png';


import '../styles/newPost.css';

export function NewPost() {
  const { user, setCreateNewPost } = useContext(MyContext);
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
    const values = { inputValue, textareaValue }

    setInputValue('');
    setTextareaValue('');
    setFileValue('');

    await database.ref(`allPosts`).push({
      author: user,
      title: values.inputValue,
      content:values.textareaValue,
      image: fileValue,
      postedAt: new Date().toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo" }),
    });
  }

  return (
    <section className="new-post-section">
      <form className="new-post-form" onSubmit={ handleSubmit }>
        <div className="return">
          <button type="button" onClick={ () => setCreateNewPost(false) }>
            <img src={ returnImg } alt="Retornar" />
          </button>
        </div>
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
          {(!fileValue) && (
            <div>
              <img
                src={ imageImg }
                alt="Imagem" 
                title="Adicionar imagem"
                onClick={ selectFile }
              />
            </div>
          )}
        </div>
        <input
          type="file"
          id="select-file"
          accept="image/*"
          onChange={ handleChangeFile }
          style={ { display: 'none' } }
          disabled={ !user }
        />
        {(fileValue) && (
          <div className="image-preview">
            <img src={ fileValue } alt="Pré-visualização da imagem" onClick={ removeImage }/>
          </div>
        )}
        <footer>
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