import React, { useState, useContext } from "react";
import { MyContext } from "../context/Provider";

import { User } from "./User";
import { Comments } from "./Comments";
import { InteractiveButtons } from "./InteractiveButtons";
import { EmptyPostList } from "./EmptyPostList";

import notFoundImg from '../assets/images/not-found.svg';

import '../styles/postsList.css';

export function PostsLists({ allPosts }) {
  const { filterByTitle } = useContext(MyContext);
  const [showComment, setShowComment] = useState(false);
  const [commentIndex, setCommentIndex] = useState(-1);

  const filterPosts = () => (
    allPosts.filter((post) => 
      post.title.toLowerCase().includes(filterByTitle.toLowerCase()))
  );

  const formatDate = (date) => {
    const newDate = date.split(' ');
    return (`${newDate[1]} - ${newDate[0]}`)
  };

  const enableComments = (index) => {
    setShowComment(true);
    setCommentIndex(index);
  };

  const renderPost = (post, index) => {
    return (
      <>
        <span className="posted-at">{`Postado às ${formatDate(post.postedAt)}`}</span>
        <h2 className="title">{post.title}</h2>
        <p className="content">{post.content}</p>
        {(post.image) && (
          <div className="image">
            <img src={ post.image } alt="Imagem do post" />
          </div> 
        )}
        <footer className="post-footer">
          <User user={ post.author } />
          <InteractiveButtons
            post={ post }
            index={ index }
            enableComments={ enableComments }
            setShowComment={ setShowComment }
            setCommentIndex={ setCommentIndex }
          />
        </footer>
      </>
    );
  };

  const text = 'Publicação não encontrada!'

  return (
    <section className="posts-list">
      {filterPosts().length > 0 ? (
        filterPosts().map((post, index) => (
          <div key={ post.postId } className="post">
            {renderPost(post, index)}
            {(showComment && commentIndex === index) && (
              <Comments
                post={post} 
                setShowComment={ setShowComment }
                setCommentIndex={ setCommentIndex }
              >
                {renderPost(post, index)}
              </Comments>
            )}
          </div>
        ))
      ) : <EmptyPostList src={ notFoundImg } alt="Não encontrado" text={ text } />}
    </section>
  );
}