import React, { useContext, useEffect } from "react";
import { EmptyPostList } from "../components/EmptyPostList";
import { Header } from "../components/Header";
import { NewPost } from "../components/NewPost";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";

import addNotesImg from '../assets/images/add-notes.svg';

import '../styles/home.css';

export function Home() {
  const {
    user, 
    allPosts,
    isFetching,
    setFilterByTitle,
    createNewPost,
    setCreateNewPost,
  } = useContext(MyContext);

  useEffect(() => {
    return () => {
      setFilterByTitle('');
      setCreateNewPost(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const text = 'Não há publicações no momento!';

  return (
    <>
      <Header />
      <main id="home">
        {(!isFetching && allPosts) ? (
          <section className="content">
            {(createNewPost) && <NewPost />}
            {(allPosts.length > 0) ? <PostsLists allPosts={allPosts}/> : (
              <EmptyPostList src={ addNotesImg } alt={ 'Lista vazia' } text={ text } />
            )}
          </section>
        ) : <h1>Loading...</h1>}
      </main>
    </>
  );
}