import React from "react";
import { useContext } from "react";
import { Header } from "../components/Header";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";
import { useMyPosts } from "../hooks/useMyPosts";

export function MyPosts() {
  const { isFetching } = useContext(MyContext);
  const { myPosts } = useMyPosts();
  
  return (
    <>
      <Header />
      <main>
        {(!isFetching && myPosts) ? (
          <PostsLists allPosts={ myPosts }/>
        ) : <h1>Loading...</h1>}
      </main>
    </>
  );
}