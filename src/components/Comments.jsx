import React from "react";
import { User } from "./User";

import returnImg from '../assets/images/return.svg';
import { useState } from "react";
import { database } from "../services/firebase";
import { useContext } from "react";
import { MyContext } from "../context/Provider";

import deleteImg from '../assets/images/delete.svg';

import '../styles/comments.css';

export function Comments({ post, setShowComment, setCommentIndex, children }) {
  const { user } = useContext(MyContext);
  const [textareaValue, setTextAreaValue] = useState('');
  const handleReturn = () => {
    setShowComment(false);
    setCommentIndex(-1);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await database.ref(`allPosts/${post.postId}/comments`).push({
      author: user,
      content: textareaValue,
    });
    setTextAreaValue('');
  }

  const deleteComment = async (comment) => {
    if (window.confirm('Deseja remover esse comentário?')) {
      await database.ref(`allPosts/${post.postId}/comments/${comment.commentId}`)
        .remove();
    }
  };

  return (
    <div className="comments-background">
      <div className="return">
        <button type="button" onClick={ handleReturn }>
          <img src={ returnImg } alt="Retornar" />
        </button>
      </div>
      <div className="comments-content">
        <section className="comments-section">
          <div className="post">
            {children}
          </div>
          <form onSubmit={ handleSubmit }>
            <textarea
              value={ textareaValue } 
              placeholder="Digite seu comentário!"
              onChange={ ({ target }) => setTextAreaValue(target.value) }
            />
            <button type="submit" disabled={ !textareaValue.trim() }>Comentar</button>
          </form>
          <div className="comments-list">
            {post.comments.map((comment) => (
              <div key={ comment.commentId } className="comment">
                <p>{comment.content}</p>
                <footer>
                  <User user={comment.author}/>
                  {(user && (user.id === comment.author.id || user.id === post.author.id)) && (
                    <button
                      type="button"
                      onClick={ () => deleteComment(comment) }
                      aria-label="Remover comentário"
                    >
                      <img src={ deleteImg } alt="Remover" title="Remover"/>
                    </button>
                  )}
                </footer>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}