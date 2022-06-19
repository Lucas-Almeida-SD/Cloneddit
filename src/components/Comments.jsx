import React from "react";
import { User } from "./User";

import returnImg from '../assets/images/return.svg';
import { useState } from "react";
import { database } from "../services/firebase";
import { useContext } from "react";
import { MyContext } from "../context/Provider";

export function Comments({ post, setShowComment, setCommentIndex }) {
  const { user } = useContext(MyContext);
  const [textareaValue, setTextAreaValue] = useState('');
  const handleReturn = () => {
    setShowComment(false);
    setCommentIndex(-1);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await database.ref(`allPosts/${post.user.id}/posts/${post.postId}/comments`).push({
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

  console.log(post);
  return (
    <div>
      <button type="button" onClick={ handleReturn }>
        <img src={ returnImg } alt="Retornar" />
      </button>
      <section>
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <footer>
            <User user={ post.user }/>
          </footer>
        </div>
        <form onSubmit={ handleSubmit }>
          <textarea
            value={ textareaValue } 
            placeholder="Digite seu comentário!"
            onChange={ ({ target }) => setTextAreaValue(target.value) }
          />
          <button type="submit">Comentar</button>
        </form>
        <div>
          {commentsList().map((comment) => (
            <div key={ comment.commentId }>
              <p>{comment.content}</p>
              <footer>
                <User user={comment.author}/>
              </footer>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}