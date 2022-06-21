import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { database } from "../services/firebase";

export const MyContext = createContext();

export function Provider({ children }) {
  const [user, setUser] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [filterByTitle, setFilterByTitle] = useState('');
  const [posts, setAllPosts] = useState();

  const getComments = (commentsObject) => {
    if (!commentsObject) return []
    return Object.entries(commentsObject).map((comment) => ({
      commentId: comment[0],
      ...comment[1],
    }))
  }

  const getLikes = (likesObject) => {
    if (!likesObject) return [];
    return Object.entries(likesObject).map((like) => ({
      likeId: like[0],
      authorId: like[1],
    }))
  }

  const sortByDate = (array) => {
    return (array.sort((next, prev) => {
      if (next.postedAt.valueOf() > prev.postedAt.valueOf()) return -1;
      if (next.postedAt.valueOf() < prev.postedAt.valueOf()) return 1;
      return 0;
    }));
  };

  const organizeAllPosts = (posts) => {
    if(!posts) return [];

    const entriesAllPosts = Object.entries(posts);

    const newAllPosts = entriesAllPosts.map((post) => ({
        ...post[1],
        postId: post[0],
        comments: getComments(post[1].comments),
        likes: getLikes(post[1].likes),
      }));
    
      return sortByDate(newAllPosts);
  };

  useEffect(() => {
    setIsFetching(true);
    const getAllPosts = async() => {
      const allPostsRef = database.ref('/allPosts');
  
      allPostsRef.on('value', posts => {
        const databasePosts = posts.val() ?? {};
        
        const newAllPosts = organizeAllPosts(databasePosts)
        setAllPosts(sortByDate(newAllPosts));
        setIsFetching(false);
      });
    };
    getAllPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const providerValues = {
    user,
    setUser,
    isFetching,
    setIsFetching,
    filterByTitle,
    setFilterByTitle,
    allPosts: posts
  }

  return (
    <MyContext.Provider value={ providerValues }>
      {children}
    </MyContext.Provider>
  );
}