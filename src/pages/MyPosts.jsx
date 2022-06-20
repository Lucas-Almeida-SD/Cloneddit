import React from "react";
import { useContext } from "react";
import { Header } from "../components/Header";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";
import { useMyPosts } from "../hooks/useMyPosts";

import '../styles/myPosts.css';

export function MyPosts() {
  const { isFetching } = useContext(MyContext);
  const { myPosts } = useMyPosts();
  
  return (
    <>
      <Header />
      <main id="my-posts">
        {(!isFetching && myPosts) ? (
          <PostsLists allPosts={ myPosts }/>
        ) : <h1>Loading...</h1>}
      </main>
    </>
  );
}