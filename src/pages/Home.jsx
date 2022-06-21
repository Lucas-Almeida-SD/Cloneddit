import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { NewPost } from "../components/NewPost";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";
import { useAllPosts } from "../hooks/useAllPosts";

import '../styles/home.css';

export function Home() {
  const { isFetching, setFilterByTitle } = useContext(MyContext);
  const { allPosts } = useAllPosts();

  useEffect(() => {
    return setFilterByTitle('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <Header />
      <main id="home">
        {(!isFetching && allPosts) ? (
          <>
          <section className="content">
            <NewPost />
            <PostsLists allPosts={allPosts}/>
          </section>
          </>
        ) : <h1>Loading...</h1>}
      </main>
    </>
  );
}