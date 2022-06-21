import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { NewPost } from "../components/NewPost";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";

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

  return (
    <>
      <Header />
      <main id="home">
        {(!isFetching && allPosts) ? (
          <section className="content">
            {!user && <p>Faça login</p>}
            {(createNewPost) && <NewPost />}
            <PostsLists allPosts={allPosts}/>
          </section>
        ) : <h1>Loading...</h1>}
      </main>
    </>
  );
}