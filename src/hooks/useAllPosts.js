import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/Provider";
import { database } from '../services/firebase';

export function useAllPosts() {
  const [allPosts, setAllPosts] = useState();
  const { setIsFetching } = useContext(MyContext);

  useEffect(() => {
    setIsFetching(true);
    const getAllPosts = async() => {
      const allPostsRef = database.ref('/allPosts');
  
      allPostsRef.on('value', posts => {
        const databasePosts = posts.val() ?? {};

        const parsedPosts = Object.values(databasePosts);

        setAllPosts(parsedPosts);
        setIsFetching(false);
      });
    }
    getAllPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ({ allPosts });
}