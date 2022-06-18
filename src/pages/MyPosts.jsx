import React from "react";
import { useContext } from "react";
import { Header } from "../components/Header";
import { PostsLists } from "../components/PostsList";
import { MyContext } from "../context/Provider";

export function Home() {
  const { isFetching } = useContext(MyContext);
  
  return (
    <>
      <Header />
      <main>
        {(!isFetching) ? <PostsLists /> : <h1>Loading...</h1>}
      </main>
    </>
  );
}