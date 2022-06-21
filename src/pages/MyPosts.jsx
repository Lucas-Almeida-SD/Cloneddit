import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { NewPost } from "../components/NewPost";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";

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
  
  return (
    <>
      <Header />
      <main id="my-posts">
        <section className="content">
          {(createNewPost) && <NewPost />}
          <PostsLists allPosts={ getMyPosts() }/>
        </section>
      </main>
    </>
  );
}