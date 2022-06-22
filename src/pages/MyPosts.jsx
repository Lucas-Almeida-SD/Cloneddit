import React, { useContext, useEffect } from "react";
import { EmptyPostList } from "../components/EmptyPostList";
import { Header } from "../components/Header";
import { NewPost } from "../components/NewPost";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";

import blankCanvasImg from '../assets/images/blank-canvas.svg';

import '../styles/myPosts.css';

export function MyPosts() {
  const {
    allPosts,
    user,
    setFilterByTitle,
    createNewPost,
    setCreateNewPost
  } = useContext(MyContext);

  useEffect(() => {
    return () => {
      setFilterByTitle('');
      setCreateNewPost(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getMyPosts = () => {
    return allPosts.filter((post) => post.author.id === user.id);
  }

  const text = 'Você não possui publicações!'
  
  return (
    <>
      <Header />
      <main id="my-posts">
        <section className="content">
          {(createNewPost) && <NewPost />}
          {(getMyPosts().length > 0) ? <PostsLists allPosts={ getMyPosts() }/> : (
            <EmptyPostList src={ blankCanvasImg } alt="Lista vazia" text={ text } />
          )}
        </section>
      </main>
    </>
  );
}