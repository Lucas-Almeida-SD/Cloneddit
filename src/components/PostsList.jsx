import React from "react";
import { User } from "./User";

export function PostsLists({ allPosts }) {
  const putAllPostsInsideASingleArray = () => {
    console.log(allPosts);
    if(allPosts[0] && !allPosts[0].posts) return [];
    const organizeAllPosts = allPosts.map((person) => {
      const getPosts = Object.entries(person);
      const authorInfo = Object.values(getPosts[0][1]);
      const getPostsInfo = Object.entries(getPosts[1][1] ?? {});
      const newArrayPost = getPostsInfo.map((postInfo) => ({
        user: authorInfo[0],
        postId: postInfo[0],
        ...postInfo[1]
      }));
      return newArrayPost
    });
    const removePostsFromArray = [];
    organizeAllPosts.forEach((array) => { removePostsFromArray.push(...array) });
    return removePostsFromArray;
  }

  return (
    <section>
      {putAllPostsInsideASingleArray().map((post) => (
        <div key={ post.postId }>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <footer>
            <User user={ post.user } />
          </footer>
        </div>
      ))}
    </section>
  );
}