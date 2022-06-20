import React from "react";
import { User } from "./User";

import returnImg from '../assets/images/return.svg';
import { useState } from "react";
import { database } from "../services/firebase";
import { useContext } from "react";
import { MyContext } from "../context/Provider";

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
    await database.ref(`allPosts/${post.author.id}/posts/${post.postId}/comments`).push({
      author: user,
      content: textareaValue,
    });
    setTextAreaValue('');
  }

  const commentsList = () => {
    if (post.comments) {
      const entries = Object.entries(post.comments);
      const newArray = entries.map((comment) => ({
        commentId: comment[0],
        content: comment[1].content,
        author: comment[1].author,
      }));
      return newArray;
    }
    return [];
  }

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
            <button type="submit" disabled={ !textareaValue }>Comentar</button>
          </form>
          <div className="comments-list">
            {commentsList().map((comment) => (
              <div key={ comment.commentId } className="comment">
                <p>{comment.content}</p>
                <footer>
                  <User user={comment.author}/>
                </footer>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}