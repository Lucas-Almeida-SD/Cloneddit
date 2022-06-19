import React from "react";
import { User } from "./User";

export function PostsLists({ allPosts }) {
  const sortByDate = (array) => {
    return (array.sort((next, prev) => {
      if (next.postedAt.valueOf() > prev.postedAt.valueOf()) return -1;
      if (next.postedAt.valueOf() < prev.postedAt.valueOf()) return 1;
      return 0;
    }));
  };

  const putAllPostsInsideASingleArray = () => {
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
    return sortByDate(removePostsFromArray);
  };

  const formatDate = (date) => {
    const newDate = date.split(' ');
    return (`${newDate[1]} - ${newDate[0]}`)
  }

  return (
    <section>
      {putAllPostsInsideASingleArray().map((post) => (
        <div key={ post.postId }>
          <span>{formatDate(post.postedAt)}</span>
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