import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";
import { useMyPosts } from "../hooks/useMyPosts";

import '../styles/myPosts.css';

export function MyPosts() {
  const { isFetching, setFilterByTitle } = useContext(MyContext);
  const { myPosts } = useMyPosts();

  useEffect(() => {
    return setFilterByTitle('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
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