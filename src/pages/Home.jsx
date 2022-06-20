import React from "react";
import { useContext } from "react";
import { Header } from "../components/Header";
import { NewPost } from "../components/NewPost";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";
import { useAllPosts } from "../hooks/useAllPosts";

import '../styles/home.css';

export function Home() {
  const { isFetching } = useContext(MyContext);
  const { allPosts } = useAllPosts();
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