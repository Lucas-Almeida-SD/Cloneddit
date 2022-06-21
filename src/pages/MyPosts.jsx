import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";

import '../styles/myPosts.css';

export function MyPosts() {
  const { allPosts, user, isFetching, setFilterByTitle } = useContext(MyContext);

  useEffect(() => {
    return setFilterByTitle('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getMyPosts = () => {
    return allPosts.filter((post) => post.author.id === user.id);
  }
  
  return (
    <>
      <Header />
      <main id="my-posts">
        {(!isFetching && allPosts) ? (
          <PostsLists allPosts={ getMyPosts() }/>
        ) : <h1>Loading...</h1>}
      </main>
    </>
  );
}