import React, { useContext } from "react";

import { MyContext } from "../context/Provider";
import { database } from "../services/firebase";
import commentsImg from '../assets/images/comment.svg';
import deleteImg from '../assets/images/delete.svg';
import { signInWithGoogle } from "../services/signInWithGoogle";
import toast, { Toaster } from 'react-hot-toast';

export function InteractiveButtons(props) {
  const { post, index, enableComments, setShowComment, setCommentIndex } = props;
  const { user, setUser } = useContext(MyContext);

  const openComments = () => {
    if (!user) return signInWithGoogle(setUser, toast);

    enableComments(index);
  }

  const findMyLike = (post) => {
    return post.likes.find((like) => like.authorId === user.id);
  };

  const likeThePost = async (post) => {
    if (!user) return signInWithGoogle(setUser, toast);

    if (findMyLike(post)) {
      await database.ref(`allPosts/${post.postId}/likes/${findMyLike(post).likeId}`)
        .remove();
    } else {
      await database.ref(`allPosts/${post.postId}/likes`)
        .push(user.id);
    }
  };

  const deletePost = async () => {
    if (window.confirm('Deseja remover essa postagem?')) {
      await database.ref(`allPosts/${post.postId}`).remove();

      setShowComment(false);
      setCommentIndex(-1)
    }
  };

  return (
    <div className="interactive-buttons">
      <button
        type="button"
        onClick={ openComments }
        aria-label="Abrir aba de comentários"
        title="Comentários"
      >
        <span>{post.comments.length}</span>
        <img src={ commentsImg } alt="Comentário"/>
      </button>
      <button
        type="button"
        className={(user && findMyLike(post)) && 'liked'}
        onClick={ () => likeThePost(post) }
        aria-label="Marcar como gostei"
        title="Like"
      >
        <span>{post.likes.length}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {(user && user.id === post.author.id) && (
        <button
          type="button"
          onClick={ deletePost }
          aria-label="Remover post"
        >
          <img src={ deleteImg } alt="Remover" title="Remover"/>
        </button>
      )}
      <Toaster />
    </div>
  );
}