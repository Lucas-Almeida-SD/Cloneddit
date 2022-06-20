import React, { useState } from "react";
import { User } from "./User";
import { Comments } from "./Comments";

import '../styles/postsList.css';
import { InteractiveButtons } from "./InteractiveButtons";

export function PostsLists({ allPosts }) {
  const [showComment, setShowComment] = useState(false);
  const [commentIndex, setCommentIndex] = useState(-1);

  const sortByDate = (array) => {
    return (array.sort((next, prev) => {
      if (next.postedAt.valueOf() > prev.postedAt.valueOf()) return -1;
      if (next.postedAt.valueOf() < prev.postedAt.valueOf()) return 1;
      return 0;
    }));
  };

  const getComments = (commentsObject) => {
    if (commentsObject) {
      const entries = Object.entries(commentsObject);
      const array = entries.map((comment) => ({
        commentId: comment[0],
        content: comment[1].content,
        author: comment[1].author,
      }));
      return array;
    } 
    return [];
  };

  const getLikes = (likesObject) => {
    if (likesObject) {
      return Object.entries(likesObject).map((like) => ({
        likeId: like[0],
        authorId: like[1],
      }));
    }
    return [];
  };

  const putAllPostsInsideASingleArray = () => {
    if(allPosts[0] && !allPosts[0].posts) return [];
    const organizeAllPosts = allPosts.map((person) => {
      const getPosts = Object.entries(person);
      const authorInfo = Object.values(getPosts[0][1]);
      const getPostsInfo = Object.entries(getPosts[1][1] ?? {});
      const newArrayPost = getPostsInfo.map((postInfo) => ({
        author: authorInfo[0],
        postId: postInfo[0],
        ...postInfo[1],
        comments: getComments(postInfo[1].comments),
        likes: getLikes(postInfo[1].likes),
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
  };

  const enableComments = (index) => {
    setShowComment(true);
    setCommentIndex(index);
  };

  const renderPost = (post, index) => {
    return (
      <>
        <span className="posted-at">{`Postado às ${formatDate(post.postedAt)}`}</span>
        <h2 className="title">{post.title}</h2>
        <p className="content">{post.content}</p>
        <footer>
          <User user={ post.author } />
          <InteractiveButtons
            post={ post }
            index={ index }
            enableComments={ enableComments }
          />
        </footer>
      </>
    );
  };

  console.log(putAllPostsInsideASingleArray());

  return (
    <section className="posts-list">
      {putAllPostsInsideASingleArray().map((post, index) => (
        <div key={ post.postId } className="post">
          {renderPost(post, index)}
          {(showComment && commentIndex === index) && (
            <Comments
              post={post} 
              setShowComment={ setShowComment }
              setCommentIndex={ setCommentIndex }
            >
              {renderPost(post, index)}
            </Comments>
          )}
        </div>
      ))}
    </section>
  );
}