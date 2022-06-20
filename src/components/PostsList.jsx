import React from "react";
import { User } from "./User";
import { useState, useContext } from "react";
import { MyContext } from "../context/Provider";
import { Comments } from "./Comments";

import commentsImg from '../assets/images/comment.svg';
import '../styles/postsList.css';
import { database } from "../services/firebase";

export function PostsLists({ allPosts }) {
  const { user } = useContext(MyContext);
  const [showComment, setShowComment] = useState(false);
  const [commentIndex, setCommentIndex] = useState(-1);

  const sortByDate = (array) => {
    return (array.sort((next, prev) => {
      if (next.postedAt.valueOf() > prev.postedAt.valueOf()) return -1;
      if (next.postedAt.valueOf() < prev.postedAt.valueOf()) return 1;
      return 0;
    }));
  };

  const getComments = (commentsObject) => {
    if (commentsObject) {
      const entries = Object.entries(commentsObject);
      const array = entries.map((comment) => ({
        commentId: comment[0],
        content: comment[1].content,
        author: comment[1].author,
      }));
      return array;
    } 
    return [];
  }

  const getLikes = (likesObject) => {
    if (likesObject) {
      return Object.entries(likesObject).map((like) => ({
        likeId: like[0],
        authorId: like[1],
      }));
    }
    return [];
  }

  const putAllPostsInsideASingleArray = () => {
    if(allPosts[0] && !allPosts[0].posts) return [];
    const organizeAllPosts = allPosts.map((person) => {
      const getPosts = Object.entries(person);
      const authorInfo = Object.values(getPosts[0][1]);
      const getPostsInfo = Object.entries(getPosts[1][1] ?? {});
      const newArrayPost = getPostsInfo.map((postInfo) => ({
        user: authorInfo[0],
        postId: postInfo[0],
        ...postInfo[1],
        comments: getComments(postInfo[1].comments),
        likes: getLikes(postInfo[1].likes),
      }));
      return newArrayPost
    });
    const removePostsFromArray = [];
    organizeAllPosts.forEach((array) => { removePostsFromArray.push(...array) });
    return sortByDate(removePostsFromArray);
  };

  const formatDate = (date) => {
    const newDate = date.split(' ');
    return (`${newDate[1]} - ${newDate[0]}`)
  }

  const enableComments = (index) => {
    setShowComment(true);
    setCommentIndex(index);
  }

  const findMyLike = (post) => {
    return post.likes.find((like) => like.authorId === user.id);
  }

  const likeThePost = async (post) => {
    if (findMyLike(post)) {
      await database.ref(`allPosts/${post.user.id}/posts/${post.postId}/likes/${findMyLike(post).likeId}`)
        .remove();
    } else {
      await database.ref(`allPosts/${post.user.id}/posts/${post.postId}/likes`)
        .push(user.id);
    }
  }

  console.log(putAllPostsInsideASingleArray());

  return (
    <section className="posts-list">
      {putAllPostsInsideASingleArray().map((post, index) => (
        <div key={ post.postId } className="post">
          <span className="posted-at">{`Postado às ${formatDate(post.postedAt)}`}</span>
          <h2 className="title">{post.title}</h2>
          <p className="content">{post.content}</p>
          <footer>
            <User user={ post.user } />
            <div className="interactive-buttons">
              <button
                type="button"
                onClick={ () => enableComments(index) }
                aria-label="Abrir aba de comentários"
                disabled={ !user }
              >
                <span>{post.comments.length}</span>
                <img src={ commentsImg } alt="Comentário" title="Comentários"/>
              </button>
              <button
                type="button"
                className={(findMyLike(post)) && 'liked'}
                onClick={ () => likeThePost(post) }
                aria-label="Marcar como gostei"
                disabled={ !user }
              >
                <span>{post.likes.length}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </footer>
          {(showComment && commentIndex === index) && (
            <Comments
              post={post} 
              setShowComment={ setShowComment }
              setCommentIndex={ setCommentIndex }
            />
          )}
        </div>
      ))}
    </section>
  );
}